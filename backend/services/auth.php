<?php

require_once './models/User.model.php';
require_once './middlewares/authmiddleware.php';
require_once './models/RefreshToken.php';
require_once './models/LoginAttempt.php';
require_once './models/PasswordReset.php';
require_once './services/OTPService.php';
require_once './services/EmailService.php';
require_once './validators/AuthValidator.php';

/**
 * AuthService
 *
 * Orchestrates all authentication and account-recovery operations.
 * Business logic lives here; controllers remain thin.
 *
 * Security fixes applied:
 *  V-01  Access token lifetime raised from 10 s → 15 min
 *  V-02  Refresh token stored as SHA-256 hash only
 *  V-05  Logout deletes by token hash, not by email
 *  V-07  storeRefreshToken uses upsert (no accumulation)
 *  V-08  Typo $refrestToken corrected to $refreshToken
 *  V-11  Login brute-force protection via LoginAttempt model
 *  V-12  Input validation added to register() and login()
 *
 * Task 2 methods:
 *  forgotPassword()  — generate & send OTP
 *  verifyOtp()       — verify OTP, issue reset token
 *  resetPassword()   — validate reset token, update password, invalidate sessions
 */
class AuthService
{
    private $userModel;
    private $middleware;
    private $refreshToken;   // V-08: was $refrestToken (typo)
    private $loginAttempt;
    private $passwordReset;
    private $otpService;
    private $emailService;

    public function __construct($database)
    {
        $this->userModel     = new User($database);
        $this->middleware    = new AuthMiddleware($database);
        $this->refreshToken  = new RefreshToken($database);   // V-08
        $this->loginAttempt  = new LoginAttempt($database);
        $this->passwordReset = new PasswordReset($database);
        $this->otpService    = new OTPService();
        $this->emailService  = new EmailService();
    }

    // ─── Core Auth ───────────────────────────────────────────────────────────

    /**
     * Register a new user account.
     * V-12: Validates email, password length, and role before any DB write.
     */
    public function register(array $data): array
    {
        $validation = AuthValidator::register($data);
        if (!$validation['success']) {
            return [
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validation['errors']
            ];
        }

        $existing = $this->userModel->findByEmail($data['email']);
        if ($existing) {
            return ['success' => false, 'message' => 'User already exists.'];
        }

        $data['password']   = password_hash($data['password'], PASSWORD_BCRYPT);
        $data['created_at'] = date('Y-m-d H:i:s');
        $this->userModel->createUser($data);

        return ['success' => true, 'message' => 'User registered successfully.'];
    }

    /**
     * Authenticate a user and issue access + refresh tokens.
     *
     * V-01: Access token lifetime is 15 minutes (was 10 seconds).
     * V-02: Only the SHA-256 hash of the refresh token is stored in the DB.
     *       The plain token is returned to the client once and never stored.
     * V-07: storeRefreshToken() uses upsert — no token accumulation.
     * V-11: Tracks failed attempts; locks account after 5 failures for 15 min.
     * V-12: Validates email format and password presence before DB lookup.
     */
    public function login(array $data): array
    {
        // V-12: Input validation
        $validation = AuthValidator::login($data);
        if (!$validation['success']) {
            return [
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validation['errors']
            ];
        }

        // V-11: Brute-force check
        if ($this->loginAttempt->isLocked($data['email'])) {
            $remaining = $this->loginAttempt->getRemainingLockTime($data['email']);
            return [
                'success' => false,
                'message' => 'Account temporarily locked due to too many failed attempts. '
                           . 'Try again in ' . ceil($remaining / 60) . ' minute(s).'
            ];
        }

        $user = $this->userModel->findByEmail($data['email']);

        // Return the same generic message for "not found" and "wrong password"
        // to prevent user-enumeration attacks.
        if (!$user || !password_verify($data['password'], $user['password'])) {
            if ($user) {
                // Only record attempt when user exists (wrong password)
                $this->loginAttempt->recordAttempt($data['email']); // V-11
            }
            return ['success' => false, 'message' => 'Invalid credentials.'];
        }

        // Successful login — clear any previous lock
        $this->loginAttempt->clearAttempts($data['email']); // V-11

        // V-01: 15-minute access token
        $accessToken       = $this->middleware->generatetoken(60 * 15, $data['email']);

        // V-02: Generate plain refresh token, store only its SHA-256 hash
        $refreshTokenPlain = $this->middleware->generatetoken(60 * 60 * 24 * 7, $data['email']);
        $refreshTokenHash  = hash('sha256', $refreshTokenPlain);
        $this->refreshToken->storeRefreshToken($refreshTokenHash, $data['email']); // V-07 via upsert

        return [
            'success'       => true,
            'message'       => 'User logged in.',
            'token'         => $accessToken,
            'refresh_token' => $refreshTokenPlain  // V-02: plain token returned once; hash stored in DB
        ];
    }

