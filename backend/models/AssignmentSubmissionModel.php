<?php
require_once __DIR__.'/BaseModel.php';
class AssignmentSubmissionModel extends BaseModel {
    public function __construct($db){ parent::__construct($db,'assignment_submissions'); }
}
