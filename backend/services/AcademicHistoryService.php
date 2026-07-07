<?php
require_once __DIR__.'/../models/AcademicHistoryModel.php';
class AcademicHistoryService {
    private $m; public function __construct($db){ $this->m=new AcademicHistoryModel($db); }
    public function getAll($f=[]){ return ["success"=>true,"data"=>$this->m->findAll($f)]; }
}