    /**
     * Validate an access token.
     * Returns expired=true when the token has expired so the client knows
     * to call POST /auth/refresh.
     */
    public function verify(string $token): array
    {
        return $this->middleware->validateToken($token);
    }

    /**
     * Exchange a valid refresh token for a new access token.
     * V-03 / V-04: Validates the actual plain token against its stored hash.
     */
    public function refresh(string $refreshTokenValue): array
    {
        return $this->middleware->refreshToken($refreshTokenValue);
    }

    /**
     * Log out a user by deleting their specific refresh token.
     * V-05: Deletes by token hash — not by email — so other sessions are unaffected.
     */
    public function logout(array $data): array
    {
        $refreshTokenValue = $data['refresh_token'] ?? null;
        if (!$refreshTokenValue) {
            return ['success' => false, 'message' => 'refresh_token is required to logout.'];
        }

        $tokenHash = hash('sha256', $refreshTokenValue);
        $this->refreshToken->deleteByTokenHash($tokenHash); // V-05

        return ['success' => true, 'message' => 'User logged out successfully.'];
    }

    // ─── Task 2: Forgot Password (3-step OTP flow) ───────────────────────────

    /**
     * Step 1 — Forgot Password
     *
     * Verifies the email exists, generates a secure 6-digit OTP,
     * stores only its bcrypt hash in MongoDB, and sends the plain OTP via email.
     *
     * Security:
     *  - Generic success message returned even for unknown emails (prevents enumeration)
     *  - Max 5 OTP requests per 10-minute window
     *  - OTP never exposed in the API response
     */
    public function forgotPassword(array $data): array
    {
        $validation = AuthValidator::forgotPassword($data);
        if (!$validation['success']) {
            return [
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validation['errors'],
                '_status' => 422
            ];
        }

        $user = $this->userModel->findByEmail($data['email']);

        // Generic response — do not reveal whether the email is registered
        if (!$user) {
            return [
                'success'  => true,
                'message'  => 'If this email is registered, an OTP has been sent.',
                '_status'  => 200
            ];
        }

        // Rate-limit: if a pending (non-expired) OTP already has 5 attempts, block
        $existing = $this->passwordReset->findByEmail($data['email']);
        if (
            $existing &&
            ($existing['otp_attempts'] ?? 0) >= 5 &&
            ($existing['otp_expires_at'] ?? 0) > time()
        ) {
            return [
                'success'  => false,
                'message'  => 'Too many OTP requests. Please wait 10 minutes and try again.',
                '_status'  => 429
            ];
        }

        $otp       = $this->otpService->generateOtp();
        $otpHash   = $this->otpService->hashOtp($otp);
        $expiresAt = $this->otpService->getOtpExpiry();

        $this->passwordReset->upsertOtp($data['email'], $otpHash, $expiresAt);

        $mailResult = $this->emailService->sendOtpEmail($data['email'], $otp);
        if (!$mailResult['success']) {
            return [
                'success'  => false,
                'message'  => 'Failed to send OTP email. Please try again later.',
                '_status'  => 500
            ];
        }

        return [
            'success'  => true,
            'message'  => 'OTP sent to your email address. It expires in 10 minutes.',
            '_status'  => 200
        ];
    }

