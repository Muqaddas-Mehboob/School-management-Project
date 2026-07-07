<?php
require_once __DIR__.'/../models/User.model.php';
class SettingsService {
    private $u; public function __construct($db){ $this->u=new User($db); }
    public function update($id,$d){ $this->u->updateById($id,['settings'=>$d]); return ["success"=>true]; }
    public function get($uid){ $r=$this->u->findById($uid); return ["success"=>true,"data"=>$r['settings']??[]]; }
    public function changePassword($id,$old,$new){
        $user=$this->u->findById($id);
        if(!password_verify($old,$user['password'])) return ["success"=>false,"message"=>"Wrong old password"];
        $this->u->updateById($id,['password'=>password_hash($new,PASSWORD_BCRYPT)]); return ["success"=>true];
    }
    public function updatePhoto($id,$url){ $this->u->updateById($id,['profilePhoto'=>$url]); return ["success"=>true]; }
}
