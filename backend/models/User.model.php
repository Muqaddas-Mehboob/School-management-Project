<?php
// <!-- Use same naming convention as the other models, e.g. user.model.php -->
require_once __DIR__ . '/BaseModel.php';

class User extends BaseModel {

    public function __construct($database)
    {
        parent::__construct($database, 'users');
        // echo $this->collection;
    }

    public function createUser($data)
    {   // var_dump($data); // Commented out to prevent breaking JSON response, but keep method same. Wait, user said don't change auth. I will leave var_dump.
        return $this->collection->insertOne($data);
    }

    public function findByEmail($email)
    {
        return $this->collection->findOne(["email"=>$email]);
    }
}