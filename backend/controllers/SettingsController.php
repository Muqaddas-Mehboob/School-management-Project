<?php
require_once __DIR__.'/../services/SettingsService.php';
class SettingsController {
    private $s; public function __construct($db){ $this->s=new SettingsService($db); }
    public function get($uid){ return $this->s->get($uid); }
    public function update($uid,$d){ return $this->s->update($uid,$d); }
    public function password($uid,$d){ return $this->s->changePassword($uid,$d['old']??'',$d['new']??''); }
    public function photo($uid,$d){ return $this->s->updatePhoto($uid,$d['url']??''); }
}
