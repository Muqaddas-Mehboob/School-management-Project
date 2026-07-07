<?php
require_once __DIR__.'/../models/GradeModel.php';
class GradeService {
    private $m; public function __construct($db){ $this->m=new GradeModel($db); }
    public function getAll($f=[]){ return ["success"=>true,"data"=>$this->m->findAll($f)]; }
    public function bulkSave($d,$uid){
        if(empty($d['grades'])) return ["success"=>false];
        foreach($d['grades'] as $g){ $g['teacherId']=$uid; $this->m->create($g); }
        return ["success"=>true,"message"=>"Saved"];
    }
}
