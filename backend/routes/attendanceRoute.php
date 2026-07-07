<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AttendanceController.php';
$c=new AttendanceController($database);
$s=parseRouteSegments('attendance');
$p1=$s[0]??null; $p2=$s[1]??null; $p3=$s[2]??null;
$m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){
    if($p1==='student' && $p2){
        if($p3==='stats') jsonResponse($c->stats($p2,$userRole,$userId));
        else jsonResponse($c->history($p2,$userRole,$userId));
    }
    jsonResponse($c->index($_GET,$userRole));
}
elseif($m==='POST'){ jsonResponse($c->bulkSave(getRequestBody(),$userRole,$userId)); }
methodNotAllowed();
