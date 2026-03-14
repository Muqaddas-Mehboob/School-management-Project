<?php
// <!-- Use same naming convention as the other services, e.g. auth.php -->

require_once './models/User.model.php';
require_once './middlewares/authmiddleware.php';
require_once './models/RefreshToken.php';

class AuthService
{

    private $userModel;
    private $middleware;

    private $refrestToken;


    public function __construct($database)
    {
        $this->userModel = new User($database);
        $this->middleware = new AuthMiddleware($database);
        $this->refrestToken = new RefreshToken($database);
    }

    public function register($data)
    {

        $existing = $this->userModel->findByEmail($data['email']);

        if ($existing) {
            return ["success" => false, "message" => "User already exists"];
        }

        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);

        $data['created_at'] = date('Y-m-d H:i:s');

        $this->userModel->createUser($data);

        return ["success" => true, "message" => "User registered"];
    }



    public function login($data)
    {
        $user = $this->userModel->findByEmail($data['email']);

        if ($user) {

            if (password_verify($data['password'], $user['password'])) {

                $accesstoken = $this->middleware->generatetoken(10, $data['email']);
                $refreshtoken = $this->middleware->generatetoken(60 * 60 * 24 * 7, $data['email']);
                $this->refrestToken->storeRefreshToken($refreshtoken, $data['email']);


                return ["success" => true, "message" => "User logged in", "token" => $accesstoken];
            } else {
                return ["success" => false, "message" => "Invalid credentials"];
            }
        } else {
            return ["success" => false, "message" => "User not found"];
        }
    }
    public function verify($token)
    {
        // sleep(6);
        return $this->middleware->validateToken($token);
    }

    public function logout($data)
    {

        return $this->refrestToken->deleteRefreshToken($data['email']);
    }
}