<?php

require_once './controllers/UserController.php';
require_once './controllers/AuthController.php';
require_once './services/auth.php';
require_once './middlewares/authmiddleware.php';

$database = require './config/db.php';

$controller     = new UserController($database);
$authController = new AuthController($database);
$AuthMiddleware = new AuthMiddleware($database);

$body = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

switch ($route) {

    // ── Registration ─────────────────────────────────────────────────────────
    case 'register':
        // V-09: Removed dead token-generation code that was here before
        echo json_encode($controller->register($body));
        break;

    // ── Login ─────────────────────────────────────────────────────────────────
    case 'login':
        echo json_encode($controller->login($body));
        break;

    // ── Verify Access Token ───────────────────────────────────────────────────
    case 'verify':
        // V-06: Removed sleep(6) — was a DoS vector
        $headers    = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Authorization header missing.']);
            break;
        }

        $parts  = explode(' ', $authHeader);
        $token  = end($parts);

        try {
            echo json_encode($controller->verify($token));
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Token verification error.']);
        }
        break;

    // ── Refresh Access Token ─────────────────────────────────────────────────
    // V-03 / V-04: Client now explicitly sends the refresh token here.
    // The server hashes it and validates against the stored hash — no more
    // trusting unverified payloads from expired access tokens.
    case 'refresh':
        if (empty($body['refresh_token'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'refresh_token is required.']);
            break;
        }
        echo json_encode($controller->refresh($body['refresh_token']));
        break;

    // ── Logout ────────────────────────────────────────────────────────────────
    // V-05: Logout now requires the refresh_token so we can delete by hash,
    // not wipe all sessions for an email address.
    case 'logout':
        echo json_encode($controller->logout($body));
        break;

    // ── Forgot Password (Step 1) ──────────────────────────────────────────────
    case 'forgot-password':
        $result  = $authController->forgotPassword($body ?? []);
        $status  = $result['_status'] ?? 200;
        unset($result['_status']);
        http_response_code($status);
        echo json_encode($result);
        break;

    // ── Verify OTP (Step 2) ───────────────────────────────────────────────────
    case 'verify-otp':
        $result  = $authController->verifyOtp($body ?? []);
        $status  = $result['_status'] ?? 200;
        unset($result['_status']);
        http_response_code($status);
        echo json_encode($result);
        break;

    // ── Reset Password (Step 3) ───────────────────────────────────────────────
    case 'reset-password':
        $result  = $authController->resetPassword($body ?? []);
        $status  = $result['_status'] ?? 200;
        unset($result['_status']);
        http_response_code($status);
        echo json_encode($result);
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Route not found.']);
        break;
}