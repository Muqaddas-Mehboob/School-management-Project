<?php
require_once __DIR__.'/../models/SubjectModel.php';
require_once __DIR__.'/../models/ClassModel.php';
require_once __DIR__.'/../models/Teacher.model.php';
class SubjectService {
    private $m,$c,$t;
    public function __construct($db){ $this->m=new SubjectModel($db); $this->c=new ClassModel($db); $this->t=new Teacher($db); }
    public function getAll($f=[],$p=1,$l=10){ $r=$this->m->paginate($f,$p,$l); return ["success"=>true,"data"=>$r['data'],"meta"=>$r['meta']]; }
    public function getById($id){ $r=$this->m->findById($id); return $r?["success"=>true,"data"=>$r]:["success"=>false,"message"=>"Not found"]; }
    public function create($d){ 
        if(!$this->c->findById($d['classId']??'')) return ["success"=>false,"message"=>"Invalid classId"];
        if(!$this->t->findById($d['teacherId']??'')) return ["success"=>false,"message"=>"Invalid teacherId"];
        return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; 
    }
    public function update($id,$d){ $s=$this->m->updateById($id,$d); return ["success"=>$s,"message"=>$s?"Updated":"Not found"]; }
    public function delete($id){ $s=$this->m->deleteById($id); return ["success"=>$s,"message"=>$s?"Deleted":"Not found"]; }
}
