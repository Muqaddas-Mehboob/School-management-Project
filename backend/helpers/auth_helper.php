<?php
/**
 * Auth Helper – extracts authenticated user info from JWT.
 * Include in any route file that requires authentication.
 * After requiring this file, the following variables are available:
 *   $database, $userId, $userRole, $userEmail, $authMiddleware
 */

require_once __DIR__ . '/../middlewares/authmiddleware.php';
require_once __DIR__ . '/../models/User.model.php';

$database = require __DIR__ . '/../config/db.php';
$authMiddleware = new AuthMiddleware($database);
$userModel = new User($database);

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$parts = explode(" ", $authHeader);
$token = end($parts);

$authResult = $authMiddleware->validateToken($token);
// var_dump($authResult);
if (!$authResult || !isset($authResult['success']) || !$authResult['success']) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid or expired token"]);
    exit;
}

$decoded = $authResult['decoded'];
$userEmail = $decoded->email;
$_authUser = $userModel->findByEmail($userEmail);

if (!$_authUser) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}

$userRole = strtolower($_authUser['role'] ?? '');
$userId = (string) $_authUser['_id'];
$schoolId = $_authUser['schoolId'] ?? null;
