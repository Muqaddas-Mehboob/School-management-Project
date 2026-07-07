<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/NotificationController.php';
$c=new NotificationController($database);
$s=parseRouteSegments('notifications'); $p1=$s[0]??null; $p2=$s[1]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ jsonResponse($c->index($_GET,$userId)); }
elseif($m==='PUT'){ 
    if($p1==='read-all') jsonResponse($c->readAll($userId));
    elseif($p1&&$p2==='read') jsonResponse($c->read($p1));
}
elseif($m==='DELETE'&&$p1){ jsonResponse($c->destroy($p1)); }
elseif($m==='POST'){ jsonResponse($c->create(getRequestBody(),$userRole)); }
methodNotAllowed();
