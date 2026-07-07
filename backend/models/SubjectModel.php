<?php
require_once __DIR__.'/BaseModel.php';
class SubjectModel extends BaseModel {
    public function __construct($db){ parent::__construct($db,'subjects'); }
}
