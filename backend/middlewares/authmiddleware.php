<?php

require_once './vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

require_once './models/RefreshToken.php';

/**
 * AuthMiddleware
 *
 * Responsibilities:
 *  - Generate RS256-signed JWTs
 *  - Validate access tokens
 *  - Exchange a valid (hashed) refresh token for a new access token
 *
 * Security changes (V-03, V-04):
 *  - validateToken() no longer auto-refreshes on expiry.
 *    It simply returns { success: false, expired: true }.
 *    Clients must call POST /auth/refresh with their refresh token.
 *  - refreshToken() now requires the ACTUAL refresh token value,
 *    hashes it, and validates against the stored hash — never trusts
 *    an unverified payload from an expired JWT.
 */
class AuthMiddleware
{
    private $database;

    public function __construct($database)
    {
        $this->database = $database;
    }

    /**
     * Validate an access token.
     *
     * Returns:
     *   success=true  → token is valid; decoded payload included
     *   success=false, expired=true  → token is expired; client should call /auth/refresh
     *   success=false, expired=false → token is invalid / malformed
     *
     * @param string $token
     * @return array
     */
    public function validateToken(string $token): array
    {
        $publicKey = file_get_contents(__DIR__ . '/../keys/public_key_pem');

        try {
            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));

            if ($decoded->sub !== 'EduPortal') {
                return [
                    'success' => false,
                    'expired' => false,
                    'message' => 'Invalid token: unexpected subject.'
                ];
            }

            return [
                'success' => true,
                'expired' => false,
                'decoded' => $decoded,
                'message' => 'Token validated'
            ];

        } catch (ExpiredException $e) {
            // V-03 FIX: Do NOT decode the payload from the expired token.
            // Returning expired=true tells the client to call POST /auth/refresh
            // with the actual refresh token, which is validated via its stored hash.
            return [
                'success' => false,
                'expired' => true,
                'message' => 'Access token expired. Please refresh your session.'
            ];

        } catch (\Throwable $th) {
            return [
                'success' => false,
                'expired' => false,
                'message' => 'Token validation error: ' . $th->getMessage()
            ];
        }
    }

    /**
     * Exchange a refresh token for a new access token.
     *
     * V-04 FIX: Accepts the PLAIN refresh token from the client, hashes it
     * with SHA-256, and looks up the stored hash in the database.
     * Never trusts any payload from an expired access token.
     *
     * @param string $refreshTokenValue  The plain refresh token from the client
     * @return array
     */
    public function refreshToken(string $refreshTokenValue): array
    {
        $tokenHash          = hash('sha256', $refreshTokenValue);
        $refreshTokenModel  = new RefreshToken($this->database);
        $storedToken        = $refreshTokenModel->findByTokenHash($tokenHash);

        if (!$storedToken) {
            return [
                'success' => false,
                'message' => 'Invalid refresh token.'
            ];
        }

        if (!$this->timeinfuture($storedToken['expires_at'] ?? 0)) {
            return [
                'success' => false,
                'message' => 'Refresh token has expired. Please login again.'
            ];
        }

        $email       = $storedToken['email'];
        $newToken    = $this->generatetoken(60 * 15, $email); // new 15-min access token

        return [
            'success' => true,
            'expired' => true,   // original access token was expired
            'token'   => $newToken,
            'message' => 'Token refreshed'
        ];
    }

    /**
     * Returns true if the given Unix timestamp is in the future (not yet expired).
     *
     * @param int $time Unix timestamp
     * @return bool
     */
    public function timeinfuture(int $time): bool
    {
        return $time >= time();
    }

    /**
     * Generate an RS256-signed JWT.
     *
     * @param int    $seconds  Token lifetime in seconds
     * @param string $email    Subject's email address
     * @return string
     */
    public function generatetoken(int $seconds, string $email): string
    {
        $privateKey = file_get_contents(__DIR__ . '/../keys/private_key_pem');

        $payload = [
            'iss'   => 'localhost',
            'iat'   => time(),
            'exp'   => time() + $seconds,
            'email' => $email,
            'sub'   => 'EduPortal'
        ];

        return JWT::encode($payload, $privateKey, 'RS256');
    }
}