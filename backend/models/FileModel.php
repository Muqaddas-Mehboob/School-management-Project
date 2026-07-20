<?php

require_once __DIR__ . '/BaseModel.php';

/**
 * FileModel
 *
 * Manages the 'files' MongoDB collection.
 *
 * This collection stores METADATA ONLY.
 * Binary file content is NEVER stored in MongoDB.
 *
 * Document schema:
 * {
 *   _id            : ObjectId   — auto-generated
 *   url            : string     — Cloudinary secure delivery URL
 *   publicId       : string     — Cloudinary public_id (used for deletion/replacement)
 *   originalFilename : string   — sanitized original filename from the upload
 *   mimeType       : string     — real MIME type detected by FileValidator (finfo)
 *   size           : int        — file size in bytes
 *   folder         : string     — Cloudinary folder (e.g. "profile-images", "assignments")
 *   uploadedBy     : string     — userId of the authenticated user who uploaded the file
 *   createdAt      : string     — ISO 8601 timestamp (set by BaseModel::create)
 *   updatedAt      : string     — ISO 8601 timestamp (set by BaseModel::create / updateById)
 * }
 */
class FileModel extends BaseModel
{
    public function __construct($database)
    {
        parent::__construct($database, 'files');
    }

    /**
     * Find a file metadata record by its Cloudinary public_id.
     *
     * @param string $publicId
     * @return array|object|null
     */
    public function findByPublicId(string $publicId)
    {
        return $this->collection->findOne(['publicId' => $publicId]);
    }

    /**
     * Delete a file metadata record by its Cloudinary public_id.
     *
     * @param string $publicId
     * @return bool True if a document was deleted
     */
    public function deleteByPublicId(string $publicId): bool
    {
        $result = $this->collection->deleteOne(['publicId' => $publicId]);
        return $result->getDeletedCount() > 0;
    }
}
