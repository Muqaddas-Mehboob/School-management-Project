<?php

require_once __DIR__ . '/../services/TeacherService.php';
require_once __DIR__ . '/../validators/Validator.php';

class TeacherController {
    private $teacherService;

    public function __construct($database) {
        $this->teacherService = new TeacherService($database);
    }

    public function index($queryParams, $userRole) {
        if ($userRole !== 'admin') {
            return $this->forbidden();
        }

        $page = isset($queryParams['page']) ? (int)$queryParams['page'] : 1;
        $limit = isset($queryParams['limit']) ? (int)$queryParams['limit'] : 10;
        
        $filters = [];
        if (isset($queryParams['search'])) {
            $filters['name'] = ['$regex' => $queryParams['search'], '$options' => 'i'];
        }

        return $this->teacherService->getAllTeachers($filters, $page, $limit);
    }

    public function show($id, $userId, $userRole) {
        return $this->teacherService->getTeacherById($id);
    }

    public function showMe($userId) {
        return $this->teacherService->getTeacherByUserId($userId);
    }

    public function create($data, $userRole) {
        if ($userRole !== 'admin') {
            return $this->forbidden();
        }

        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ];

        $validation = Validator::validate($data, $rules);
        if (!$validation['success']) {
            http_response_code(422);
            return ["success" => false, "message" => "Validation failed", "errors" => $validation['errors']];
        }

        return $this->teacherService->createTeacher($data);
    }

    public function update($id, $data, $userId, $userRole) {
        // Only admin or the Teacher themselves can update
        $teacherRes = $this->teacherService->getTeacherById($id);
        if ($teacherRes['success']) {
            $teacherUserId = $teacherRes['data']['userId'] ?? null;
            if ($userRole !== 'admin' && $userId !== $teacherUserId) {
                return $this->forbidden();
            }
        } else {
            return $teacherRes;
        }

        return $this->teacherService->updateTeacher($id, $data);
    }

    public function destroy($id, $userRole) {
        if ($userRole !== 'admin') {
            return $this->forbidden();
        }
        return $this->teacherService->deleteTeacher($id);
    }

    private function forbidden() {
        http_response_code(403);
        return ["success" => false, "message" => "Forbidden: Insufficient permissions."];
    }
}
