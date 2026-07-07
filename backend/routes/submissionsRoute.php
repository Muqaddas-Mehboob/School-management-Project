<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AssignmentController.php';
$c=new AssignmentController($database);
$s=parseRouteSegments('submissions');
$id=$s[0]??null; $sub=$s[1]??null;
$m=$_SERVER['REQUEST_METHOD'];
if($m==='PUT' && $sub==='grade'){ jsonResponse($c->grade($id,getRequestBody(),$userRole)); }
methodNotAllowed();
