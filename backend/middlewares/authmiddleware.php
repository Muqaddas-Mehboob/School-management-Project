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
                    "decoded" => $decoded,
                    "message" => "Token validated"
                ]);
            } else {
                return ([
                    "success" => false,
                    "expired" => false,
                    "message" => "Invalid token"
                ]);
            }
        } catch (ExpiredException $e) {
            if ($e->getMessage() == "Expired token") {
                // Extract email from the expired token payload manually
                $parts = explode('.', $token);
                if (count($parts) === 3) {
                    $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
                    if (isset($payload['email'])) {
                        return $this->refreshToken($payload['email']);
                    }
                }
                return ([
                    "success" => false,
                    "expired" => true,
                    "message" => "Expired token and failed to read payload"
                ]);
            }
        } catch (\Throwable $th) {
            return ([
                "success" => false,
                "message" => "Token validation error: " . $th->getMessage()
            ]);
        }
    }
    public function refreshToken($email)
    {
        $refreshcollection = $this->database->refreshTokens;
        // The field name in RefreshToken model might be expiresAt instead of expires_at, let's verify if needed. 
        // We'll use expiresAt as it is more standard for MongoDB, but let's check RefreshToken.php if possible. Wait, User.model uses 'created_at'. We'll use 'expires_at' if that's what was there.
        $user_reshtoken = $refreshcollection->findOne(["email" => $email]);

        if (!$user_reshtoken) {
            return ([
                "success" => false,
                "message" => "Refresh token not found"
            ]);
        }

        if ($this->timeinfuture($user_reshtoken['expires_at'] ?? $user_reshtoken['expiresAt'] ?? 0)) {
            $newtoken = $this->generatetoken(60 * 30, $email);
            $publicKey = file_get_contents(__DIR__ . '/../keys/public_key_pem');
            $decoded = JWT::decode($newtoken, new Key($publicKey, 'RS256'));
            
            return ([
                "success" => true,
                "expired" => true, // Indicates the original token was expired, but we refreshed it
                "decoded" => $decoded,
                "message" => "Token refreshed",
                "token" => $newtoken
            ]);
        } else {
            return ([
                "success" => false,
                "message" => "Refresh token is expired or invalid. Please login again."
            ]);
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