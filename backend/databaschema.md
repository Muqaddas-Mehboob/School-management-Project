# School Management System – Database Schema & API Reference (Updated)

> **Note**: The live backend uses **MongoDB** (see `backend/config/db.php`). The original `schema.sql` describes a relational design and is retained for reference, but the actual collections below reflect the current implementation and the data requirements extracted from the entire frontend (student, teacher, and admin UI).

---

## 🗂️ Collections (MongoDB)

| Collection | Description | Key Fields |
|-----------|-------------|------------|
| `users` | Unified user store for all roles (admin, teacher, student, parent). Authentication uses JWT (RS256). | `_id`, `schoolId`, `role` ("Admin"/"Teacher"/"Student"/"Parent"), `email`, `password` (bcrypt), `name`, `phone`, `profilePhoto`, `isActive`, `createdAt`, `updatedAt` |
| `refreshTokens` | Stores refresh tokens for JWT renewal. | `_id`, `userId`, `email`, `token`, `createdAt` (unix), `expiresAt` (unix, 7 days) |
| `schools` | Basic school information. | `_id`, `schoolName`, `schoolCode` (unique), `email`, `phone`, `address`, `logo`, `createdAt` |
| `students` | Student profile linked to a `users` record. | `_id`, `userId`, `schoolId`, `rollNumber`, `studentId`, `name`, `email`, `phone`, `gender`, `dateOfBirth`, `address`, `classId`, `sectionId`, `session`, `status` ("active"/"warning"/"inactive"), `profilePhoto`, `guardian` (object), `gpa`, `createdAt`, `updatedAt` |
| `teachers` | Teacher profile linked to a `users` record. | `_id`, `userId`, `schoolId`, `name`, `email`, `phone`, `employeeId`, `designation`, `isClassTeacher`, `profilePhoto`, `qualification`, `joiningDate`, `createdAt` |
| `parents` | Parent information (optional linking to a `users` record). | `_id`, `userId`, `schoolId`, `fatherName`, `motherName`, `fatherPhone`, `motherPhone`, `fatherOccupation`, `address`, `createdAt` |
| `student_parents` | Many‑to‑many mapping between students and parents. | `_id`, `studentId`, `parentId`, `relation` ("Father"/"Mother"/"Guardian"), `isPrimary` |
| `classes` | Class definitions (used by teachers and students). | `_id`, `schoolId`, `name`, `gradeLevel` (e.g., "Class 10-A"), `room`, `schedule` (string), `hoursPerWeek`, `studentCount`, `syllabusProgress` (0‑100), `teacherIds` (array), `color` |
| `sections` | Optional sections within a class. | `_id`, `classId`, `name` |
| `subjects` | Subject catalogue. | `_id`, `schoolId`, `classId`, `name`, `code`, `teacherId`, `description`, `createdAt` |
| `teacher_classes` | Mapping of teachers to classes/subjects. | `_id`, `teacherId`, `classId`, `sectionId` (optional), `subjectId`, `session` |
| `assignments` | Assignments created by teachers. | `_id`, `schoolId`, `teacherId`, `classId`, `subjectId`, `title`, `description`, `dueDate`, `totalPoints`, `status` ("active"/"upcoming"/"past"), `createdAt`, `updatedAt` |
| `assignment_submissions` | Student submissions for assignments. | `_id`, `assignmentId`, `studentId`, `status` ("pending"/"submitted"/"graded"), `submission` (object: `fileUrl`, `fileName`, `note`, `submittedDate`), `grading` (object: `score`, `feedback`, `gradedAt`, `gradedBy`), `createdAt`, `updatedAt` |
| `attendance` | Daily attendance records. | `_id`, `schoolId`, `classId`, `subjectId` (optional), `studentId`, `date`, `status` ("present"/"absent"/"late"), `lateTime` (optional), `reason` (optional), `teacherId`, `recordedAt` |
| `exams` | Scheduled exams. | `_id`, `schoolId`, `classId`, `subjectId`, `title`, `examType` ("quiz"/"midterm"/"final"/...), `date`, `time`, `duration`, `room`, `syllabus`, `totalMarks`, `status` ("scheduled"/"completed"/"cancelled"), `createdBy` (teacherId), `createdAt` |
| `results` | Exam results per student. | `_id`, `studentId`, `examId`, `subjectId`, `scoredMarks`, `totalMarks`, `percentage`, `grade`, `remarks`, `publishedAt`, `gradedBy` |
| `grades` | Gradebook entries (quiz, midterm, project, final, etc.). | `_id`, `studentId`, `classId`, `subjectId`, `type` ("quiz1"/"quiz2"/"midterm"/"project"/"final"), `score`, `maxScore`, `teacherId`, `updatedAt` |
| `progress_reports` | High‑level progress report per student per term. | `_id`, `studentId`, `classId`, `termId`, `overallGrade`, `overallPercentage`, `gpa`, `rank`, `attendancePercentage`, `teacherComment`, `createdAt`, `updatedAt` |
| `subject_progress` | Detailed per‑subject breakdown used in progress reports. | `_id`, `reportId`, `subjectId`, `grade`, `percentage`, `assignments` (object: `completed`, `total`, `avgScore`), `exams` (array of objects), `attendancePercentage`, `strengths` (array), `improvements` (array), `teacherComment` |
| `schedule_events` | Teacher timetable / class schedule entries. | `_id`, `teacherId`, `classId` (optional), `schoolId`, `title`, `type` ("class"/"meeting"/"event"), `subject` (optional), `startTime`, `endTime`, `location`, `description`, `color`, `recurring` (object), `createdAt` |
| `conversations` | Messaging conversations between a teacher and a student (or admin). | `_id`, `participants` (array of userIds), `subject`, `lastMessage`, `lastMessageAt`, `unreadCount` (object keyed by userId), `createdAt` |
| `messages` | Individual chat messages. | `_id`, `conversationId`, `senderId`, `senderRole` ("teacher"/"student"/"admin"), `text`, `attachmentUrl` (optional), `readBy` (array of userIds), `timestamp` |
| `notifications` | Push notifications shown in the UI. | `_id`, `recipientId`, `schoolId`, `type` ("exam"/"assignment"/"timetable"/"grade"/"announcement"/"resource"/"event"), `title`, `message`, `relatedId` (optional), `relatedModel` (optional), `important` (bool), `read` (bool), `createdAt` |
| `resources` | Learning materials uploaded by teachers. | `_id`, `schoolId`, `classId`, `subjectId`, `title`, `type` ("notes"/"video"/"presentation"/"document"), `fileUrl`, `fileName`, `size`, `duration` (video), `slides` (presentation), `downloads`, `uploadDate`, `description`, `isPublic` |
| `resource_access` | Tracks student access to resources. | `_id`, `resourceId`, `studentId`, `accessedAt` |
| `achievements` | Student achievements & awards. | `_id`, `studentId`, `schoolId`, `title`, `category` ("Academic"/"Attendance"/"Competition"/...), `date`, `icon`, `description`, `awardedBy` (teacherId), `createdAt` |
| `academic_history` | Historical academic records for a student. | `_id`, `studentId`, `session`, `grade`, `averageScore`, `status` ("Current"/"Completed"), `createdAt` |
| `terms` | Academic term definitions (used in progress reports). | `_id`, `schoolId`, `name` (e.g., "First Term"), `session`, `startDate`, `endDate`, `isCurrent`, `createdAt` |
| `activity_log` | System activity feed for teachers (submissions, messages, attendance, grades). | `_id`, `actorId`, `actorRole`, `type` ("submission"/"message"/"attendance"/"grade"), `title`, `description`, `entityId`, `entityType`, `createdAt` |
| `admin_stats` *(virtual)* | Not a collection – computed on‑demand from other collections for the admin dashboard. |

