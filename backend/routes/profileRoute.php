<?php

/**
 * Profile Route — /api/profile/*
 *
 * All endpoints in this file require authentication.
 * auth_helper.php provides: $database, $userId, $userRole, $userEmail
 */
require_once __DIR__ . '/../helpers/auth_helper.php';
require_once __DIR__ . '/../helpers/route_helper.php';
require_once __DIR__ . '/../controllers/ProfileController.php';

$controller = new ProfileController($database);
$segments   = parseRouteSegments('profile'); // segments after /profile/
$action     = $segments[0] ?? '';
$method     = $_SERVER['REQUEST_METHOD'];

// POST /api/profile/upload-image
if ($method === 'POST' && $action === 'upload-image') {
    jsonResponse($controller->uploadImage($userId, $userRole));
}

methodNotAllowed();
