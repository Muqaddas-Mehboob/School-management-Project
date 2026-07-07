<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AdminController.php';
$c=new AdminController($database);
$s=parseRouteSegments('admin'); $p1=$s[0]??null; $p2=$s[1]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ 
    if($p1==='stats') jsonResponse($c->stats($userRole));
    if($p1==='recent-activity') jsonResponse($c->activity($userRole));
}
elseif($m==='POST'&&$p1==='users'){ jsonResponse($c->create(getRequestBody(),$userRole)); }
elseif($m==='DELETE'&&$p1==='users'&&$p2){ jsonResponse($c->destroy($p2,$userRole)); }
methodNotAllowed();