---

## 🔧 API Endpoints (REST) – Summary

All APIs expect the `Authorization: Bearer <jwt>` header (except `/api/auth/*`). The backend is built with **PHP**, routes are defined in `backend/routes/*.php` and will be expanded to cover the collections above.

| Method | Path | Description | Required Role |
|--------|------|-------------|---------------|
| **Auth** ||||
| POST | `/api/auth/register` | Register a new user (email, password, role). | Public |
| POST | `/api/auth/login` | Login – returns access token (10 s) and refresh token (7 days). | Public |
| POST | `/api/auth/verify` | Verify/refresh token. | Authenticated |
| POST | `/api/auth/logout` | Invalidate refresh token. | Authenticated |
| **School** ||||
| GET | `/api/school` | Get school info. | Authenticated |
| PUT | `/api/school` | Update school info. | **Admin** |
| **Users** ||||
| GET | `/api/users` | List all users (admin). | **Admin** |
| GET | `/api/users/{id}` | Get user details. | Admin / self |
| PUT | `/api/users/{id}` | Update user (admin or self). | Admin / self |
| DELETE | `/api/users/{id}` | Delete user. | **Admin** |
| **Students** ||||
| GET | `/api/students` | List students (admin/teacher). Supports `?classId=` `?search=`. | Admin / Teacher |
| GET | `/api/students/{id}` | Student detail. | Admin / Teacher / self |
| POST | `/api/students` | Create student (admin). | **Admin** |
| PUT | `/api/students/{id}` | Update student. | Admin / Teacher |
| DELETE | `/api/students/{id}` | Delete student. | **Admin** |
| GET | `/api/students/me` | Logged‑in student profile. | **Student** |
| PUT | `/api/students/me` | Update own profile. | **Student** |
| **Teachers** ||||
| GET | `/api/teachers` | List teachers. | Admin |
| GET | `/api/teachers/{id}` | Teacher detail. | Admin / self |
| POST | `/api/teachers` | Create teacher. | **Admin** |
| PUT | `/api/teachers/{id}` | Update teacher. | Admin / self |
| DELETE | `/api/teachers/{id}` | Delete teacher. | **Admin** |
| GET | `/api/teachers/me` | Own profile. | **Teacher** |
| **Classes** ||||
| GET | `/api/classes` | List all classes. | Authenticated |
| GET | `/api/classes/{id}` | Class detail. | Authenticated |
| POST | `/api/classes` | Create class. | **Admin** |
| PUT | `/api/classes/{id}` | Update class. | **Admin** |
| DELETE | `/api/classes/{id}` | Delete class. | **Admin** |
| GET | `/api/teacher/classes` | Classes assigned to the logged‑in teacher. | **Teacher** |
| **Subjects** ||||
| GET | `/api/subjects` | List subjects (optional `?classId=`). | Authenticated |
| GET | `/api/subjects/{id}` | Subject detail. | Authenticated |
| POST | `/api/subjects` | Create subject. | **Admin** |
| PUT | `/api/subjects/{id}` | Update subject. | **Admin** |
| DELETE | `/api/subjects/{id}` | Delete subject. | **Admin** |
| **Assignments** ||||
| GET | `/api/assignments?teacherId=&status=` | List assignments for a teacher. | Teacher |
| POST | `/api/assignments` | Create assignment. | Teacher |
| GET | `/api/assignments/{id}` | Assignment detail. | Teacher / Student (if belongs to class) |
| PUT | `/api/assignments/{id}` | Update assignment. | Teacher |
| DELETE | `/api/assignments/{id}` | Delete assignment. | Teacher |
| POST | `/api/assignments/{id}/submit` | Student submits file/note. | **Student** |
| GET | `/api/assignments/{id}/submissions` | List submissions (teacher). | Teacher |
| PUT | `/api/submissions/{id}/grade` | Teacher grades a submission. | Teacher |
| **Attendance** ||||
| GET | `/api/attendance?classId=&date=` | Get attendance for a class on a date. | Teacher |
| POST | `/api/attendance` | Save attendance records (bulk). | Teacher |
| GET | `/api/attendance/student/{id}` | Student attendance history. | Student / Teacher |
| GET | `/api/attendance/student/{id}/stats` | Attendance summary (counts & percentage). | Student / Teacher |
| GET | `/api/attendance/weekly-summary?teacherId=` | Weekly aggregated stats for dashboard. | Teacher |
| **Exams & Results** ||||
| GET | `/api/exams` | List all exams. | Authenticated |
| GET | `/api/exams/upcoming` | Upcoming exams for the logged‑in user. | Authenticated |
| POST | `/api/exams` | Create exam. | Teacher |
| GET | `/api/exams/{id}` | Exam detail. | Authenticated |
| PUT | `/api/exams/{id}` | Update exam. | Teacher |
| DELETE | `/api/exams/{id}` | Delete exam. | Teacher |
| GET | `/api/results` | All results (admin/teacher). | Teacher |
| GET | `/api/results/student/{id}` | Student's results. | Student / Teacher |
| POST | `/api/results` | Enter a result (teacher). | Teacher |
| PUT | `/api/results/{id}` | Update result. | Teacher |
| **Grades** ||||
| GET | `/api/grades?classId=` | Gradebook for a class. | Teacher |
| PUT | `/api/grades` | Bulk save grades. | Teacher |
| GET | `/api/grades/export?classId=` | Export CSV. | Teacher |
| **Progress Reports** ||||
| GET | `/api/progress-reports/student/{id}?term=` | Student progress report. | Student / Teacher |
| GET | `/api/progress-reports/class/{classId}?term=` | Class‑wide overview. | Teacher |
| POST | `/api/progress-reports/{studentId}/comment` | Save teacher comment. | Teacher |
| GET | `/api/progress-reports/export?classId=&term=` | Export all reports. | Teacher |
| **Schedule** ||||
| GET | `/api/schedule?weekStart=` | Events for a week (teacher). | Teacher |
| POST | `/api/schedule/events` | Create schedule event. | Teacher |
| DELETE | `/api/schedule/events/{id}` | Delete event. | Teacher |
| GET | `/api/schedule/class/{classId}` | Class timetable (student view). | Student |
| **Messaging** ||||
| GET | `/api/messages/conversations` | List conversations for the logged‑in user. | Authenticated |
| GET | `/api/messages/conversations/{id}` | Get thread messages. | Authenticated |
| POST | `/api/messages` | Start new conversation / send message. | Authenticated |
| PUT | `/api/messages/{id}/read` | Mark a message as read. | Authenticated |
| **Notifications** ||||
| GET | `/api/notifications` | List notifications (optionally `?read=false`). | Authenticated |
| PUT | `/api/notifications/{id}/read` | Mark as read. | Authenticated |
| PUT | `/api/notifications/read-all` | Mark all as read. | Authenticated |
| DELETE | `/api/notifications/{id}` | Delete notification. | Authenticated |
| POST | `/api/notifications` | Create notification (admin/teacher). | Admin / Teacher |
| **Resources** ||||
| GET | `/api/resources` | List resources (filtered by class/subject). | Authenticated |
| GET | `/api/resources/{id}` | Resource detail. | Authenticated |
| POST | `/api/resources` | Upload new resource (teacher). | Teacher |
| PUT | `/api/resources/{id}` | Update resource. | Teacher |
| DELETE | `/api/resources/{id}` | Delete resource. | Teacher |
| POST | `/api/resources/{id}/download` | Register a download & return file URL. | Student |
| **Achievements** ||||
| GET | `/api/achievements/student/{id}` | Student's achievements. | Student / Teacher |
| POST | `/api/achievements` | Add achievement (teacher/admin). | Teacher |
| PUT | `/api/achievements/{id}` | Update achievement. | Teacher |
| DELETE | `/api/achievements/{id}` | Delete achievement. | Teacher |
| **Settings** ||||
| GET | `/api/settings` | Get current user settings. | Authenticated |
| PUT | `/api/settings` | Update settings (notifications, appearance, privacy). | Authenticated |
| PUT | `/api/settings/password` | Change password. | Authenticated |
| PUT | `/api/settings/profile-photo` | Upload profile picture. | Authenticated |
| **Admin Dashboard** ||||
| GET | `/api/admin/stats` | Overview metrics (students, teachers, classes, attendance, pending actions). | **Admin** |
| GET | `/api/admin/recent-activity` | Recent system activity feed. | **Admin** |
| POST | `/api/admin/users` | Create any user (admin). | **Admin** |
| DELETE | `/api/admin/users/{id}` | Deactivate/delete a user. | **Admin** |
| **Terms** ||||
| GET | `/api/terms` | List all terms. | Authenticated |
| GET | `/api/terms/current` | Current active term. | Authenticated |
| POST | `/api/terms` | Create term. | **Admin** |
| PUT | `/api/terms/{id}` | Update term. | **Admin** |
| **Academic History** ||||
| GET | `/api/academic-history/student/{id}` | Academic history for a student. | Student / Teacher |
| GET | `/api/academic-history/me` | Own academic history. | **Student** |

