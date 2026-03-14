<?php
// <!-- Use same naming convention as the other models, e.g. user.model.php -->

class User {

    private $collection;

    public function __construct($database)
    {
        $this->collection = $database->users;
        // echo $this->collection;
    }

    public function createUser($data)
    {   var_dump($data);
        return $this->collection->insertOne($data);
    }

    public function findByEmail($email)
    {
        return $this->collection->findOne(["email"=>$email]);
    }
}