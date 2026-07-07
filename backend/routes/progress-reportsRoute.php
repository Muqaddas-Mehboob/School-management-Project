<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/ProgressReportController.php';
$c=new ProgressReportController($database);
$s=parseRouteSegments('progress-reports'); $p1=$s[0]??null; $p2=$s[1]??null; $p3=$s[2]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){
    if($p1==='student'&&$p2) jsonResponse($c->student($p2,$_GET,$userRole,$userId));
    if($p1==='class'&&$p2) jsonResponse($c->classRep($p2,$_GET,$userRole));
} elseif($m==='POST' && $p2==='comment') { jsonResponse($c->comment($p1,getRequestBody(),$userRole)); }
methodNotAllowed();
