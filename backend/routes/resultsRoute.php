<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/ResultController.php';
$c=new ResultController($database);
$s=parseRouteSegments('results'); $p1=$s[0]??null; $p2=$s[1]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ if($p1==='student'&&$p2) jsonResponse($c->student($p2,$userRole,$userId)); jsonResponse($c->index($userRole)); }
elseif($m==='POST'){ jsonResponse($c->create(getRequestBody(),$userRole)); }
elseif($m==='PUT'){ jsonResponse($p1?$c->update($p1,getRequestBody(),$userRole):badRequest()); }
methodNotAllowed();
