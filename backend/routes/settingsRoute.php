<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/SettingsController.php';
$c=new SettingsController($database);
$s=parseRouteSegments('settings'); $p1=$s[0]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ jsonResponse($c->get($userId)); }
elseif($m==='PUT'){ 
    if($p1==='password') jsonResponse($c->password($userId,getRequestBody()));
    if($p1==='profile-photo') jsonResponse($c->photo($userId,getRequestBody()));
    jsonResponse($c->update($userId,getRequestBody())); 
}
methodNotAllowed();
