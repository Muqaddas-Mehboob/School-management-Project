<?php
require_once __DIR__.'/../services/NotificationService.php';
class NotificationController {
    private $s; public function __construct($db){ $this->s=new NotificationService($db); }
    public function index($q,$uid){ $f=['recipientId'=>$uid]; if(isset($q['read'])&&$q['read']==='false') $f['read']=false; return $this->s->getAll($f); }
    public function read($id){ return $this->s->read($id); }
    public function readAll($uid){ return $this->s->readAll($uid); }
    public function destroy($id){ return $this->s->delete($id); }
    public function create($d,$r){ if($r!=='admin'&&$r!=='teacher') return $this->f(); return $this->s->create($d); }
    private function f(){ http_response_code(403); return ["success"=>false]; }
}
