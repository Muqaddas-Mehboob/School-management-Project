<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../services/ClassService.php';
$s=parseRouteSegments('teacher');
$m=$_SERVER['REQUEST_METHOD'];
if($m==='GET' && ($s[0]??'')==='classes' && $userRole==='teacher'){
    $cs=new ClassService($database);
    jsonResponse($cs->getAll(['teacherIds'=>$userId], $_GET['page']??1, $_GET['limit']??10));
}
methodNotAllowed();
