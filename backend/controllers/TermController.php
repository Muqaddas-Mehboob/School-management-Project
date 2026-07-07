<?php
require_once __DIR__.'/../services/TermService.php';
require_once __DIR__.'/../validators/Validator.php';
class TermController {
    private $s;
    public function __construct($db){ $this->s=new TermService($db); }
    public function index($q){ return $this->s->getAll([],$q['page']??1,$q['limit']??10); }
    public function show($id){ return $id==='current'?$this->s->getCurrent():$this->s->getById($id); }
    public function create($d,$r){
        if($r!=='admin') return $this->f();
        $v=Validator::validate($d,['name'=>'required','startDate'=>'required','endDate'=>'required']);
        if(!$v['success']) return ["success"=>false,"errors"=>$v['errors']];
        return $this->s->create($d);
    }
    public function update($id,$d,$r){ if($r!=='admin') return $this->f(); return $this->s->update($id,$d); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
