<?php
require_once __DIR__.'/../services/ResultService.php';
class ResultController {
    private $s; public function __construct($db){ $this->s=new ResultService($db); }
    public function index($r){ if($r!=='teacher') return $this->f(); return $this->s->getAll(); }
    public function student($id,$r,$uid){ if($r==='student'&&$id!==$uid) return $this->f(); return $this->s->getAll(['studentId'=>$id]); }
    public function create($d,$r){ if($r!=='teacher') return $this->f(); return $this->s->create($d); }
    public function update($id,$d,$r){ if($r!=='teacher') return $this->f(); return $this->s->update($id,$d); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
