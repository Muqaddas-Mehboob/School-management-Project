<?php

require_once __DIR__ . '/../services/FileService.php';
require_once __DIR__ . '/../validators/FileValidator.php';
require_once __DIR__ . '/../models/User.model.php';


class ProfileController
{
    /** @var FileService */
    private FileService $fileService;

    /** @var User */
    private User $userModel;

    /**
     * @param mixed $database MongoDB database instance
     */
    public function __construct($database)
    {
        $this->fileService = new FileService($database);
        $this->userModel   = new User($database);
    }

    /**
     * POST /api/profile/upload-image
     *
     * Upload or replace the authenticated user's profile image.
     *
     * Expects:
     *   - Multipart/form-data request
     *   - $_FILES['image'] — the image file
     *
     * Returns:
     *   201 on success with the new image URL and metadata
     *   422 on validation failure
     *   500 on internal error
     *
     * @param string $userId    Authenticated user's MongoDB _id
     * @param string $userRole  Authenticated user's role
     * @return array
     */
    public function uploadImage(string $userId, string $userRole): array
    {
        // ── 1. Ensure a file was submitted ────────────────────────────────────
        if (!isset($_FILES['image']) || $_FILES['image']['error'] === UPLOAD_ERR_NO_FILE) {
            http_response_code(422);
            return [
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => ['image' => 'No image file was provided. Expected field name: "image".'],
            ];
        }

        // ── 2. Validate file (binary MIME inspection) ─────────────────────────
        $validation = FileValidator::validate($_FILES['image'], FileValidator::POLICY_PROFILE_IMAGE);
        if (!$validation['success']) {
            http_response_code(422);
            return [
                'success' => false,
                'message' => 'File validation failed.',
                'errors'  => ['image' => $validation['errors']],
            ];
        }

        // ── 3. Fetch the current user to check for an existing profile image ──
        $user = $this->userModel->findById($userId);
        if (!$user) {
            http_response_code(401);
            return ['success' => false, 'message' => 'Authenticated user not found.'];
        }

        try {
            // ── 4a. Replace existing image ────────────────────────────────────
            if (!empty($user['profileImagePublicId']) && !empty($user['profileImageFileDocId'])) {
                $metadata = $this->fileService->replace(
                    (string) $user['profileImagePublicId'],
                    (string) $user['profileImageFileDocId'],
                    $_FILES['image'],
                    FileService::FOLDER_PROFILE_IMAGES,
                    $userId,
                    $validation['realMime']
                );
            } else {
                // ── 4b. First upload ──────────────────────────────────────────
                $metadata = $this->fileService->upload(
                    $_FILES['image'],
                    FileService::FOLDER_PROFILE_IMAGES,
                    $userId,
                    $validation['realMime']
                );
            }
        } catch (\RuntimeException $e) {
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'File upload failed: ' . $e->getMessage(),
            ];
        }

        // ── 5. Update user record with new image references ───────────────────
        $updated = $this->userModel->updateById($userId, [
            'profileImageUrl'       => $metadata['url'],
            'profileImagePublicId'  => $metadata['publicId'],
            'profileImageFileDocId' => $metadata['id'],
        ]);

        if (!$updated) {
            // The file is stored; only the user reference update failed.
            // Not a critical rollback situation — surface as a warning.
            http_response_code(207);
            return [
                'success' => true,
                'message' => 'Image uploaded but user profile reference could not be updated.',
                'data'    => [
                    'url'      => $metadata['url'],
                    'publicId' => $metadata['publicId'],
                    'mimeType' => $metadata['mimeType'],
                    'size'     => $metadata['size'],
                ],
            ];
        }

        http_response_code(201);
        return [
            'success' => true,
            'message' => 'Profile image updated successfully.',
            'data'    => [
                'url'      => $metadata['url'],
                'publicId' => $metadata['publicId'],
                'mimeType' => $metadata['mimeType'],
                'size'     => $metadata['size'],
            ],
        ];
    }
}
