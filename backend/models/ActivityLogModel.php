<?php
require_once __DIR__.'/BaseModel.php';
class ActivityLogModel extends BaseModel { public function __construct($db){ parent::__construct($db,'activity_log'); } }
