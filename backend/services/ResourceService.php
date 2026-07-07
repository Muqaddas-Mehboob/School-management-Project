<?php
require_once __DIR__.'/../models/ResourceModel.php';
require_once __DIR__.'/../models/ResourceAccessModel.php';
class ResourceService {
    private $m,$am;
    public function __construct($db){ $this->m=new ResourceModel($db); $this->am=new ResourceAccessModel($db); }
    public function getAll($f=[],$p=1,$l=10){ $r=$this->m->paginate($f,$p,$l); return ["success"=>true,"data"=>$r['data'],"meta"=>$r['meta']]; }
    public function getById($id){ $r=$this->m->findById($id); return $r?["success"=>true,"data"=>$r]:["success"=>false,"message"=>"Not found"]; }
    public function create($d){ return ["success"=>true,"data"=>["id"=>$this->m->create($d)]]; }
    public function update($id,$d){ $s=$this->m->updateById($id,$d); return ["success"=>$s,"message"=>$s?"Updated":"Not found"]; }
    public function delete($id){ $s=$this->m->deleteById($id); return ["success"=>$s,"message"=>$s?"Deleted":"Not found"]; }
    public function registerDownload($id,$sid){ 
        $this->am->create(['resourceId'=>$id,'studentId'=>$sid,'accessedAt'=>date('c')]);
        $r=$this->m->findById($id);
        return $r?["success"=>true,"data"=>["fileUrl"=>$r['fileUrl']??'']]:["success"=>false,"message"=>"Not found"];
    }
}
