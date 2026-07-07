<?php
require_once __DIR__.'/../models/NotificationModel.php';
class NotificationService {
    private $m; public function __construct($db){ $this->m=new NotificationModel($db); }
    public function getAll($f=[]){ return ["success"=>true,"data"=>$this->m->findAll($f)]; }
    public function read($id){ $this->m->updateById($id,['read'=>true]); return ["success"=>true]; }
    public function readAll($uid){ $this->m->updateAll(['recipientId'=>$uid],['$set'=>['read'=>true]]); return ["success"=>true]; }
    public function delete($id){ $this->m->deleteById($id); return ["success"=>true]; }
    public function create($d){ return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; }
}
