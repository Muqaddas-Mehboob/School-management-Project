<?php

require_once __DIR__ . '/../services/SchoolService.php';
require_once __DIR__ . '/../validators/Validator.php';

class SchoolController {
    private $schoolService;

    public function __construct($database) {
        $this->schoolService = new SchoolService($database);
    }

    public function getSchool() {
        return $this->schoolService->getSchoolInfo();
    }

    public function updateSchool($data, $userRole) {
        if ($userRole !== 'Admin') {
            http_response_code(403);
            return ["success" => false, "message" => "Forbidden: Only Admin can update school info."];
        }

        $rules = [
            'schoolName' => 'required|min:3',
            'schoolCode' => 'required',
            'email' => 'required|email',
            'phone' => 'required'
        ];

        $validation = Validator::validate($data, $rules);
        if (!$validation['success']) {
            http_response_code(422);
            return ["success" => false, "message" => "Validation failed", "errors" => $validation['errors']];
        }

        return $this->schoolService->updateSchoolInfo($data);
    }
}
