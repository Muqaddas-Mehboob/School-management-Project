<?php
/**
 * Route Helper – Parses URI segments after the module name.
 * Call parseRouteSegments('moduleName') to get an array of URI parts after the module.
 * E.g. for /api/assignments/123/submissions => ['123', 'submissions']
 */
function parseRouteSegments($moduleName) {
    $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', rtrim($requestUri, '/'));
    
    // Find the module position
    $moduleIdx = array_search($moduleName, $parts);
    if ($moduleIdx === false) {
        return [];
    }
    
    // Return everything after the module name
    return array_slice($parts, $moduleIdx + 1);
}

function getRequestBody() {
    // var_dump(file_get_contents("php://input"));
    return json_decode(file_get_contents("php://input"), true);
}

function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

function forbidden() {
    jsonResponse(["success" => false, "message" => "Forbidden: Insufficient permissions."], 403);
}

function notFound($entity = 'Resource') {
    jsonResponse(["success" => false, "message" => "$entity not found."], 404);
}

function methodNotAllowed() {
    jsonResponse(["success" => false, "message" => "Method not allowed."], 405);
}

function badRequest($msg = 'Bad request') {
    jsonResponse(["success" => false, "message" => $msg], 400);
}

function validationError($errors) {
    jsonResponse(["success" => false, "message" => "Validation failed", "errors" => $errors], 422);
}
