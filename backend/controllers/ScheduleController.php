<?php
require_once __DIR__.'/../services/ScheduleService.php';
class ScheduleController {
    private $s;
    public function __construct($db){ $this->s=new ScheduleService($db); }
    public function index($q,$r,$uid){
        if($r!=='teacher') return $this->f();
        $f=['teacherId'=>$uid];
        return $this->s->getAll($f);
    }
    public function create($d,$r,$uid){
        if($r!=='teacher') return $this->f();
        $d['teacherId']=$uid;
        
        return $this->s->create($d);
    }
    public function destroy($id,$r){ if($r!=='teacher') return $this->f(); return $this->s->delete($id); }
    public function classTimetable($id,$r){ return $this->s->getAll(['classId'=>$id]); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
