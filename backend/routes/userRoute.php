<?php
// Use same naming convention as the other routes, e.g. userRoute.php 

require_once './controllers/UserController.php';
require_once './models/RefreshToken.php';
require_once './services/auth.php';
require_once './middlewares/authmiddleware.php';


$database = require './config/db.php';

$controller = new UserController($database);
$refrestToken = new RefreshToken($database);
$auth = new AuthService($database);
$AuthMiddleware = new AuthMiddleware($database);

$body = json_decode(file_get_contents("php://input"), true);
// var_dump(end(explode("/", $_SERVER['REQUEST_URI'])));
if ($_SERVER['REQUEST_METHOD'] === "POST") {

    switch ($route) {


        case "register":
            // error_log(json_encode($body));
            // var_dump($body);
            $token = $AuthMiddleware->generatetoken(60 * 60 * 24 * 30, $body);
            echo json_encode($controller->register($body));
            break;

        case "login":
            echo (json_encode($controller->login($body)));
            break;
        case "verify":
            // $token = $auth->generatetoken(60 * 60 * 24 * 30, $body['email']);
            // $refrestToken->storeRefreshToken($token, $body['email']);
            try {
                $headers = getallheaders();
                if (isset($headers['Authorization'])) {
                    $parts = explode(" ", $headers['Authorization']); // store the array
                    $token = end($parts);
                    sleep(6);

                    echo (json_encode($controller->verify($token)));
                }
            } catch (\Throwable $th) {
                var_dump($th->getMessage());
                exit;
            }

            break;
        case "logout":
            // echo json_encode("logout");
            $controller->logout($body);
            echo (json_encode(["success"=> true, "message"=> "User logged out"]));
            break;
            // json_encode($controller->logout($body));
        default:
            echo json_encode(["error" => "Route not found"]);
    }

}