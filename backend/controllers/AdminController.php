<?php
require_once __DIR__.'/../services/AdminService.php';
class AdminController {
    private $s; public function __construct($db){ $this->s=new AdminService($db); }
    private function c($r){ if($r!=='admin') { http_response_code(403); echo json_encode(["success"=>false]); exit; } }
    public function stats($r){ $this->c($r); return $this->s->stats(); }
    public function activity($r){ $this->c($r); return $this->s->recentActivity(); }
    public function create($d,$r){ $this->c($r); return $this->s->createUser($d); }
    public function destroy($id,$r){ $this->c($r); return $this->s->deleteUser($id); }
}
