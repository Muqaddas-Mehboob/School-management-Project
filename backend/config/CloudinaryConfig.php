<?php

/**
 * CloudinaryConfig
 *
 * Single responsibility: read Cloudinary credentials from the environment,
 * validate that all required values are present, and return a fully
 * configured Cloudinary\Cloudinary SDK instance.
 *
 * Rules:
 *   - This class does NOT contain upload, delete or any business logic.
 *   - Every Cloudinary operation in the project MUST obtain its SDK
 *     instance via CloudinaryConfig::getInstance().
 *   - No controller, validator or model may instantiate the Cloudinary SDK
 *     directly. Only FileService may call Cloudinary operations.
 */
class CloudinaryConfig
{
    /** @var \Cloudinary\Cloudinary|null Cached SDK instance */
    private static ?\Cloudinary\Cloudinary $instance = null;

    /**
     * Returns a singleton Cloudinary SDK instance configured from .env.
     *
     * Throws a RuntimeException if any required credential is missing so
     * that misconfigurations surface immediately at boot time rather than
     * silently producing broken upload URLs.
     *
     * @return \Cloudinary\Cloudinary
     * @throws \RuntimeException When a required env variable is absent or empty
     */
    public static function getInstance(): \Cloudinary\Cloudinary
    {
        if (self::$instance === null) {
            self::$instance = new \Cloudinary\Cloudinary(
                self::buildConfiguration()
            );
        }

        return self::$instance;
    }

    /**
     * Build and return a validated Cloudinary\Configuration\Configuration
     * object from environment variables.
     *
     * @return \Cloudinary\Configuration\Configuration
     * @throws \RuntimeException
     */
    private static function buildConfiguration(): array{
    $cloudName = trim($_ENV['CLOUDINARY_CLOUD_NAME'] ?? '', "\"'");
    $apiKey = trim($_ENV['CLOUDINARY_API_KEY'] ?? '', "\"'");
    $apiSecret = trim($_ENV['CLOUDINARY_API_SECRET'] ?? '', "\"'");

    self::validateCredentials($cloudName, $apiKey, $apiSecret);

    return [
        'cloud' => [
            'cloud_name' => $cloudName,
            'api_key' => $apiKey,
            'api_secret' => $apiSecret,
        ],
        'url' => [
            'secure' => true,
        ],
    ];
}

    /**
     * Validate that all three required Cloudinary credentials are non-empty.
     *
     * @param string $cloudName
     * @param string $apiKey
     * @param string $apiSecret
     * @throws \RuntimeException
     */
    private static function validateCredentials(
        string $cloudName,
        string $apiKey,
        string $apiSecret
    ): void {
        $missing = [];

        if ($cloudName === '') {
            $missing[] = 'CLOUDINARY_CLOUD_NAME';
        }
        if ($apiKey === '') {
            $missing[] = 'CLOUDINARY_API_KEY';
        }
        if ($apiSecret === '') {
            $missing[] = 'CLOUDINARY_API_SECRET';
        }

        if (!empty($missing)) {
            throw new \RuntimeException(
                'Cloudinary configuration error: missing required environment '
                . 'variable(s): ' . implode(', ', $missing)
            );
        }
    }

    /**
     * Prevent instantiation — this class is a static factory only.
     */
    private function __construct() {}

    /**
     * Prevent cloning.
     */
    private function __clone() {}
}
