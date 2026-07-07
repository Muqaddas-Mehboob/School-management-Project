<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AcademicHistoryController.php';
$c=new AcademicHistoryController($database);
$s=parseRouteSegments('academic-history'); $p1=$s[0]??null; $p2=$s[1]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){
    if($p1==='student'&&$p2) jsonResponse($c->student($p2,$userRole,$userId));
    if($p1==='me') jsonResponse($c->me($userId));
}
methodNotAllowed();
