<?php
require_once __DIR__.'/../services/AssignmentService.php';
class AssignmentController {
    private $s;
    public function __construct($db){ $this->s=new AssignmentService($db); }
    public function index($q){ 
        $f=[]; if(!empty($q['teacherId'])) $f['teacherId']=$q['teacherId'];
        if(!empty($q['status'])) $f['status']=$q['status'];
        return $this->s->getAll($f,$q['page']??1,$q['limit']??10); 
    }
    public function show($id){ return $this->s->getById($id); }
    public function create($d,$r){ if($r!=='teacher') return $this->f(); return $this->s->create($d); }
    public function update($id,$d,$r){ if($r!=='teacher') return $this->f(); return $this->s->update($id,$d); }
    public function destroy($id,$r){ if($r!=='teacher') return $this->f(); return $this->s->delete($id); }
    public function submit($id,$d,$r,$uid){ if($r!=='student') return $this->f(); return $this->s->submit($id,$uid,$d); }
    public function getSubmissions($id,$r){ if($r!=='teacher') return $this->f(); return $this->s->getSubmissions($id); }
    public function grade($id,$d,$r){ if($r!=='teacher') return $this->f(); return $this->s->gradeSubmission($id,$d); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
