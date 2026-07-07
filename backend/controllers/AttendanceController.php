<?php
require_once __DIR__.'/../services/AttendanceService.php';
class AttendanceController {
    private $s;
    public function __construct($db){ $this->s=new AttendanceService($db); }
    public function index($q,$r){
        if($r!=='teacher') return $this->f();
        $f=[]; if(!empty($q['classId'])) $f['classId']=$q['classId'];
        if(!empty($q['date'])) $f['date']=$q['date'];
        return $this->s->getAll($f,$q['page']??1,$q['limit']??100);
    }
    public function bulkSave($d,$r,$uid){ if($r!=='teacher') return $this->f(); return $this->s->saveBulk($d,$uid); }
    public function history($id,$r,$uid){
        if($r==='student' && $id!==$uid) return $this->f();
        return $this->s->getAll(['studentId'=>$id]);
    }
    public function stats($id,$r,$uid){
        if($r==='student' && $id!==$uid) return $this->f();
        return $this->s->getStudentStats($id);
    }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
