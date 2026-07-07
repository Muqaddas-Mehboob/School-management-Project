<?php
require_once __DIR__.'/../models/AssignmentModel.php';
require_once __DIR__.'/../models/AssignmentSubmissionModel.php';
class AssignmentService {
    private $m,$sm;
    public function __construct($db){ $this->m=new AssignmentModel($db); $this->sm=new AssignmentSubmissionModel($db); }
    public function getAll($f=[],$p=1,$l=10){ $r=$this->m->paginate($f,$p,$l); return ["success"=>true,"data"=>$r['data'],"meta"=>$r['meta']]; }
    public function getById($id){ $r=$this->m->findById($id); return $r?["success"=>true,"data"=>$r]:["success"=>false,"message"=>"Not found"]; }
    public function create($d){ return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; }
    public function update($id,$d){ $s=$this->m->updateById($id,$d); return ["success"=>$s,"message"=>$s?"Updated":"Not found"]; }
    public function delete($id){ $s=$this->m->deleteById($id); return ["success"=>$s,"message"=>$s?"Deleted":"Not found"]; }
    public function submit($id,$sid,$d){
        $d['assignmentId']=$id; $d['studentId']=$sid; $d['status']='submitted';
        return ["success"=>true,"data"=>["id"=>$this->sm->create($d)]];
    }
    public function getSubmissions($id){ return ["success"=>true,"data"=>$this->sm->findAll(['assignmentId'=>$id])]; }
    public function gradeSubmission($id,$d){
        $s=$this->sm->updateById($id,['grading'=>$d,'status'=>'graded']);
        return ["success"=>$s,"message"=>$s?"Graded":"Not found"];
    }
}
