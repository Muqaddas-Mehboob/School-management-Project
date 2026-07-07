<?php
require_once __DIR__.'/../services/ProgressReportService.php';
class ProgressReportController {
    private $s; public function __construct($db){ $this->s=new ProgressReportService($db); }
    public function student($id,$q,$r,$uid){ if($r==='student'&&$id!==$uid) return $this->f(); return $this->s->getAll(['studentId'=>$id,'termId'=>$q['term']??null]); }
    public function classRep($id,$q,$r){ if($r!=='teacher') return $this->f(); return $this->s->getAll(['classId'=>$id,'termId'=>$q['term']??null]); }
    public function comment($id,$d,$r){ if($r!=='teacher') return $this->f(); return $this->s->addComment($id,$d); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
