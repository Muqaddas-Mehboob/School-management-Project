<?php

require_once __DIR__ . '/../models/User.model.php';

class UserService {
    private $userModel;

    public function __construct($database) {
        $this->userModel = new User($database);
    }

    public function getAllUsers($filters = [], $page = 1, $limit = 10) {
        $result = $this->userModel->paginate($filters, $page, $limit);
        
        // Remove passwords from response
        foreach ($result['data'] as &$user) {
            unset($user['password']);
        }
        
        return ["success" => true, "data" => $result['data'], "meta" => $result['meta']];
    }

    public function getUserById($id) {
        $user = $this->userModel->findById($id);
        if ($user) {
            unset($user['password']);
            return ["success" => true, "data" => $user];
        }
        return ["success" => false, "message" => "User not found"];
    }

    public function updateUser($id, $data) {
        // Prevent password update through this generic endpoint for security
        if (isset($data['password'])) {
            unset($data['password']);
        }
        
        $success = $this->userModel->updateById($id, $data);
        if ($success) {
            return ["success" => true, "message" => "User updated successfully"];
        }
        return ["success" => false, "message" => "User not found or no changes made"];
    }

    public function deleteUser($id) {
        $success = $this->userModel->deleteById($id);
        if ($success) {
            return ["success" => true, "message" => "User deleted successfully"];
        }
        return ["success" => false, "message" => "User not found"];
    }
}
