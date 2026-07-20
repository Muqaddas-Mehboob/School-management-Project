<?php
require_once __DIR__.'/../services/AssignmentService.php';
require_once __DIR__.'/../services/FileService.php';
require_once __DIR__.'/../validators/FileValidator.php';
require_once __DIR__.'/../validators/Validator.php';

/**
 * AssignmentController
 *
 * Thin controller — enforces role-based access, delegates to
 * AssignmentService for data and FileService for file operations.
 *
 * This controller does NOT communicate with Cloudinary directly.
 */
class AssignmentController {
    private AssignmentService $s;
    private FileService $fileService;

    public function __construct($db) {
        $this->s           = new AssignmentService($db);
        $this->fileService = new FileService($db);
    }

    // ── Existing endpoints (unchanged behaviour) ──────────────────────────────

    public function index($q) {
        $f = [];
        if (!empty($q['teacherId'])) $f['teacherId'] = $q['teacherId'];
        if (!empty($q['status']))    $f['status']    = $q['status'];
        return $this->s->getAll($f, $q['page'] ?? 1, $q['limit'] ?? 10);
    }

    public function show($id) {
        return $this->s->getById($id);
    }

    public function create($d, $r) {
        if ($r !== 'teacher') return $this->forbidden();
        return $this->s->create($d);
    }

    public function update($id, $d, $r) {
        if ($r !== 'teacher') return $this->forbidden();
        return $this->s->update($id, $d);
    }

    public function destroy($id, $r) {
        if ($r !== 'teacher') return $this->forbidden();
        return $this->s->delete($id);
    }

    public function submit($id, $d, $r, $uid) {
        if ($r !== 'student') return $this->forbidden();
        return $this->s->submit($id, $uid, $d);
    }

    public function getSubmissions($id, $r) {
        if ($r !== 'teacher') return $this->forbidden();
        return $this->s->getSubmissions($id);
    }

    public function grade($id, $d, $r) {
        if ($r !== 'teacher') return $this->forbidden();
        return $this->s->gradeSubmission($id, $d);
    }

    // ── New file endpoints ────────────────────────────────────────────────────

    /**
     * POST /api/assignments/upload
     *
     * Create an assignment with an associated uploaded file.
     * Restricted to teachers.
     *
     * Expects multipart/form-data with:
     *   - $_FILES['file']    — the assignment document
     *   - $_POST['title']    — assignment title (required)
     *   - $_POST['description'] — optional description
     *   - $_POST['dueDate']  — optional due date
     *   - Any additional $_POST fields are forwarded to the service
     *
     * @param string $userRole   Authenticated user's role
     * @param string $userId     Authenticated user's MongoDB _id
     * @return array
     */
    public function uploadAssignment(string $userRole, string $userId): array {
        if ($userRole !== 'teacher') {
            return $this->forbidden();
        }

        // ── 1. Validate required body fields ──────────────────────────────────
        $bodyData = $_POST; // multipart/form-data fields arrive in $_POST
        $validation = Validator::validate($bodyData, [
            'title' => 'required',
        ]);
        if (!$validation['success']) {
            http_response_code(422);
            return [
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validation['errors'],
            ];
        }

        // ── 2. Ensure file was submitted ──────────────────────────────────────
        if (!isset($_FILES['file']) || $_FILES['file']['error'] === UPLOAD_ERR_NO_FILE) {
            http_response_code(422);
            return [
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => ['file' => 'No file was provided. Expected field name: "file".'],
            ];
        }

        // ── 3. Validate file (binary MIME inspection) ─────────────────────────
        $fileValidation = FileValidator::validate($_FILES['file'], FileValidator::POLICY_ASSIGNMENT);
        if (!$fileValidation['success']) {
            http_response_code(422);
            return [
                'success' => false,
                'message' => 'File validation failed.',
                'errors'  => ['file' => $fileValidation['errors']],
            ];
        }

        // ── 4. Upload file via FileService (Cloudinary + MongoDB metadata) ────
        try {
            $fileMeta = $this->fileService->upload(
                $_FILES['file'],
                FileService::FOLDER_ASSIGNMENTS,
                $userId,
                $fileValidation['realMime']
            );
        } catch (\RuntimeException $e) {
            http_response_code(500);
            return ['success' => false, 'message' => 'File upload failed: ' . $e->getMessage()];
        }

        // ── 5. Create assignment with embedded file metadata ──────────────────
        $assignmentData = [
            'title'       => trim($bodyData['title']),
            'description' => trim($bodyData['description'] ?? ''),
            'dueDate'     => $bodyData['dueDate'] ?? null,
            'teacherId'   => $userId,
            'status'      => 'active',
        ];

        $result = $this->s->createWithFile($assignmentData, $fileMeta);
        http_response_code(201);
        return $result;
    }

    /**
     * GET /api/assignments/download/{assignmentId}
     *
     * Return the download URL for an assignment file.
     * Requires an authenticated user (any role).
     *
     * The response contains the Cloudinary secure URL. Clients may
     * redirect to it or use it directly (Cloudinary handles delivery).
     *
     * @param string $assignmentId  MongoDB _id of the assignment
     * @param string $userRole      Authenticated user's role
     * @param string $userId        Authenticated user's MongoDB _id
     * @return array
     */
    public function download(string $assignmentId, string $userRole, string $userId): array {
        // ── 1. Validate assignment exists ─────────────────────────────────────
        $assignment = $this->s->getById($assignmentId);
        if (!$assignment['success']) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Assignment not found.'];
        }

        // ── 2. Retrieve file metadata ─────────────────────────────────────────
        $fileMeta = $this->s->getFileMetadata($assignmentId);
        if (!$fileMeta || empty($fileMeta['url'])) {
            http_response_code(404);
            return [
                'success' => false,
                'message' => 'This assignment has no associated file.',
            ];
        }

        // ── 3. Return secure URL (Cloudinary handles delivery/access) ─────────
        http_response_code(200);
        return [
            'success' => true,
            'message' => 'Download URL retrieved.',
            'data'    => [
                'url'              => $fileMeta['url'],
                'originalFilename' => $fileMeta['originalFilename'] ?? '',
                'mimeType'         => $fileMeta['mimeType'] ?? '',
                'size'             => $fileMeta['size'] ?? 0,
            ],
        ];
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private function forbidden(): array {
        http_response_code(403);
        return ['success' => false, 'message' => 'Forbidden'];
    }
}
