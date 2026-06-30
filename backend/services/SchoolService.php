<?php

require_once __DIR__ . '/../models/School.model.php';

class SchoolService {
    private $schoolModel;

    public function __construct($database) {
        $this->schoolModel = new School($database);
    }

    public function getSchoolInfo() {
        // Assuming single school tenant for now. Adjust if multi-tenant.
        $schools = $this->schoolModel->findAll([], ['limit' => 1]);
        if (count($schools) > 0) {
            return ["success" => true, "data" => $schools[0]];
        }
        return ["success" => false, "message" => "School not found"];
    }

    public function updateSchoolInfo($data) {
        $schools = $this->schoolModel->findAll([], ['limit' => 1]);
        if (count($schools) > 0) {
            $schoolId = (string) $schools[0]['_id'];
            $success = $this->schoolModel->updateById($schoolId, $data);
            if ($success) {
                return ["success" => true, "message" => "School information updated successfully"];
            }
            return ["success" => false, "message" => "Failed to update school information"];
        }
        
        // If no school exists, create it
        $this->schoolModel->create($data);
        return ["success" => true, "message" => "School information created successfully"];
    }
}
