<?php

/**
 * FileValidator
 *
 * Validates uploaded files by inspecting their actual binary content.
 *
 * Security principles enforced here:
 *  - NEVER trust the extension supplied in the filename.
 *  - NEVER trust the Content-Type header sent by the client.
 *  - ALWAYS read the actual binary magic bytes via finfo.
 *  - Reject any file whose real MIME type is not in the allowed list for
 *    the given policy.
 *  - Reject renamed executables, PHP scripts, JS files and shell scripts.
 *  - Enforce per-policy maximum file size.
 *
 * Usage:
 *   $result = FileValidator::validate($_FILES['image'], FileValidator::POLICY_PROFILE_IMAGE);
 *   if (!$result['success']) { ... $result['errors'] ... }
 */
class FileValidator
{
    // ── Policies ─────────────────────────────────────────────────────────────

    /** Policy identifier for profile images */
    const POLICY_PROFILE_IMAGE = 'profile_image';

    /** Policy identifier for assignment files */
    const POLICY_ASSIGNMENT = 'assignment';

    /** Policy identifier for student submission files */
    const POLICY_SUBMISSION = 'submission';

    // ── Per-policy configuration ─────────────────────────────────────────────

    /**
     * Maps each policy to its allowed real MIME types and max size in bytes.
     *
     * These are the ACTUAL binary MIME types detected by finfo — not
     * user-supplied values.
     */
    private const POLICIES = [
        self::POLICY_PROFILE_IMAGE => [
            'maxBytes'     => 5 * 1024 * 1024, // 5 MB
            'allowedMimes' => [
                'image/jpeg',
                'image/png',
                'image/webp',
            ],
            'label' => 'Profile image',
        ],
        self::POLICY_ASSIGNMENT => [
            'maxBytes'     => 25 * 1024 * 1024, // 25 MB
            'allowedMimes' => [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/zip',
            ],
            'label' => 'Assignment file',
        ],
        self::POLICY_SUBMISSION => [
            'maxBytes'     => 25 * 1024 * 1024, // 25 MB
            'allowedMimes' => [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/zip',
            ],
            'label' => 'Submission file',
        ],
    ];

    /**
     * MIME types that are NEVER allowed regardless of policy.
     *
     * This is a hard block list. Any file whose real MIME resolves to one of
     * these values is rejected unconditionally.
     */
    private const BLOCKED_MIMES = [
        'text/x-php',
        'application/x-php',
        'application/x-httpd-php',
        'application/x-httpd-php-source',
        'text/x-script.php',
        'application/x-executable',
        'application/x-msdownload',
        'application/x-dosexec',
        'application/vnd.microsoft.portable-executable',
        'application/octet-stream', // generic binary — too dangerous to allow
        'text/javascript',
        'application/javascript',
        'application/x-javascript',
        'text/x-shellscript',
        'application/x-shellscript',
        'application/x-sh',
        'text/x-sh',
        'application/x-perl',
        'text/x-perl',
        'application/x-python',
        'text/x-python',
        'application/x-ruby',
        'text/x-ruby',
    ];

    // ── Public interface ──────────────────────────────────────────────────────

