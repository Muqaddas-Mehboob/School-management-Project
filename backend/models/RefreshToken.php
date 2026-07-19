<?php

class RefreshToken
{
    private $collection;

    public function __construct($database)
    {
        $this->collection = $database->refreshTokens;
    }

    /**
     * Store (or replace) the hashed refresh token for a user.
     * Uses upsert so a second login doesn't accumulate tokens (fixes V-07).
     * Stores only the SHA-256 hash, never the raw token (fixes V-02).
     *
     * @param string $tokenHash  SHA-256 hash of the plain refresh token
     * @param string $email
     */
    public function storeRefreshToken(string $tokenHash, string $email)
    {
        return $this->collection->updateOne(
            ['email' => $email],
            [
                '$set' => [
                    'token_hash' => $tokenHash,
                    'email'      => $email,
                    'created_at' => time(),
                    'expires_at' => time() + 60 * 60 * 24 * 7 // 7 days
                ]
            ],
            ['upsert' => true]
        );
    }

    /**
     * Look up a refresh token document by its SHA-256 hash.
     *
     * @param string $tokenHash
     * @return array|null
     */
    public function findByTokenHash(string $tokenHash)
    {
        return $this->collection->findOne(['token_hash' => $tokenHash]);
    }

    /**
     * Delete a specific refresh token by its hash (fixes V-05 — logout by token).
     *
     * @param string $tokenHash
     */
    public function deleteByTokenHash(string $tokenHash)
    {
        return $this->collection->deleteOne(['token_hash' => $tokenHash]);
    }

    /**
     * Delete ALL refresh tokens for an email.
     * Used when a password is reset to force re-login on all devices.
     *
     * @param string $email
     */
    public function deleteAllForEmail(string $email)
    {
        return $this->collection->deleteMany(['email' => $email]);
    }
}