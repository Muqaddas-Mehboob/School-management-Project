<?php
require_once __DIR__.'/BaseModel.php';
class TermModel extends BaseModel {
    public function __construct($db){ parent::__construct($db,'terms'); }
}
