<?php
require_once __DIR__.'/../helpers/auth_helper.php';
require_once __DIR__.'/../helpers/route_helper.php';
require_once __DIR__.'/../controllers/AssignmentController.php';
$c=new AssignmentController($database);
$s=parseRouteSegments('assignments');
$id=$s[0]??null; $sub=$s[1]??null;
$m=$_SERVER['REQUEST_METHOD'];
if($m==='GET'){ 
    if($sub==='submissions') jsonResponse($c->getSubmissions($id,$userRole));
    jsonResponse($id?$c->show($id):$c->index($_GET)); 
}
elseif($m==='POST'){ 
    if($sub==='submit') jsonResponse($c->submit($id,getRequestBody(),$userRole,$userId));
    jsonResponse($c->create(getRequestBody(),$userRole)); 
}
elseif($m==='PUT'){ jsonResponse($id?$c->update($id,getRequestBody(),$userRole):badRequest()); }
elseif($m==='DELETE'){ jsonResponse($id?$c->destroy($id,$userRole):badRequest()); }
methodNotAllowed();
