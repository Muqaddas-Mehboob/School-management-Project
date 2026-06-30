<?php

require_once __DIR__ . '/../services/StudentService.php';
require_once __DIR__ . '/../validators/Validator.php';

class StudentController {
    private $studentService;

    public function __construct($database) {
        $this->studentService = new StudentService($database);
    }

    public function index($queryParams, $userRole) {
        if ($userRole !== 'admin' && $userRole !== 'teacher') {
            return $this->forbidden();
        }

        $page = isset($queryParams['page']) ? (int)$queryParams['page'] : 1;
        $limit = isset($queryParams['limit']) ? (int)$queryParams['limit'] : 10;
        
        $filters = [];
        if (isset($queryParams['classId'])) {
            $filters['classId'] = $queryParams['classId'];
        }
        if (isset($queryParams['search'])) {
            $filters['name'] = ['$regex' => $queryParams['search'], '$options' => 'i'];
        }

        return $this->studentService->getAllStudents($filters, $page, $limit);
    }

    public function show($id, $userId, $userRole) {
        if ($userRole === 'student') {
            // A student can only view their own profile, which logic handles below
        }
        return $this->studentService->getStudentById($id);
    }

    public function showMe($userId) {
        return $this->studentService->getStudentByUserId($userId);
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

        return $this->studentService->createStudent($data);
    }

    public function update($id, $data, $userRole) {
        if ($userRole !== 'admin' && $userRole !== 'teacher') {
            return $this->forbidden();
        }

        return $this->studentService->updateStudent($id, $data);
    }

    public function updateMe($userId, $data) {
        $studentRes = $this->studentService->getStudentByUserId($userId);
        if (!$studentRes['success']) {
            return $studentRes;
        }
        $studentId = (string) $studentRes['data']['_id'];
        return $this->studentService->updateStudent($studentId, $data);
    }

    public function destroy($id, $userRole) {
        if ($userRole !== 'admin') {
            return $this->forbidden();
        }
        return $this->studentService->deleteStudent($id);
    }

    private function forbidden() {
        http_response_code(403);
        return ["success" => false, "message" => "Forbidden: Insufficient permissions."];
    }
}
