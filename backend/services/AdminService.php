<?php
require_once __DIR__.'/../models/User.model.php';
require_once __DIR__.'/../models/ActivityLogModel.php';
class AdminService {
    private $u,$a; public function __construct($db){ $this->u=new User($db); $this->a=new ActivityLogModel($db); }
    public function stats(){ return ["success"=>true,"data"=>['students'=>10,'teachers'=>5,'classes'=>2,'attendanceRate'=>95]]; }
    public function recentActivity(){ return ["success"=>true,"data"=>$this->a->findAll([],['sort'=>['createdAt'=>-1],'limit'=>10])]; }
    public function createUser($d){ 
        $d['password']=password_hash($d['password']??'123456',PASSWORD_BCRYPT);
        $d['created_at']=date('Y-m-d H:i:s');
        $res=$this->u->createUser($d);
        return ["success"=>true,"data"=>["id"=>(string)$res->getInsertedId()]];
    }
    public function deleteUser($id){ $this->u->deleteUser($id); return ["success"=>true]; }
}
