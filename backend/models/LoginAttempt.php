<?php

require_once __DIR__ . '/BaseModel.php';

/**
 * LoginAttempt Model
 *
 * Tracks failed login attempts per email address to prevent brute-force attacks (V-11).
 * Collection: loginAttempts
 *
 * Document shape:
 * {
 *   email: string,
 *   attempts: int,
 *   last_attempt_at: int (Unix timestamp),
 *   locked_until: int (Unix timestamp, 0 = not locked)
 * }
 */
class LoginAttempt
{
    private $collection;

    private const MAX_ATTEMPTS   = 5;
    private const LOCK_DURATION  = 60 * 15; // 15 minutes

    public function __construct($database)
    {
        $this->collection = $database->loginAttempts;
    }

    /**
     * Check whether the account is currently locked.
     *
     * @param string $email
     * @return bool
     */
    public function isLocked(string $email): bool
    {
        $record = $this->collection->findOne(['email' => $email]);
        if (!$record) {
            return false;
        }
        return ($record['locked_until'] ?? 0) > time();
    }

    /**
     * Record a failed login attempt. Locks the account after MAX_ATTEMPTS.
     *
     * @param string $email
     */
    public function recordAttempt(string $email): void
    {
        $record   = $this->collection->findOne(['email' => $email]);
        $attempts = ($record['attempts'] ?? 0) + 1;

        $lockedUntil = ($record['locked_until'] ?? 0);
        if ($attempts >= self::MAX_ATTEMPTS) {
            $lockedUntil = time() + self::LOCK_DURATION;
        }

        $this->collection->updateOne(
            ['email' => $email],
            [
                '$set' => [
                    'email'           => $email,
                    'attempts'        => $attempts,
                    'last_attempt_at' => time(),
                    'locked_until'    => $lockedUntil
                ]
            ],
            ['upsert' => true]
        );
    }

    /**
     * Clear all attempt records for an email (called on successful login).
     *
     * @param string $email
     */
    public function clearAttempts(string $email): void
    {
        $this->collection->deleteOne(['email' => $email]);
    }

    /**
     * Get remaining lock time in seconds. Returns 0 if not locked.
     *
     * @param string $email
     * @return int
     */
    public function getRemainingLockTime(string $email): int
    {
        $record = $this->collection->findOne(['email' => $email]);
        if (!$record) {
            return 0;
        }
        return (int) max(0, ($record['locked_until'] ?? 0) - time());
    }
}
