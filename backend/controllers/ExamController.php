<?php
require_once __DIR__.'/../services/ExamService.php';
class ExamController {
    private $s; public function __construct($db){ $this->s=new ExamService($db); }
    public function index($q){ $f=[]; if(!empty($q['classId'])) $f['classId']=$q['classId']; return $this->s->getAll($f,$q['page']??1,$q['limit']??10); }
    public function upcoming(){ return $this->s->getAll(['status'=>'scheduled','date'=>['$gte'=>date('Y-m-d')]]); }
    public function show($id){ return $this->s->getById($id); }
    public function create($d,$r){ if($r!=='teacher') return $this->f(); return $this->s->create($d); }
    public function update($id,$d,$r){ if($r!=='teacher') return $this->f(); return $this->s->update($id,$d); }
    public function destroy($id,$r){ if($r!=='teacher') return $this->f(); return $this->s->delete($id); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