    /**
     * Validate a file from $_FILES against the given policy.
     *
     * @param array  $file   A single entry from $_FILES, e.g. $_FILES['image']
     * @param string $policy One of the POLICY_* constants
     * @return array ['success' => bool, 'errors' => string[], 'realMime' => string]
     */
    public static function validate(array $file, string $policy): array
    {
        $errors = [];

        // ── 1. Check for PHP upload errors ────────────────────────────────────
        $uploadError = self::checkUploadError($file['error'] ?? UPLOAD_ERR_NO_FILE);
        if ($uploadError !== null) {
            return ['success' => false, 'errors' => [$uploadError], 'realMime' => ''];
        }

        // ── 2. Validate policy ────────────────────────────────────────────────
        if (!isset(self::POLICIES[$policy])) {
            return [
                'success'  => false,
                'errors'   => ['Unknown file policy: ' . $policy],
                'realMime' => '',
            ];
        }

        $policyConfig = self::POLICIES[$policy];

        // ── 3. Validate file size BEFORE reading binary content ───────────────
        $size = $file['size'] ?? 0;
        if ($size <= 0) {
            $errors[] = 'Uploaded file is empty.';
        } elseif ($size > $policyConfig['maxBytes']) {
            $maxMb    = $policyConfig['maxBytes'] / (1024 * 1024);
            $errors[] = "{$policyConfig['label']} must not exceed {$maxMb} MB. "
                      . 'Received: ' . round($size / (1024 * 1024), 2) . ' MB.';
        }

        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors, 'realMime' => ''];
        }

        // ── 4. Inspect actual binary content (magic bytes via finfo) ──────────
        $tmpPath = $file['tmp_name'] ?? '';
        if ($tmpPath === '' || !is_file($tmpPath) || !is_readable($tmpPath)) {
            return [
                'success'  => false,
                'errors'   => ['Temporary file is not accessible.'],
                'realMime' => '',
            ];
        }

        $realMime = self::detectMime($tmpPath);
        if ($realMime === false || $realMime === '') {
            return [
                'success'  => false,
                'errors'   => ['Unable to determine file type. Upload rejected.'],
                'realMime' => '',
            ];
        }

        // ── 5. Hard block list — reject dangerous types unconditionally ───────
        if (in_array($realMime, self::BLOCKED_MIMES, true)) {
            return [
                'success'  => false,
                'errors'   => [
                    "File type '{$realMime}' is not permitted. "
                    . 'Executable and script files are always rejected.'
                ],
                'realMime' => $realMime,
            ];
        }

        // ── 6. Policy allowlist — real MIME must be in the policy list ────────
        if (!in_array($realMime, $policyConfig['allowedMimes'], true)) {
            $allowed  = implode(', ', $policyConfig['allowedMimes']);
            $errors[] = "{$policyConfig['label']} has an invalid file type "
                      . "(detected: {$realMime}). Allowed types: {$allowed}.";
        }

        // ── 7. Additional image integrity check for image policies ────────────
        if ($policy === self::POLICY_PROFILE_IMAGE && empty($errors)) {
            $imageError = self::verifyImageIntegrity($tmpPath);
            if ($imageError !== null) {
                $errors[] = $imageError;
            }
        }

        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors, 'realMime' => $realMime];
        }

        return ['success' => true, 'errors' => [], 'realMime' => $realMime];
    }

    /**
     * Sanitize an original filename so it is safe to log/store.
     *
     * - Strips directory traversal characters
     * - Keeps only alphanumeric, dash, underscore, and dot
     * - Truncates to 200 characters
     *
     * @param string $originalName
     * @return string
     */
    public static function sanitizeFilename(string $originalName): string
    {
        // Remove any path components
        $name = basename($originalName);

        // Keep only safe characters
        $name = preg_replace('/[^a-zA-Z0-9._\-]/', '_', $name);

        // Collapse multiple underscores
        $name = preg_replace('/_+/', '_', $name);

        // Truncate
        return substr($name, 0, 200);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Detect the real MIME type of a file using the Fileinfo extension.
     * Falls back to mime_content_type() if finfo is unavailable.
     *
     * @param string $filePath Absolute path to the file
     * @return string|false MIME type string, or false on failure
     */
    private static function detectMime(string $filePath)
    {
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo !== false) {
                $mime = finfo_file($finfo, $filePath);
                finfo_close($finfo);
                return $mime;
            }
        }

        // Fallback — less reliable but better than nothing
        if (function_exists('mime_content_type')) {
            return mime_content_type($filePath);
        }

        return false;
    }

    /**
     * Attempt to open the file as an image to confirm it is a valid,
     * non-corrupted image rather than just having a matching MIME header.
     *
     * @param string $filePath
     * @return string|null Error message, or null if the image is valid
     */
    private static function verifyImageIntegrity(string $filePath): ?string
    {
        // getimagesize() reads image metadata without loading pixels into memory
        $info = @getimagesize($filePath);
        if ($info === false) {
            return 'The uploaded file could not be verified as a valid image.';
        }

        return null;
    }

    /**
     * Translate a PHP upload error code into a human-readable message.
     *
     * @param int $errorCode One of the UPLOAD_ERR_* constants
     * @return string|null Error message, or null if no error
     */
    private static function checkUploadError(int $errorCode): ?string
    {
        switch ($errorCode) {
            case UPLOAD_ERR_OK:
                return null;
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return 'The uploaded file exceeds the maximum allowed size.';
            case UPLOAD_ERR_PARTIAL:
                return 'The file was only partially uploaded. Please try again.';
            case UPLOAD_ERR_NO_FILE:
                return 'No file was uploaded.';
            case UPLOAD_ERR_NO_TMP_DIR:
                return 'Server misconfiguration: missing temporary directory.';
            case UPLOAD_ERR_CANT_WRITE:
                return 'Server error: failed to write file to disk.';
            case UPLOAD_ERR_EXTENSION:
                return 'A PHP extension stopped the file upload.';
            default:
                return 'Unknown upload error occurred.';
        }
    }

    /** Prevent instantiation — this is a static utility class. */
    private function __construct() {}
}
