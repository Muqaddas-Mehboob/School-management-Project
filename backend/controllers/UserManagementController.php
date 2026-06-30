<?php

require_once __DIR__ . '/../services/UserService.php';
require_once __DIR__ . '/../validators/Validator.php';

class UserManagementController {
    private $userService;

    public function __construct($database) {
        $this->userService = new UserService($database);
    }

    public function index($queryParams, $userRole) {
        if ($userRole !== 'admin') {
            return $this->forbidden();
        }
        $page = isset($queryParams['page']) ? (int)$queryParams['page'] : 1;
        $limit = isset($queryParams['limit']) ? (int)$queryParams['limit'] : 10;
        
        // Optional filtering by role
        $filters = [];
        if (isset($queryParams['role'])) {
            $filters['role'] = $queryParams['role'];
        }

        return $this->userService->getAllUsers($filters, $page, $limit);
    }

    public function show($id, $userId, $userRole) {
        // Admin or Self can view
        if ($userRole !== 'Admin' && $userId !== $id) {
            return $this->forbidden();
        }
        return $this->userService->getUserById($id);
    }

    public function update($id, $data, $userId, $userRole) {
        // Admin or Self can update
        if ($userRole !== 'Admin' && $userId !== $id) {
            return $this->forbidden();
        }

        $rules = [
            'email' => 'email',
            // Do not allow changing role unless Admin
        ];

        if (isset($data['role']) && $userRole !== 'Admin') {
            unset($data['role']); // Only admin can change role
        }

        $validation = Validator::validate($data, $rules);
        if (!$validation['success']) {
            http_response_code(422);
            return ["success" => false, "message" => "Validation failed", "errors" => $validation['errors']];
        }

        return $this->userService->updateUser($id, $data);
    }

    public function destroy($id, $userRole) {
        if ($userRole !== 'Admin') {
            return $this->forbidden();
        }
        return $this->userService->deleteUser($id);
    }

    private function forbidden() {
        http_response_code(403);
        return ["success" => false, "message" => "Forbidden: Insufficient permissions."];
    }
}
