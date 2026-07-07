<?php
require_once __DIR__.'/BaseModel.php';
class ResourceModel extends BaseModel {
    public function __construct($db){ parent::__construct($db,'resources'); }
}
