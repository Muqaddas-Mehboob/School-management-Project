<?php
require_once __DIR__.'/../services/GradeService.php';
class GradeController {
    private $s; public function __construct($db){ $this->s=new GradeService($db); }
    public function index($q,$r){ if($r!=='teacher') return $this->f(); return $this->s->getAll(['classId'=>$q['classId']??null]); }
    public function bulk($d,$r,$uid){ if($r!=='teacher') return $this->f(); return $this->s->bulkSave($d,$uid); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
