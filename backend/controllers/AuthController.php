<?php

require_once __DIR__ . '/../services/auth.php';

/**
 * AuthController
 *
 * Thin controller for the Forgot Password endpoints (Task 2).
 * All business logic lives in AuthService.
 */
class AuthController
{
    private $authService;

    public function __construct($database)
    {
        $this->authService = new AuthService($database);
    }

    /**
     * POST /auth/forgot-password
     * Step 1: Send OTP to email.
     */
    public function forgotPassword(array $data): array
    {
        return $this->authService->forgotPassword($data);
    }

    /**
     * POST /auth/verify-otp
     * Step 2: Verify OTP, receive reset token.
     */
    public function verifyOtp(array $data): array
    {
        return $this->authService->verifyOtp($data);
    }

    /**
     * POST /auth/reset-password
     * Step 3: Submit new password using reset token.
     */
    public function resetPassword(array $data): array
    {
        return $this->authService->resetPassword($data);
    }
}
