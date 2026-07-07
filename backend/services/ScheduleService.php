<?php
require_once __DIR__.'/../models/ScheduleEventModel.php';
class ScheduleService {
    private $m;
    public function __construct($db){ $this->m=new ScheduleEventModel($db); }
    public function getAll($f=[]){ return ["success"=>true,"data"=>$this->m->findAll($f)]; }
    public function create($d){ return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; }
    public function delete($id){ $s=$this->m->deleteById($id); return ["success"=>$s,"message"=>$s?"Deleted":"Not found"]; }
}
