<?php

require_once __DIR__ . '/../controllers/SchoolController.php';
require_once __DIR__ . '/../middlewares/authmiddleware.php';
require_once __DIR__ . '/../models/User.model.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$database = require __DIR__ . '/../config/db.php';
$schoolController = new SchoolController($database);
$authMiddleware = new AuthMiddleware($database);
$userModel = new User($database);

$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : null);

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$parts = explode(" ", $authHeader);
$token = end($parts);

$authResult = $authMiddleware->validateToken($token);

if (!$authResult || !isset($authResult['success']) || !$authResult['success']) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid or expired token"]);
    exit;
}

// Extract user info from token to get the role
$publicKey = file_get_contents(__DIR__ . '/../keys/public_key_pem');
try {
    $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
    $email = $decoded->email;
    $user = $userModel->findByEmail($email);
    if (!$user) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "User not found"]);
        exit;
    }
    $userRole = isset($user['role']) ? $user['role'] : null;
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Failed to extract user info from token"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode($schoolController->getSchool());
} elseif ($method === 'PUT') {
    $body = json_decode(file_get_contents("php://input"), true);
    echo json_encode($schoolController->updateSchool($body, $userRole));
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
}
