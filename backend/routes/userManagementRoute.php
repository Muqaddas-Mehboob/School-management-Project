<?php

require_once __DIR__ . '/../controllers/UserManagementController.php';
require_once __DIR__ . '/../middlewares/authmiddleware.php';
require_once __DIR__ . '/../models/User.model.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$database = require __DIR__ . '/../config/db.php';
$userController = new UserManagementController($database);
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

// Extract user info from token to get the role and ID
$publicKey = file_get_contents(__DIR__ . '/../keys/public_key_pem');
try {
    $decoded = $authResult['decoded'];
    $email = $decoded->email;
    $user = $userModel->findByEmail($email);
    if (!$user) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "User not found"]);
        exit;
    }
    $userRole = isset($user['role']) ? $user['role'] : null;
    $userId = (string) $user['_id'];
}catch (Throwable $e) {
    var_dump($e->getMessage());
    exit;
} 
catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Failed to extract user info from token"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// Route parsing
// URI is something like /api/users or /api/users/12345
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriParts = explode('/', rtrim($requestUri, '/'));
$id = end($uriParts);
if ($id === 'users' || $id === 'api') {
    $id = null;
}

if ($method === 'GET') {
    if ($id) {
        echo json_encode($userController->show($id, $userId, $userRole));
    } else {
        echo json_encode($userController->index($_GET, $userRole));
    }
} elseif ($method === 'PUT') {
    if ($id) {
        $body = json_decode(file_get_contents("php://input"), true);
        echo json_encode($userController->update($id, $body, $userId, $userRole));
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "User ID required for update"]);
    }
} elseif ($method === 'DELETE') {
    if ($id) {
        echo json_encode($userController->destroy($id, $userRole));
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "User ID required for deletion"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
}
