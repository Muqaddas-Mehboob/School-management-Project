# School-management-Project (PHP & XAMPP)

## 1. Project Overview
This is a **School Management System** built with **PHP** and **MySQL**.  
It allows admin to manage students, teachers, classes, and more.

**Technologies used:**
- PHP  
- MySQL  
- XAMPP (Apache + MySQL)  
- HTML, CSS (optional: Bootstrap) (To be decided later)

## 2. Prerequisites
Before running the project, make sure you have:
1. **XAMPP** installed  
2. **PHP** and **MySQL** running (through XAMPP Control Panel)  
3. A web browser (Chrome, Edge, etc.)

## 3. Setup Steps

### Step 1 – Start XAMPP
1. Open **XAMPP Control Panel**  
2. Start **Apache** and **MySQL**

### Step 2 – Place Project in `htdocs`
1. Navigate to the directory where your xammp is installed. In my pc, it is in C drive.

```bash
C:\xampp\htdocs\ 
```

2. Go to htdocs folder, and run this command:

```bash
git clone https://github.com/Muqaddas-Mehboob/School-management-Project.git
cd School-management-Project
```

3. Open you VS code or IDE and look carefully the file structure.

4. Then in browser, write this:

(FOR ROOT INDEX.PHP)
```bash
http://localhost/School-management-Project/
```

(FOR FRONTEND FOLDER)
```bash
cd frontend
```
- Install node modules

```bash
npm i
```

- Run the frontend app

```bash
npm run dev
```

- Your frontend page will display "Welcome to school Managament Project"

(FOR BACKEND FOLDER)
```bash
http://localhost/School-management-Project/backend/index.html
```

(FOR CHECKING DATABASE CONNECTION)
```bash
http://localhost/School-management-Project/backend/test_connection.php
```