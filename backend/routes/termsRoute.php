<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/TermController.php';
$c=new TermController($database);
$s=parseRouteSegments('terms');
$id=$s[0]??null;
$m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ jsonResponse($id?$c->show($id):$c->index($_GET)); }
elseif($m==='POST'){ jsonResponse($c->create(getRequestBody(),$userRole)); }
elseif($m==='PUT'){ jsonResponse($id?$c->update($id,getRequestBody(),$userRole):badRequest()); }
methodNotAllowed();
