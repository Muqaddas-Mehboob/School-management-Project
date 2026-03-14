<?php
//  Use same naming convention as the other middlewares, e.g. auth.php -->

require_once './vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
require_once './models/RefreshToken.php';

class AuthMiddleware
{

    private $database;

    public function __construct($database)
    {
        $this->database = $database;

    }
    public function validateToken($token)
    {
        $publicKey = file_get_contents(__DIR__ . '/../keys/public_key_pem');
        try {
            $decoded = JWT::decode($token, new Key($publicKey, algorithm: 'RS256'));
            if ($decoded->sub == 'EduPortal') {
                return ([
                    "success" => true,
                    "expired" => false,
                    "message" => "Token validated"
                ]);
            } else {
                return ([
                    "success" => false,
                    "expired" => false,
                    "message" => "Invalid token"
                ]);
            }
            ;
        } catch (ExpiredException $e) {
            if ($e->getMessage() == "Expired token") {
                return $this->refreshToken();
            }
        } catch (\Throwable $th) {
            var_dump($th->getMessage());
            exit;

        }
    }
    public function refreshToken()
    {
        $refreshcollection = $this->database->refreshTokens;
        $user_reshtoken = $refreshcollection->findOne(["email" => "test@test.com"]);
        if ($this->timeinfuture($user_reshtoken['expires_at'])) {
            $newtoken = $this->generatetoken(60   * 30, $user_reshtoken['email']);
            return ([
                        "success" => true,
                        "expired" => true,
                        "message" => "Token refreshed",
                        "token" => $newtoken
                    ]);
        } else {
            var_dump(strtotime($user_reshtoken['expires_at']) >= time());
            exit;
        }
    }

    public function timeinfuture($time)
    {
        return $time >= time();
    }
    public function generatetoken($seconds, $email)
    {
        $privateKey = file_get_contents(__DIR__ . '/../keys/private_key_pem');
        $payload = [
            'iss' => 'localhost',
            'iat' => time(),
            'exp' => time() + $seconds,
            'email' => $email,
            'sub' => 'EduPortal'
        ];
        return JWT::encode($payload, $privateKey, 'RS256');

    }
}