<?php

require_once __DIR__ . '/BaseModel.php';

class Teacher extends BaseModel {
    public function __construct($database) {
        parent::__construct($database, 'teachers');
    }
}
