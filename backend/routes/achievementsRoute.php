<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AchievementController.php';
$c=new AchievementController($database);
$s=parseRouteSegments('achievements'); $p1=$s[0]??null; $p2=$s[1]??null; $m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'&&$p1==='student'&&$p2){ jsonResponse($c->student($p2,$userRole,$userId)); }
elseif($m==='POST'){ jsonResponse($c->create(getRequestBody(),$userRole,$userId)); }
elseif($m==='PUT'&&$p1){ jsonResponse($c->update($p1,getRequestBody(),$userRole)); }
elseif($m==='DELETE'&&$p1){ jsonResponse($c->destroy($p1,$userRole)); }
methodNotAllowed();
