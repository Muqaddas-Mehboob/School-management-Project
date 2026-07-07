<?php
require_once __DIR__.'/../services/AchievementService.php';
class AchievementController {
    private $s; public function __construct($db){ $this->s=new AchievementService($db); }
    public function student($id,$r,$uid){ if($r==='student'&&$id!==$uid) return $this->f(); return $this->s->getAll(['studentId'=>$id]); }
    public function create($d,$r,$uid){ if($r!=='teacher'&&$r!=='admin') return $this->f(); $d['awardedBy']=$uid; return $this->s->create($d); }
    public function update($id,$d,$r){ if($r!=='teacher'&&$r!=='admin') return $this->f(); return $this->s->update($id,$d); }
    public function destroy($id,$r){ if($r!=='teacher'&&$r!=='admin') return $this->f(); return $this->s->delete($id); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
