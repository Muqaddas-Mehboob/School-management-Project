<?php

class RefreshToken {
    private $collection;

    public function __construct($database) {
        $this->collection = $database->refreshTokens;
    }

    public function storeRefreshToken($token, $email) {
        return $this->collection->insertOne([
            'token' => $token,
            'email' => $email,
            'created_at' => time(),
            'expires_at' => time() + 60*60*24*7
        ]);
    }
    public function deleteRefreshToken($email) {
        return $this->collection->deleteOne(['email' => $email]);
    }
}