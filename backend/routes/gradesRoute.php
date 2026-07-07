<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/GradeController.php';
$c=new GradeController($database);
$m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ jsonResponse($c->index($_GET,$userRole)); }
elseif($m==='PUT'){ jsonResponse($c->bulk(getRequestBody(),$userRole,$userId)); }
methodNotAllowed();
