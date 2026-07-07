<?php
require_once __DIR__.'/../services/ResourceService.php';
class ResourceController {
    private $s;
    public function __construct($db){ $this->s=new ResourceService($db); }
    public function index($q){ 
        $f=[]; if(!empty($q['classId'])) $f['classId']=$q['classId'];
        if(!empty($q['subjectId'])) $f['subjectId']=$q['subjectId'];
        return $this->s->getAll($f,$q['page']??1,$q['limit']??10); 
    }
    public function show($id){ return $this->s->getById($id); }
    public function create($d,$r){ if($r!=='teacher') return $this->f(); return $this->s->create($d); }
    public function update($id,$d,$r){ if($r!=='teacher') return $this->f(); return $this->s->update($id,$d); }
    public function destroy($id,$r){ if($r!=='teacher') return $this->f(); return $this->s->delete($id); }
    public function download($id,$r,$sid){ if($r!=='student') return $this->f(); return $this->s->registerDownload($id,$sid); }
    private function f(){ http_response_code(403); return ["success"=>false,"message"=>"Forbidden"]; }
}