    /**
     * Step 2 — Verify OTP
     *
     * Validates the submitted OTP against the bcrypt hash in MongoDB.
     * On success, generates a 64-character cryptographic reset token,
     * stores only its SHA-256 hash, and returns the plain token once.
     *
     * Security:
     *  - Max 5 wrong OTP attempts before the record must be refreshed
     *  - Expiry checked before verification
     *  - OTP hash nullified after successful verification (cannot reuse)
     */
    public function verifyOtp(array $data): array
    {
        $validation = AuthValidator::verifyOtp($data);
        if (!$validation['success']) {
            return [
                'success'  => false,
                'message'  => 'Validation failed.',
                'errors'   => $validation['errors'],
                '_status'  => 422
            ];
        }

        $record = $this->passwordReset->findByEmail($data['email']);
        if (!$record) {
            return [
                'success'  => false,
                'message'  => 'No OTP request found for this email. Please request a new OTP.',
                '_status'  => 404
            ];
        }

        if (($record['otp_expires_at'] ?? 0) < time()) {
            return [
                'success'  => false,
                'message'  => 'OTP has expired. Please request a new one.',
                '_status'  => 422
            ];
        }

        if (($record['otp_attempts'] ?? 0) >= 5) {
            return [
                'success'  => false,
                'message'  => 'Too many incorrect OTP attempts. Please request a new OTP.',
                '_status'  => 429
            ];
        }

        if (!$this->otpService->verifyOtp($data['otp'], $record['otp_hash'] ?? '')) {
            $this->passwordReset->incrementAttempts($data['email']);
            return [
                'success'  => false,
                'message'  => 'Invalid OTP. Please try again.',
                '_status'  => 401
            ];
        }

        // OTP verified — generate and store the reset token
        $resetToken      = $this->otpService->generateResetToken();
        $resetTokenHash  = $this->otpService->hashResetToken($resetToken);
        $expiresAt       = $this->otpService->getResetTokenExpiry();

        $this->passwordReset->storeResetToken($data['email'], $resetTokenHash, $expiresAt);

        return [
            'success'      => true,
            'message'      => 'OTP verified. Use the reset token to set your new password.',
            'reset_token'  => $resetToken,  // Plain token returned once; hash stored in DB
            '_status'      => 200
        ];
    }

    /**
     * Step 3 — Reset Password
     *
     * Validates the reset token (constant-time comparison), updates the user's
     * password, deletes the OTP document, and invalidates all active sessions.
     *
     * Security:
     *  - hash_equals() for constant-time reset token comparison (prevents timing attacks)
     *  - New password hashed with bcrypt before storage
     *  - All refresh tokens for this email are revoked (force re-login)
     *  - OTP/reset document deleted immediately after use
     */
    public function resetPassword(array $data): array
    {
        $validation = AuthValidator::resetPassword($data);
        if (!$validation['success']) {
            return [
                'success'  => false,
                'message'  => 'Validation failed.',
                'errors'   => $validation['errors'],
                '_status'  => 422
            ];
        }

        $record = $this->passwordReset->findByEmail($data['email']);
        if (!$record || empty($record['reset_token_hash'])) {
            return [
                'success'  => false,
                'message'  => 'Invalid or expired reset token. Please start the process again.',
                '_status'  => 401
            ];
        }

        if (($record['reset_token_expires_at'] ?? 0) < time()) {
            return [
                'success'  => false,
                'message'  => 'Reset token has expired. Please request a new OTP.',
                '_status'  => 422
            ];
        }

        // Constant-time comparison to prevent timing attacks
        $incomingHash = $this->otpService->hashResetToken($data['reset_token']);
        if (!hash_equals($record['reset_token_hash'], $incomingHash)) {
            return [
                'success'  => false,
                'message'  => 'Invalid reset token.',
                '_status'  => 401
            ];
        }

        // Update the password
        $hashedPassword = password_hash($data['new_password'], PASSWORD_BCRYPT);
        $this->userModel->updatePasswordByEmail($data['email'], $hashedPassword);

        // Cleanup: delete OTP document and revoke all sessions
        $this->passwordReset->deleteByEmail($data['email']);
        $this->refreshToken->deleteAllForEmail($data['email']);

        return [
            'success'  => true,
            'message'  => 'Password reset successfully. Please log in with your new password.',
            '_status'  => 200
        ];
    }
}