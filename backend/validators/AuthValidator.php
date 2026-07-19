<?php

require_once __DIR__ . '/Validator.php';

/**
 * AuthValidator
 *
 * Centralises all validation rules for authentication-related endpoints.
 * Delegates to the existing Validator class — no duplicate validation logic.
 */
class AuthValidator
{
    /**
     * Validate registration input.
     * V-12: Prevents unvalidated data from being written to the users collection.
     */
    public static function register(array $data): array
    {
        return Validator::validate($data, [
            'email'    => 'required|email',
            'password' => 'required|min:8',
            'role'     => 'required|in:admin,teacher,student,parent',
        ]);
    }

    /**
     * Validate login input.
     */
    public static function login(array $data): array
    {
        return Validator::validate($data, [
            'email'    => 'required|email',
            'password' => 'required',
        ]);
    }

    /**
     * Validate forgot-password request (Step 1).
     */
    public static function forgotPassword(array $data): array
    {
        return Validator::validate($data, [
            'email' => 'required|email',
        ]);
    }

    /**
     * Validate OTP submission (Step 2).
     */
    public static function verifyOtp(array $data): array
    {
        return Validator::validate($data, [
            'email' => 'required|email',
            'otp'   => 'required',
        ]);
    }

    /**
     * Validate password-reset submission (Step 3).
     * Also cross-checks that new_password and confirm_password match.
     */
    public static function resetPassword(array $data): array
    {
        $result = Validator::validate($data, [
            'email'            => 'required|email',
            'reset_token'      => 'required',
            'new_password'     => 'required|min:8',
            'confirm_password' => 'required',
        ]);

        // Extra cross-field check — passwords must match
        if ($result['success'] && $data['new_password'] !== $data['confirm_password']) {
            $result['success']                       = false;
            $result['errors']['confirm_password'][]  = 'Passwords do not match.';
        }

        return $result;
    }
}
