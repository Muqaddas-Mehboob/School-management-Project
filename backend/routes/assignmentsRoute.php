<?php

/**
 * Assignments Route — /api/assignments/*
 *
 * All endpoints require authentication.
 * auth_helper.php provides: $database, $userId, $userRole, $userEmail
 */
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AssignmentController.php';

$c = new AssignmentController($database);
$s = parseRouteSegments('assignments'); // segments after /assignments/
$id  = $s[0] ?? null;
$sub = $s[1] ?? null;
$m   = $_SERVER['REQUEST_METHOD'];

// POST /api/assignments/upload  — multipart file upload (teacher only)
if ($m === 'POST' && $id === 'upload') {
    jsonResponse($c->uploadAssignment($userRole, $userId));
}

// GET /api/assignments/download/{assignmentId}  — authenticated download
if ($m === 'GET' && $id === 'download' && !empty($sub)) {
    jsonResponse($c->download($sub, $userRole, $userId));
}

// GET /api/assignments/{id}/submissions
if ($m === 'GET' && $sub === 'submissions') {
    jsonResponse($c->getSubmissions($id, $userRole));
}

// GET /api/assignments  or  GET /api/assignments/{id}
if ($m === 'GET') {
    jsonResponse($id ? $c->show($id) : $c->index($_GET));
}

// POST /api/assignments  — plain create (JSON body, no file)
if ($m === 'POST') {
    if ($sub === 'submit') {
        jsonResponse($c->submit($id, getRequestBody(), $userRole, $userId));
    }
    jsonResponse($c->create(getRequestBody(), $userRole));
}

// PUT /api/assignments/{id}
if ($m === 'PUT') {
    jsonResponse($id ? $c->update($id, getRequestBody(), $userRole) : badRequest());
}

// DELETE /api/assignments/{id}
if ($m === 'DELETE') {
    jsonResponse($id ? $c->destroy($id, $userRole) : badRequest());
}

methodNotAllowed();
