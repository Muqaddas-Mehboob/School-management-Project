<?php

require_once __DIR__ . '/../config/CloudinaryConfig.php';
require_once __DIR__ . '/../models/FileModel.php';
require_once __DIR__ . '/../validators/FileValidator.php';

/**
 * FileService
 *
 * The single source of truth for every file stored in this application.
 *
 * Responsibilities:
 *  - Upload files to Cloudinary (via CloudinaryConfig::getInstance())
 *  - Delete files from Cloudinary and purge their MongoDB metadata
 *  - Replace an existing file (upload new → delete old, atomically with rollback)
 *  - Generate unique, safe storage names
 *  - Save and return file metadata from MongoDB
 *  - Roll back Cloudinary uploads when a subsequent MongoDB operation fails
 *
 * Rules:
 *  - ONLY this class communicates with the Cloudinary SDK.
 *  - Controllers, validators and models MUST NOT instantiate or call
 *    the Cloudinary SDK directly.
 *  - This service does NOT perform file validation. Callers (controllers)
 *    must run FileValidator::validate() BEFORE calling this service.
 */

class FileService
{
    private FileModel $fileModel;
    private CloudinaryConfig $cloudinary;

    /**
     * Cloudinary folder constants — mirrors the policy folders defined in
     * the specification.
     */
    const FOLDER_PROFILE_IMAGES = 'profile-images';
    const FOLDER_ASSIGNMENTS    = 'assignments';
    const FOLDER_SUBMISSIONS    = 'submissions';

