<?php
require_once __DIR__.'/../models/AttendanceModel.php';
class AttendanceService {
    private $m;
    public function __construct($db){ $this->m=new AttendanceModel($db); }
    public function getAll($f=[],$p=1,$l=10){ $r=$this->m->paginate($f,$p,$l); return ["success"=>true,"data"=>$r['data'],"meta"=>$r['meta']]; }
    public function saveBulk($d,$tid){
        $cls=$d['classId']??null; $dt=$d['date']??date('Y-m-d');
        if(!$cls||empty($d['records'])) return ["success"=>false,"message"=>"Missing data"];
        foreach($d['records'] as $r){
            $r['classId']=$cls; $r['date']=$dt; $r['teacherId']=$tid; $r['recordedAt']=date('c');
            $this->m->create($r);
        }
        return ["success"=>true,"message"=>"Saved"];
    }
    public function getStudentStats($id){
        $all=$this->m->findAll(['studentId'=>$id]);
        $p=0; $a=0; $l=0;
        foreach($all as $x){ if($x['status']==='present') $p++; elseif($x['status']==='absent') $a++; else $l++; }
        $t=$p+$a+$l; $pct=$t?round(($p+$l)/$t*100,2):0;
        return ["success"=>true,"data"=>['present'=>$p,'absent'=>$a,'late'=>$l,'percentage'=>$pct]];
    }
}
