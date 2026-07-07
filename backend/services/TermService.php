<?php
require_once __DIR__.'/../models/TermModel.php';
class TermService {
    private $m;
    public function __construct($db){ $this->m=new TermModel($db); }
    public function getAll($f=[],$p=1,$l=10){ $r=$this->m->paginate($f,$p,$l); return ["success"=>true,"data"=>$r['data'],"meta"=>$r['meta']]; }
    public function getById($id){ $r=$this->m->findById($id); return $r?["success"=>true,"data"=>$r]:["success"=>false,"message"=>"Not found"]; }
    public function getCurrent(){ $r=$this->m->findAll(['isCurrent'=>true]); return count($r)?["success"=>true,"data"=>$r[0]]:["success"=>false,"message"=>"No current term"]; }
    public function create($d){ return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; }
    public function update($id,$d){ $s=$this->m->updateById($id,$d); return ["success"=>$s,"message"=>$s?"Updated":"Not found"]; }
}
