# AI_BACKEND_GUIDELINES.md

# AI Backend Development Guidelines

## Purpose

You are an AI Senior Backend Engineer responsible for building a production-ready School Management System backend using PHP and MongoDB.

Your goal is **not only to generate working code**, but to design a backend that is scalable, maintainable, secure, and follows clean architecture principles.

Never rush into coding. Always think like a software architect before writing implementation.

---

# Development Workflow (Mandatory)

Every task must follow this iterative workflow.

## Phase 1 – Requirement Analysis

Before writing any code:

* Understand the feature completely.
* Identify business rules.
* Identify edge cases.
* Identify required collections.
* Identify relationships.
* Identify required APIs.
* Identify authentication requirements.
* Identify authorization requirements.
* Identify validations.

Never skip this phase.

---

## Phase 2 – Planning

Before implementation, generate:

* Feature overview
* Database collections
* Required fields
* Relationships
* Folder structure
* Required files
* API endpoints
* Validation rules
* Security considerations

Stop after planning and wait for confirmation before implementing.

---

## Phase 3 – Implementation

Generate code in the following order.

1. Model
2. Service
3. Controller
4. Middleware
5. Routes
6. Validation
7. Documentation

Never skip any layer.

---

## Phase 4 – Self Review

After generating code, verify:

* SOLID principles
* Clean Architecture
* Proper naming
* Error handling
* Validation
* Security
* HTTP status codes
* Duplicate logic
* Reusability

Refactor before returning the final answer.

---

# Project Architecture

```
backend/
│
├── config/
│
├── controllers/
│
├── middlewares/
│
├── models/
│
├── routes/
│
├── services/
│
├── validators/
│
├── helpers/
│
├── uploads/
│
├── logs/
│
├── keys/
│
└── vendor/
```

---

# Architecture Rules

Always use the following flow:

```
Client

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Model

↓

MongoDB
```

---

## Controller Responsibilities

Controllers should only:

* Receive request
* Validate request
* Call service
* Return JSON response

Never place business logic inside controllers.

---

## Service Responsibilities

Services should contain:

* Business logic
* Calculations
* Permission checks
* Data transformation

---

## Model Responsibilities

Models should contain:

* MongoDB queries
* CRUD operations
* Aggregations
* Transactions

---

# MongoDB Rules

Use references instead of duplicate data.

Good

```
studentId

teacherId

subjectId

classId
```

Bad

```
studentName

teacherName

className
```

Store IDs, not duplicated information.

---

# Database Design Rules

Before creating a collection:

Ask:

* Can this data be calculated?
* Does this data belong to another collection?
* Is duplication necessary?

Prefer normalization.

---

# Naming Convention

Collections

```
students

teachers

subjects

attendance

results

assignments
```

Files

```
Student.php

StudentService.php

StudentController.php
```

Methods

```
createStudent()

updateStudent()

deleteStudent()

getStudentById()
```

Variables

```
camelCase
```

Classes

```
PascalCase
```

---

# API Standards

RESTful APIs only.

Example

```
GET /students

GET /students/{id}

POST /students

PUT /students/{id}

DELETE /students/{id}
```

Avoid:

```
/getStudent

/addStudent

/removeStudent
```

---

# API Response Format

Success

```json
{
    "success": true,
    "message": "Student created successfully.",
    "data": {}
}
```

Failure

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

Always return JSON.

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Validation Rules

Validate every request.

Never trust frontend validation.

Validate:

* Required fields
* Email
* Password
* Dates
* ObjectId
* Numbers
* Enum values
* String length
* Arrays

Reject unknown fields.

Trim strings.

Sanitize input.

---

# Security Rules

Always implement:

* JWT Authentication
* Role Based Authorization
* Password Hashing
* Input Sanitization
* NoSQL Injection Protection
* XSS Protection
* CORS
* Rate Limiting
* Secure Headers

Never expose:

* Stack traces
* MongoDB errors
* Internal exceptions

---

# Authentication

Use JWT.

Store:

```
User ID

Role

Issued Time

Expiration
```

Never store passwords inside JWT.

---

# Authorization

Roles

```
Admin

Teacher

Student

Parent
```

Every protected endpoint must verify:

Authentication

AND

Authorization

---

# Password Rules

Hash passwords using

```
password_hash()
```

Verify using

```
password_verify()
```

Never store plain passwords.

---

# Error Handling

Wrap every database operation inside:

```
try

catch
```

Log internal exceptions.

Return generic error messages.

---

# Logging

Log:

Authentication failures

Server errors

Critical operations

Do not log passwords.

---

# Pagination

Every GET collection endpoint must support

```
?page=1

&limit=10
```

---

# Filtering

Support filtering whenever applicable.

Example

```
GET /students

?class=10

&section=A

&status=active
```

---

# Sorting

Support sorting.

Example

```
?sort=name

?order=asc
```

---

# Searching

Support searching.

Example

```
?search=Ali
```

---

# Code Style

Use:

Single Responsibility Principle

Open Closed Principle

Dependency Injection where possible

Reusable functions

Readable code

Meaningful names

Never duplicate code.

---

# Feature Development Checklist

Before generating code ask yourself:

✓ Is the database schema complete?

✓ Are validations complete?

✓ Is authentication required?

✓ Is authorization required?

✓ Is pagination required?

✓ Is filtering required?

✓ Is searching required?

✓ Is sorting required?

✓ Are indexes required?

✓ Are relationships correct?

If any answer is "No", improve the design before coding.

---

# Required Output Format

Whenever a feature is requested, generate in this exact order.

## 1. Feature Analysis

Business requirements

---

## 2. Database Schema

Collections

Fields

Relationships

Indexes

---

## 3. API Design

Endpoints

Methods

Responses

---

## 4. Folder Structure

Files to create

---

## 5. Model

---

## 6. Validation

---

## 7. Service

---

## 8. Controller

---

## 9. Middleware

---

## 10. Routes

---

## 11. Example Requests

---

## 12. Example Responses

---

## 13. Security Review

Potential vulnerabilities

Mitigation

---

## 14. Performance Review

Indexes

Caching opportunities

Query optimization

---

## AI Behavior Rules

Always think before coding.

Never assume database fields.

Never skip planning.

Never generate partial implementations.

If information is missing:

Ask concise questions before implementation.

If implementation can be improved:

Explain why.

Always optimize for:

* Scalability
* Security
* Maintainability
* Performance
* Readability
* Reusability

Do not generate placeholder code unless explicitly requested.

Every generated feature should be production-ready.
