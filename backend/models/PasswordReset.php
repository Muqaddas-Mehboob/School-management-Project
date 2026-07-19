<?php

require_once __DIR__ . '/BaseModel.php';

/**
 * PasswordReset Model
 *
 * Manages the passwordResets MongoDB collection for the Forgot Password flow (Task 2).
 *
 * Document shape:
 * {
 *   _id: ObjectId,
 *   email: string,
 *   otp_hash: string|null,          — bcrypt hash of the 6-digit OTP
 *   otp_expires_at: int,            — Unix timestamp
 *   otp_attempts: int,              — incremented on each wrong OTP attempt
 *   reset_token_hash: string|null,  — SHA-256 hash of the plain reset token
 *   reset_token_expires_at: int,    — Unix timestamp (15 min after OTP verified)
 *   created_at: string              — ISO 8601
 * }
 */
class PasswordReset extends BaseModel
{
    public function __construct($database)
    {
        parent::__construct($database, 'passwordResets');
    }

    /**
     * Create or replace the OTP document for a given email (upsert).
     * Resets attempts and clears any previous reset token.
     *
     * @param string $email
     * @param string $otpHash      bcrypt hash of the OTP
     * @param int    $expiresAt    Unix timestamp (now + 10 min)
     */
    public function upsertOtp(string $email, string $otpHash, int $expiresAt)
    {
        return $this->collection->updateOne(
            ['email' => $email],
            [
                '$set' => [
                    'email'                  => $email,
                    'otp_hash'               => $otpHash,
                    'otp_expires_at'         => $expiresAt,
                    'otp_attempts'           => 0,
                    'reset_token_hash'       => null,
                    'reset_token_expires_at' => null,
                    'created_at'             => date('c')
                ]
            ],
            ['upsert' => true]
        );
    }

    /**
     * Find the password-reset document by email.
     *
     * @param string $email
     * @return array|null
     */
    public function findByEmail(string $email)
    {
        return $this->collection->findOne(['email' => $email]);
    }

    /**
     * Increment the OTP attempt counter for an email.
     *
     * @param string $email
     */
    public function incrementAttempts(string $email)
    {
        return $this->collection->updateOne(
            ['email' => $email],
            ['$inc' => ['otp_attempts' => 1]]
        );
    }

    /**
     * After successful OTP verification, store the hashed reset token.
     * Nullifies the OTP hash to prevent reuse.
     *
     * @param string $email
     * @param string $resetTokenHash  SHA-256 hash of the plain reset token
     * @param int    $expiresAt       Unix timestamp (now + 15 min)
     */
    public function storeResetToken(string $email, string $resetTokenHash, int $expiresAt)
    {
        return $this->collection->updateOne(
            ['email' => $email],
            [
                '$set' => [
                    'otp_hash'               => null,  // OTP consumed; cannot be reused
                    'reset_token_hash'       => $resetTokenHash,
                    'reset_token_expires_at' => $expiresAt
                ]
            ]
        );
    }

    /**
     * Delete the document after a successful password reset (cleanup).
     *
     * @param string $email
     */
    public function deleteByEmail(string $email)
    {
        return $this->collection->deleteOne(['email' => $email]);
    }
}
