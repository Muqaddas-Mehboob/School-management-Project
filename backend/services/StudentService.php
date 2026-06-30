<?php

require_once __DIR__ . '/../models/Student.model.php';
require_once __DIR__ . '/../models/User.model.php';

class StudentService {
    private $studentModel;
    private $userModel;

    public function __construct($database) {
        $this->studentModel = new Student($database);
        $this->userModel = new User($database);
    }

    public function getAllStudents($filters = [], $page = 1, $limit = 10) {
        $result = $this->studentModel->paginate($filters, $page, $limit);
        return ["success" => true, "data" => $result['data'], "meta" => $result['meta']];
    }

    public function getStudentById($id) {
        $student = $this->studentModel->findById($id);
        if ($student) {
            return ["success" => true, "data" => $student];
        }
        return ["success" => false, "message" => "Student not found"];
    }

    public function getStudentByUserId($userId) {
        $students = $this->studentModel->findAll(['userId' => $userId]);
        if (count($students) > 0) {
            return ["success" => true, "data" => $students[0]];
        }
        return ["success" => false, "message" => "Student profile not found"];
    }

    public function createStudent($data) {
        // Also create a User record for login if it doesn't exist? Or assume it's created separately.
        // The schema suggests student has a userId. If userId is provided, we just create the profile.
        
        // If email and password provided, create User first.
        if (isset($data['email']) && isset($data['password'])) {
            $existingUser = $this->userModel->findByEmail($data['email']);
            if ($existingUser) {
                return ["success" => false, "message" => "User with this email already exists"];
            }
            
            $userData = [
                'email' => $data['email'],
                'password' => password_hash($data['password'], PASSWORD_BCRYPT),
                'role' => 'student',
                'name' => $data['name'] ?? '',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            // Note: createUser in User.model.php returns a MongoDB\InsertOneResult
            $userResult = $this->userModel->createUser($userData);
            $data['userId'] = (string) $userResult->getInsertedId();
            
            unset($data['password']);
        }
        
        $id = $this->studentModel->create($data);
        return ["success" => true, "message" => "Student created successfully", "data" => ["id" => $id]];
    }

    public function updateStudent($id, $data) {
        $success = $this->studentModel->updateById($id, $data);
        if ($success) {
            return ["success" => true, "message" => "Student updated successfully"];
        }
        return ["success" => false, "message" => "Student not found or no changes made"];
    }

    public function deleteStudent($id) {
        $success = $this->studentModel->deleteById($id);
        if ($success) {
            return ["success" => true, "message" => "Student deleted successfully"];
        }
        return ["success" => false, "message" => "Student not found"];
    }
}
