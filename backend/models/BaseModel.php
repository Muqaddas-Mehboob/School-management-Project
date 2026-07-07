<?php

class BaseModel {
    protected $collection;
    
    public function __construct($database, $collectionName) {
        $this->collection = $database->$collectionName;
    }
    
    public function create($data) {
        $data['createdAt'] = date('c'); // ISO 8601
        $data['updatedAt'] = date('c');
        $result = $this->collection->insertOne($data);
        return (string) $result->getInsertedId();
    }
    
    public function findById($id) {
        try {
            $objectId = new MongoDB\BSON\ObjectId($id);
            return $this->collection->findOne(['_id' => $objectId]);
        } catch (Exception $e) {
            return null;
        }
    }
    
    public function findAll($filter = [], $options = []) {
        return $this->collection->find($filter, $options)->toArray();
    }
    
    public function updateById($id, $data) {
        try {
            $objectId = new MongoDB\BSON\ObjectId($id);
            $data['updatedAt'] = date('c');
            $result = $this->collection->updateOne(
                ['_id' => $objectId],
                ['$set' => $data]
            );
            return $result->getModifiedCount() > 0;
        } catch (Exception $e) {
            return false;
        }
    }
    
    public function updateAll($id, $data) {
        try {
            $objectId = new MongoDB\BSON\ObjectId($id);
            $data['updatedAt'] = date('c');
            $result = $this->collection->updateMany(
                ['_id' => $objectId],
                ['$set' => $data]
            );
            return $result->getModifiedCount() > 0;
        } catch (Exception $e) {
            return false;
        }
    }
    
    public function deleteById($id) {
        try {
            $objectId = new MongoDB\BSON\ObjectId($id);
            $result = $this->collection->deleteOne(['_id' => $objectId]);
            return $result->getDeletedCount() > 0;
        } catch (Exception $e) {
            return false;
        }
    }
    
    // Pagination helper
    public function paginate($filter = [], $page = 1, $limit = 10, $sort = ['createdAt' => -1]) {
        $skip = ($page - 1) * $limit;
        
        $data = $this->collection->find($filter, [
            'skip' => $skip,
            'limit' => $limit,
            'sort' => $sort
        ])->toArray();
        
        $total = $this->collection->countDocuments($filter);
        
        return [
            'data' => $data,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ];
    }
}
