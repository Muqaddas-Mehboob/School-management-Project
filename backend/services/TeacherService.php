<?php

require_once __DIR__ . '/../models/Teacher.model.php';
require_once __DIR__ . '/../models/User.model.php';

class TeacherService {
    private $teacherModel;
    private $userModel;

    public function __construct($database) {
        $this->teacherModel = new Teacher($database);
        $this->userModel = new User($database);
    }

    public function getAllTeachers($filters = [], $page = 1, $limit = 10) {
        $result = $this->teacherModel->paginate($filters, $page, $limit);
        return ["success" => true, "data" => $result['data'], "meta" => $result['meta']];
    }

    public function getTeacherById($id) {
        $teacher = $this->teacherModel->findById($id);
        if ($teacher) {
            return ["success" => true, "data" => $teacher];
        }
        return ["success" => false, "message" => "Teacher not found"];
    }

    public function getTeacherByUserId($userId) {
        $teachers = $this->teacherModel->findAll(['userId' => $userId]);
        if (count($teachers) > 0) {
            return ["success" => true, "data" => $teachers[0]];
        }
        return ["success" => false, "message" => "Teacher profile not found"];
    }

    public function createTeacher($data) {
        if (isset($data['email']) && isset($data['password'])) {
            $existingUser = $this->userModel->findByEmail($data['email']);
            if ($existingUser) {
                return ["success" => false, "message" => "User with this email already exists"];
            }
            
            $userData = [
                'email' => $data['email'],
                'password' => password_hash($data['password'], PASSWORD_BCRYPT),
                'role' => 'Teacher',
                'name' => $data['name'] ?? '',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            $userResult = $this->userModel->createUser($userData);
            $data['userId'] = (string) $userResult->getInsertedId();
            
            unset($data['password']);
        }
        
        $id = $this->teacherModel->create($data);
        return ["success" => true, "message" => "Teacher created successfully", "data" => ["id" => $id]];
    }

    public function updateTeacher($id, $data) {
        $success = $this->teacherModel->updateById($id, $data);
        if ($success) {
            return ["success" => true, "message" => "Teacher updated successfully"];
        }
        return ["success" => false, "message" => "Teacher not found or no changes made"];
    }

    public function deleteTeacher($id) {
        $success = $this->teacherModel->deleteById($id);
        if ($success) {
            return ["success" => true, "message" => "Teacher deleted successfully"];
        }
        return ["success" => false, "message" => "Teacher not found"];
    }
}