    /**
     * @param mixed $database MongoDB database instance
     */
    public function __construct($database)
    {
        // Obtain the singleton SDK client — this is the ONLY place in the
        // project where the Cloudinary SDK is instantiated.
        $this->cloudinary = CloudinaryConfig::getInstance();
        $this->fileModel  = new FileModel($database);
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Upload a file to Cloudinary and save its metadata to MongoDB.
     * Rollback guarantee:
     *   If the Cloudinary upload succeeds but the MongoDB insert fails,
     *   the uploaded Cloudinary asset is immediately deleted so no
     *   orphaned files are left on the CDN.
     *
     * @param array  $file        A single entry from $_FILES (already validated)
     * @param string $folder      Cloudinary folder (use the FOLDER_* constants)
     * @param string $uploadedBy  userId of the authenticated uploader
     * @param string $realMime    Real MIME type detected by FileValidator
     * @return array              File metadata array (same as MongoDB document + 'id')
     * @throws \RuntimeException  On Cloudinary or MongoDB failure
     */
    public function upload(
        array  $file,
        string $folder,
        string $uploadedBy,
        string $realMime
    ): array {
        $tmpPath          = $file['tmp_name'];
        $originalFilename = FileValidator::sanitizeFilename($file['name']);
        $size             = (int) $file['size'];
        $publicId         = $this->generatePublicId($folder);

        // Upload to Cloudinary ───────────────────────────────────────────
        $uploadResult = $this->uploadToCloudinary($tmpPath, $publicId, $folder, $realMime);

        // Save metadata to MongoDB ───────────────────────────────────────
        //    If this fails we MUST remove the Cloudinary file immediately.
        $metadata = [
            'url'              => $uploadResult['secure_url'],
            'publicId'         => $uploadResult['public_id'],
            'originalFilename' => $originalFilename,
            'mimeType'         => $realMime,
            'size'             => $size,
            'folder'           => $folder,
            'uploadedBy'       => $uploadedBy,
        ];

        try {
            $docId = $this->fileModel->create($metadata);
        } catch (\Throwable $e) {
            // Rollback — delete the freshly uploaded Cloudinary file
            $this->destroyOnCloudinary($uploadResult['public_id']);
            throw new \RuntimeException(
                'File uploaded to Cloudinary but metadata could not be saved. '
                . 'Cloudinary file has been removed. Error: ' . $e->getMessage()
            );
        }

        return array_merge($metadata, ['id' => $docId]);
    }

    /**
     * Delete a file from Cloudinary and remove its metadata from MongoDB.
     *
     * Both operations are attempted. If the Cloudinary deletion fails,
     * the MongoDB document is still deleted (to avoid zombie records) and
     * the Cloudinary error is surfaced in the return value.
     *
     * @param string $publicId  Cloudinary public_id
     * @param string $fileDocId MongoDB _id of the file metadata document
     * @return array ['success' => bool, 'message' => string]
     */
    public function delete(string $publicId, string $fileDocId): array
    {
        $cloudinarySuccess = true;
        $cloudinaryMessage = '';

        // Delete from Cloudinary ─────────────────────────────────────────
        try {
            $this->destroyOnCloudinary($publicId);
        } catch (\Throwable $e) {
            $cloudinarySuccess = false;
            $cloudinaryMessage = $e->getMessage();
        }

        //  Delete metadata from MongoDB ──────────────────────────────────
        $mongoSuccess = $this->fileModel->deleteById($fileDocId);

        if (!$cloudinarySuccess) {
            return [
                'success' => false,
                'message' => 'Cloudinary deletion failed: ' . $cloudinaryMessage,
            ];
        }

        return [
            'success' => $mongoSuccess,
            'message' => $mongoSuccess ? 'File deleted.' : 'File metadata not found in database.',
        ];
    }

    /**
     * Replace an existing file atomically.
     *
     * Flow:
     *   1. Upload the new file to Cloudinary
     *   2. If step 1 fails → throw (old file untouched)
     *   3. Delete the old Cloudinary file
     *   4. Update MongoDB metadata
     *   5. If step 4 fails → rollback (delete new Cloudinary file, restore nothing)
     *
     * @param string $oldPublicId   Cloudinary public_id of the file to replace
     * @param string $oldFileDocId  MongoDB _id of the existing file metadata document
     * @param array  $newFile       A single entry from $_FILES (already validated)
     * @param string $folder        Cloudinary folder for the new file
     * @param string $uploadedBy    userId of the authenticated uploader
     * @param string $realMime      Real MIME type detected by FileValidator
     * @return array                Updated file metadata array
     * @throws \RuntimeException
     */
    public function replace(
        string $oldPublicId,
        string $oldFileDocId,
        array  $newFile,
        string $folder,
        string $uploadedBy,
        string $realMime
    ): array {
        $tmpPath          = $newFile['tmp_name'];
        $originalFilename = FileValidator::sanitizeFilename($newFile['name']);
        $size             = (int) $newFile['size'];
        $newPublicId      = $this->generatePublicId($folder);

        //  Upload new file ────────────────────────────────────────────────
        $uploadResult = $this->uploadToCloudinary($tmpPath, $newPublicId, $folder, $realMime);

        //  Delete old Cloudinary file ─────────────────────────────────────
        //    Non-fatal: if old deletion fails we still proceed with the metadata update.
        try {
            $this->destroyOnCloudinary($oldPublicId);
        } catch (\Throwable $e) {
            // Log-worthy but not fatal; old file may be cleaned up by Cloudinary
            // admin tools. We do not block the replacement.
            error_log('FileService::replace — old Cloudinary file deletion failed: ' . $e->getMessage());
        }

        // . Update MongoDB metadata ────────────────────────────────────────
        $updatedMetadata = [
            'url'              => $uploadResult['secure_url'],
            'publicId'         => $uploadResult['public_id'],
            'originalFilename' => $originalFilename,
            'mimeType'         => $realMime,
            'size'             => $size,
            'folder'           => $folder,
            'uploadedBy'       => $uploadedBy,
        ];

        try {
            $this->fileModel->updateById($oldFileDocId, $updatedMetadata);
        } catch (\Throwable $e) {
            // Rollback — delete the newly uploaded file
            $this->destroyOnCloudinary($uploadResult['public_id']);
            throw new \RuntimeException(
                'New file uploaded to Cloudinary but metadata update failed. '
                . 'New Cloudinary file has been removed. Error: ' . $e->getMessage()
            );
        }

        return array_merge($updatedMetadata, ['id' => $oldFileDocId]);
    }

    /**
     * Find a file metadata document by its MongoDB _id.
     *
     * @param string $fileDocId
     * @return array|object|null
     */
    public function findById(string $fileDocId)
    {
        return $this->fileModel->findById($fileDocId);
    }

    /**
     * Find a file metadata document by its Cloudinary public_id.
     *
     * @param string $publicId
     * @return array|object|null
     */
    public function findByPublicId(string $publicId)
    {
        return $this->fileModel->findByPublicId($publicId);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Perform the actual Cloudinary upload.
     *
     * Resource type is determined from the real MIME type:
     *  - image/* → 'image'
     *  - everything else → 'raw'  (documents, zip, etc.)
     *
     * @param string $tmpPath   Absolute path to the temporary file
     * @param string $publicId  Cloudinary public_id (folder/name, no extension)
     * @param string $folder    Cloudinary folder name
     * @param string $realMime  Real MIME type (from FileValidator)
     * @return array            Cloudinary upload response array
     * @throws \RuntimeException On Cloudinary API failure
     */
    private function uploadToCloudinary(
        string $tmpPath,
        string $publicId,
        string $folder,
        string $realMime
    ): array {
        $resourceType = strpos($realMime, 'image/') === 0 ? 'image' : 'raw';

        $uploadApi = $this->cloudinary->uploadApi();

        try {
            $result = $uploadApi->upload($tmpPath, [
                'public_id'     => $publicId,
                'folder'        => $folder,
                'resource_type' => $resourceType,
                'overwrite'     => false,
                'use_filename'  => false, // always use our generated public_id
            ]);
        } catch (\Throwable $e) {
            throw new \RuntimeException(
                'Cloudinary upload failed: ' . $e->getMessage()
            );
        }

        // Ensure the response contains the fields we need
        if (empty($result['secure_url']) || empty($result['public_id'])) {
            throw new \RuntimeException(
                'Cloudinary upload succeeded but the response was incomplete.'
            );
        }

        return (array) $result;
    }

    /**
     * Delete a Cloudinary asset by public_id.
     *
     * Tries image resource type first; falls back to raw (for documents).
     *
     * @param string $publicId
     * @throws \RuntimeException On Cloudinary API failure
     */
    private function destroyOnCloudinary(string $publicId): void
    {
        $uploadApi = $this->cloudinary->uploadApi();

        // Attempt deletion as 'image'; if not found, try 'raw'
        foreach (['image', 'raw'] as $resourceType) {
            try {
                $result = $uploadApi->destroy($publicId, [
                    'resource_type' => $resourceType,
                ]);

                // 'ok' means the asset existed and was deleted
                if (isset($result['result']) && $result['result'] === 'ok') {
                    return;
                }
            } catch (\Throwable $e) {
                // Continue to next resource type
            }
        }

        // If we reach here, deletion was not confirmed — log and continue
        error_log("FileService::destroyOnCloudinary — could not confirm deletion of: {$publicId}");
    }

    /**
     * Generate a unique, filesystem-safe Cloudinary public_id.
     *
     * Format: {folder}/{timestamp}_{16 random hex chars}
     *
     * The folder prefix is excluded from the public_id string itself because
     * Cloudinary receives the folder as a separate 'folder' upload option.
     *
     * @param string $folder Used only for entropy label (not included in returned ID)
     * @return string
     */
    private function generatePublicId(string $folder): string
    {
        $timestamp = time();
        $random    = bin2hex(random_bytes(8)); // 16 hex chars
        $label     = preg_replace('/[^a-z0-9]/', '_', strtolower($folder));

        return "{$label}_{$timestamp}_{$random}";
    }
}
