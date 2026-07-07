<?php
require_once __DIR__.'/../models/ProgressReportModel.php';
class ProgressReportService {
    private $m; public function __construct($db){ $this->m=new ProgressReportModel($db); }
    public function getAll($f=[]){ return ["success"=>true,"data"=>$this->m->findAll($f)]; }
    public function addComment($id,$d){ $s=$this->m->updateById($id,['teacherComment'=>$d['comment']??'']); return ["success"=>$s]; }
}
