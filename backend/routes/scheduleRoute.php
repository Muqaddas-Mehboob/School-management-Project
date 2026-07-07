<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/ScheduleController.php';
$c=new ScheduleController($database);
$s=parseRouteSegments('schedule');
$p1=$s[0]??null; $p2=$s[1]??null;
$m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){
    if($p1==='class' && $p2) jsonResponse($c->classTimetable($p2,$userRole));
    jsonResponse($c->index($_GET,$userRole,$userId));
}
elseif($m==='POST'){ 
    if($p1==='events') jsonResponse($c->create(getRequestBody(),$userRole,$userId));
}
elseif($m==='DELETE'){ 
    if($p1==='events' && $p2) jsonResponse($c->destroy($p2,$userRole));
}
methodNotAllowed();