---

## 📌 Implementation Notes

1. **JWT Expiry** – The current backend sets the access token expiry to **10 seconds** (development stub). Update `backend/middlewares/authmiddleware.php` to a production‑ready value (e.g., 30 minutes).
2. **Refresh Token Logic** – Replace the hard‑coded email `test@test.com` in `services/auth.php` with the email extracted from the decoded JWT payload.
3. **Remove Debug Code** – Delete stray `var_dump($data)` in `User.model.php` and any `sleep(6)` calls in the verify route.
4. **File Uploads** – Assignments and Resources require multipart handling. Store files on the server (or a cloud bucket) and save the resulting URL in `assignment_submissions.fileUrl` or `resources.fileUrl`.
5. **Pagination** – All list endpoints should support `?page=` and `?limit=` parameters, returning `{ data: [], meta: { total, page, limit } }`.
6. **Response Envelope** – Use a consistent JSON envelope:
   ```json
   { "success": true, "data": { ... }, "message": "Optional description" }
   ```
   Errors should return `{ "success": false, "error": "Message" }`.
7. **Role‑Based Middleware** – Add checks in each route to enforce the required role (see the “Required Role” column above).
8. **Indexing** – Create MongoDB indexes on frequently queried fields: `users.email`, `students.classId`, `attendance.studentId+date`, `assignments.teacherId`, `schedule_events.teacherId+startTime`.
9. **OpenAPI Spec** – Consider generating an OpenAPI (Swagger) definition from the table above for front‑end integration.

---

## 🎨 Front‑End Alignment

The schema and API list directly reflect every data field referenced in the UI components (student dashboard, teacher pages, admin dashboard). Once the backend routes are implemented and the JWT expiry issue fixed, the frontend can replace all mock data with real API calls, enabling a fully functional end‑to‑end system.

---

*Generated by Antigravity – your AI coding partner.*
