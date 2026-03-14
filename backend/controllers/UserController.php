<?php
// <!-- Use same naming convention as the other controllers, e.g. UserController.php -->

require_once './services/auth.php';

class UserController {

    private $authService;

    public function __construct($database)
    {
        $this->authService = new AuthService($database);
    }

    public function register($data)
    {
        return $this->authService->register($data);
    }

    public function login($data)
    {
        return $this->authService->login($data);
    }
    public function verify($token)
    {
        return $this->authService->verify($token);
    
    }
    public function logout($data)
    {
        return $this->authService->logout($data);
    
}
}