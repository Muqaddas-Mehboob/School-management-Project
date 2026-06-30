<?php

require_once __DIR__ . '/BaseModel.php';

class School extends BaseModel {
    public function __construct($database) {
        parent::__construct($database, 'schools');
    }
    
    public function findBySchoolCode($code) {
        return $this->collection->findOne(['schoolCode' => $code]);
    }
}
