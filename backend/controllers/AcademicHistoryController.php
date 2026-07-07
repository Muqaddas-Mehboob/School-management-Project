<?php
require_once __DIR__.'/../services/AcademicHistoryService.php';
class AcademicHistoryController {
    private $s; public function __construct($db){ $this->s=new AcademicHistoryService($db); }
    public function student($id,$r,$uid){ if($r==='student'&&$id!==$uid) return $this->f(); return $this->s->getAll(['studentId'=>$id]); }
    public function me($uid){ return $this->s->getAll(['studentId'=>$uid]); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
