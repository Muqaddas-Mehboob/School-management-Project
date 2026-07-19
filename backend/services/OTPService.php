<?php

/**
 * OTPService
 *
 * Handles all cryptographic operations for the Forgot Password OTP flow.
 * Pure utility class — no database or HTTP concerns.
 *
 * Security guarantees:
 *  - OTPs generated via random_int() (CSPRNG — never rand() or mt_rand())
 *  - OTPs hashed with bcrypt before DB storage (never stored in plaintext)
 *  - Reset tokens generated via random_bytes() (CSPRNG)
 *  - Reset tokens stored as SHA-256 hash; plain token is only ever returned once
 */
class OTPService
{
    private const OTP_EXPIRY_SECONDS          = 600;  // 10 minutes
    private const RESET_TOKEN_EXPIRY_SECONDS  = 900;  // 15 minutes

    /**
     * Generate a cryptographically secure 6-digit OTP.
     *
     * @return int  e.g. 482931
     */
    public function generateOtp(): int
    {
        return random_int(100000, 999999);
    }

    /**
     * Hash an OTP using bcrypt for safe database storage.
     *
     * @param int $otp
     * @return string  bcrypt hash
     */
    public function hashOtp(int $otp): string
    {
        return password_hash((string) $otp, PASSWORD_BCRYPT);
    }

    /**
     * Verify a plain OTP against its stored bcrypt hash.
     *
     * @param mixed  $plainOtp   Value from the HTTP request body
     * @param string $hashedOtp  bcrypt hash from the database
     * @return bool
     */
    public function verifyOtp($plainOtp, string $hashedOtp): bool
    {
        return password_verify((string) $plainOtp, $hashedOtp);
    }

    /**
     * Generate a cryptographically secure 64-character hex reset token.
     *
     * @return string  e.g. "a3f8c1..."  (64 hex chars = 32 bytes)
     */
    public function generateResetToken(): string
    {
        return bin2hex(random_bytes(32));
    }

    /**
     * Hash a plain reset token for database storage.
     * Uses SHA-256 (constant-time comparison used at verify step).
     *
     * @param string $token  Plain reset token
     * @return string        SHA-256 hex digest
     */
    public function hashResetToken(string $token): string
    {
        return hash('sha256', $token);
    }

    /**
     * Get the OTP expiry timestamp (now + 10 minutes).
     *
     * @return int Unix timestamp
     */
    public function getOtpExpiry(): int
    {
        return time() + self::OTP_EXPIRY_SECONDS;
    }

    /**
     * Get the reset token expiry timestamp (now + 15 minutes).
     *
     * @return int Unix timestamp
     */
    public function getResetTokenExpiry(): int
    {
        return time() + self::RESET_TOKEN_EXPIRY_SECONDS;
    }
}
