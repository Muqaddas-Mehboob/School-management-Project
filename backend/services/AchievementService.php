<?php
require_once __DIR__.'/../models/AchievementModel.php';
class AchievementService {
    private $m; public function __construct($db){ $this->m=new AchievementModel($db); }
    public function getAll($f=[]){ return ["success"=>true,"data"=>$this->m->findAll($f)]; }
    public function create($d){ return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; }
    public function update($id,$d){ $s=$this->m->updateById($id,$d); return ["success"=>$s]; }
    public function delete($id){ $s=$this->m->deleteById($id); return ["success"=>$s]; }
}
