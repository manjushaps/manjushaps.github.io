---
layout: default
title: "Part 2: PostgreSQL with Rust — Database Triggers & Automation (Making the Database Think)"
date: 2025-11-13
author: manjushaps
categories: [Technical, Rust Programming]
tags: [rust, rustlang, postgresql, database, realtimeapp]
---

# 📄 Introduction
*A database becomes truly powerful when it doesn’t just store information — but responds to changes automatically.*

In **Part 1**, the foundation of the Teacher Assistant App’s database was built — with tables for teachers, logins, classes, and students.
That structure was strong, but the system itself remained passive. It could hold data, yet it couldn’t react when something changed.

In an educational institution, that simply isn’t enough.<br>
❓When a teacher records attendance, the student’s attendance percentage should update instantly.<br>
❓When marks are added or corrected, the overall grade should adjust on its own.
Manual recalculations are slow, error-prone, and impossible to scale as the number of students grows.

This part transforms the database into a smart system — powered by **PostgreSQL triggers**.

Here’s what gets added:
- Defining **subjects** for each class
- Storing daily **attendance** records
- Recording **grades** for multiple subjects

And what becomes automatic:
- Updating attendance percentages
- Recomputing overall grade performance
- Generating student and class-level reports in real time

By the end, the database will think for itself — staying accurate, up to date, and fully in sync with the Teacher Assistant App, without a single line of extra logic in Rust.

<div style="background:#ebebeb; border-left:4px solid #999; padding:10px 14px; border-radius:6px; margin-top:10px; line-height:1.6;">
  📝 <strong>Note:</strong> The student names appearing in the examples are the same demo data from Part 1.
</div>

---

## 🔗 Missed Part 1?

**[Level 3 (Part 1): Building the Database Foundation with PostgreSQL](https://manjushaps.github.io/Rust-Series-PostgreSQL/)**

---

## 📚 Subjects Table
To calculate grades later, the database needs to know which subjects are taught. We’ll store them in a separate subjects table so they can be referenced in the grades table.

Each subject will have:

- **subject_id** — unique identifier (auto-generated)
- **subject_name** — name of the subject

### 1️⃣ Create the Subjects Table

```psql
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(50) UNIQUE NOT NULL
);
```

### 2️⃣ Inserting Sample Subjects

```psql
INSERT INTO subjects (subject_name) 
VALUES ('English'),('Language'),('Maths'),('Science'),('Social');
```

### 3️⃣ Verifying the data

Verify the data with:

```psql
SELECT * FROM subjects;
```

***Screenshot***: Creating subjects table, inserting and viewing the values.
<div style="text-align: center;">
<a href="/assets/images/subjects_table.png" target="_blank">
  <img src="/assets/images/subjects_table.png" alt="subjtable" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>
With our subjects now defined, we’re ready to link them to attendance and grade records in the upcoming sections.

---

## 📆 Attendance Table
- Each attendance record will store which student attended class on which day, along with a Present/Absent status.<br>
- The attendance percentage will not be calculated manually — a PostgreSQL Trigger will automatically update it whenever new attendance is recorded.

### 1️⃣ Create the Attendance Table

```psql
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    date DATE NOT NULL,
    status BOOLEAN NOT NULL  -- TRUE = Present, FALSE = Absent
);
```

**Explanation :** 
- `student_id` → links attendance to the correct student.<br>
- `teacher_id`→ records who marked the attendance (useful in multi-teacher systems).<br>
- `status` → is stored as a `boolean (TRUE = Present, FALSE = Absent)` for simplicity.

### 2️⃣ Function to Update Attendance Percentage
Instead of calculating attendance manually, a trigger is used to update the student’s attendance_percentage every time attendance is inserted, updated, or deleted.

```psql
CREATE OR REPLACE FUNCTION update_overall_attendance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE students
    SET attendance_percentage = (
        SELECT 
            (COUNT(*) FILTER (WHERE status = TRUE)::NUMERIC / COUNT(*) * 100)
        FROM attendance
        WHERE student_id = NEW.student_id
    )
    WHERE student_id = NEW.student_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Explanation:** 

| **Code**                                    | **Meaning**                                                                    |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `CREATE OR REPLACE FUNCTION update_overall_attendance()` | Defines a reusable PostgreSQL function named `update_overall_attendance` that will automatically recalculate the student’s overall attendance whenever attendance change.  |
| `RETURNS TRIGGER AS $$`                             | Specifies that this function is a **trigger function**, designed to execute automatically in response to `INSERT`, `UPDATE`, or `DELETE` actions on a table. |
| `BEGIN ... END;`                                    | The main body of the function — where the automatic update logic is written. Everything between these lines executes when the trigger fires.                 |
| `UPDATE students`                       | Updates the corresponding row in the `students` table.                     |
| `attendance_percentage = (...)`         | Assigns a newly calculated attendance percentage value.                    |
| `COUNT(*) FILTER (WHERE status = TRUE)` | Counts the number of days the student was marked **present**.              |
| `COUNT(*)`                              | Counts the **total** attendance records for the student.                   |
| `(present / total * 100)`               | Converts the attendance ratio into a percentage.                           |
| `WHERE student_id = NEW.student_id`     | Ensures the calculation affects **only** the student whose record changed. |
| `RETURN NEW;`                           | Allows the INSERT/UPDATE operation to proceed normally.                    |
| `$$ LANGUAGE plpgsql;`                              | Specifies that this function uses PostgreSQL’s **PL/pgSQL** procedural language.                                                                             |

### 3️⃣ Trigger Event for the Function
The trigger ensures that the attendance percentage calculation runs automatically whenever attendance changes.

```psql
CREATE TRIGGER trg_update_attendance
AFTER INSERT OR UPDATE OR DELETE ON attendance
FOR EACH ROW
EXECUTE FUNCTION update_overall_attendance();
```

**Explanation:** 

| **Code**                                         | **Meaning**                                                       |
| ---------------------------------------------- | ------------------------------------------------------------- |
| `CREATE TRIGGER trg_update_attendance`                  | Creates a trigger named `trg_update_attendance` that will automatically call the function defined above.                                                         |
| `AFTER INSERT OR UPDATE OR DELETE`             | The function runs whenever attendance **changes in any way**. |
| `ON attendance`                                | The trigger watches the **attendance** table.                 |
| `FOR EACH ROW`                                 | It runs once per affected record — efficient and precise.     |
| `EXECUTE FUNCTION update_overall_attendance()` | Run the function we just wrote.                               |

> **Note:** <br>
>
> In real usage, teachers will typically **insert** attendance once per day and **update** it if corrections are needed. The `DELETE` option is included only to maintain data integrity in case an incorrect entry needs to be removed.

### 4️⃣ Insert Sample Attendance Records
Attendance is recorded for 8 students across 3 days (TRUE = Present, FALSE = Absent).

```psql
INSERT INTO attendance (student_id, teacher_id, date, status)
VALUES
-- Day 1
(1, 1, '2025-10-10', TRUE),(2, 1, '2025-10-10', TRUE),(3, 1, '2025-10-10', FALSE),(4, 1, '2025-10-10', TRUE),(5, 2, '2025-10-10', TRUE),(6, 2, '2025-10-10', FALSE),(7, 2, '2025-10-10', TRUE),(8, 2, '2025-10-10', TRUE),

-- Day 2
(1, 1, '2025-10-11', TRUE),(2, 1, '2025-10-11', FALSE),(3, 1, '2025-10-11', TRUE),(4, 1, '2025-10-11', TRUE),(5, 2, '2025-10-11', TRUE),(6, 2, '2025-10-11', TRUE),(7, 2, '2025-10-11', FALSE),(8, 2, '2025-10-11', TRUE),

-- Day 3
(1, 1, '2025-10-12', TRUE),(2, 1, '2025-10-12', TRUE),(3, 1, '2025-10-12', TRUE),(4, 1, '2025-10-12', FALSE),(5, 2, '2025-10-12', TRUE),(6, 2, '2025-10-12', TRUE),(7, 2, '2025-10-12', TRUE),(8, 2, '2025-10-12', TRUE);
```

### 5️⃣ Verify Attendance Records
Verify the data with:

```psql
SELECT student_name, attendance_percentage
FROM students
WHERE student_id = 5;
```

***Screenshot***: Attendance table and trigger function created successfully.
<div style="text-align: center;">
<a href="/assets/images/attendance_fn.png" target="_blank">
  <img src="/assets/images/attendance_fn.png" alt="att_fn" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

<br>
***Screenshot***: Trigger applied and attendance records inserted and verified.
<div style="text-align: center;">
<a href="/assets/images/attendance_trg.png" target="_blank">
  <img src="/assets/images/attendance_trg.png" alt="att_trg" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 6️⃣ Updating Attendance (Trigger Test)
Let's update attendance for `student_id = 5` and `date = 2025-10-11`, to check if attendance trigger works.

```psql
UPDATE attendance
SET status = FALSE
WHERE student_id = 5 AND date = '2025-10-11';
```

**Before Update (Reference)** <br>
The following screenshot shows the attendance status of `student_id = 5` before making any changes.
At this point, the attendance percentage is `100.0`.

***Screenshot***: Before updating attendance - Student attendance percentage at 100%.
<div style="text-align: center;">
<a href="/assets/images/att_before.png" target="_blank">
  <img src="/assets/images/att_before.png" alt="att_before" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>

**After Update** <br>
Now, the attendance status is changed to `FALSE` for `student_id = 5`.
The trigger automatically recalculates the attendance percentage, as shown in the screenshot below.

***Screenshot***: After updating attendance: Percentage recalculated automatically via trigger.
<div style="text-align: center;">
<a href="/assets/images/att_after.png" target="_blank">
  <img src="/assets/images/att_after.png" alt="att_after" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>
With attendance now updating automatically, the system maintains accurate attendance percentages in real time. Next, we’ll enable the same level of automation for grades.

---

## 📋 Grades Table
- This table records marks for each subject, while a trigger automatically updates the student’s overall grade percentage whenever marks change.<br>
- Each record links a student to a subject and their marks obtained, ensuring that the student’s overall performance always reflects the latest updates — no manual recalculation required.

### 1️⃣ Create the Grades Table

```psql
CREATE TABLE grades (
    grade_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE,
    marks_obtained NUMERIC(5,2) CHECK (marks_obtained >= 0 AND marks_obtained <= 100)
);
```

**Explanation :**<br>
- `grade_id` → Unique identifier for each grade record.<br>
- `student_id` → Links the grade to a student in the students table.<br>
- `subject_id` → References the subjects table to map which subject the marks belong to.<br>
- `marks_obtained` → Stores marks (0–100 range), validated by the CHECK constraint.

### 2️⃣ Function to Update Grade Percentage
Whenever marks are added, updated, or deleted, the overall grade percentage in the students table should update automatically.

```psql
CREATE OR REPLACE FUNCTION update_overall_grade()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE students
    SET overall_grade_percentage = (
        SELECT AVG(marks_obtained)
        FROM grades
        WHERE student_id = NEW.student_id
    )
    WHERE student_id = NEW.student_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Explanation:**

| **Code**                                  | **Meaning**                                                                                                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CREATE OR REPLACE FUNCTION update_overall_grade()` | Defines a reusable PostgreSQL function named `update_overall_grade` that will automatically recalculate the student’s overall grade whenever grades change.  |
| `RETURNS TRIGGER AS $$`                             | Specifies that this function is a **trigger function**, designed to execute automatically in response to `INSERT`, `UPDATE`, or `DELETE` actions on a table. |
| `BEGIN ... END;`                                    | The main body of the function — where the automatic update logic is written. Everything between these lines executes when the trigger fires.                 |
| `UPDATE students`                                   | Specifies that the function will update records inside the `students` table.                                                                                 |
| `SET overall_grade_percentage = (`                  | Defines which column to update — here it recalculates and sets the `overall_grade_percentage`.                                                               |
| `SELECT AVG(marks_obtained)`                        | A subquery that calculates the **average marks** from the `grades` table for the student whose record was just added, modified, or deleted.                  |
| `FROM grades WHERE student_id = NEW.student_id`     | Filters the marks only for the affected student. `NEW.student_id` refers to the student involved in the trigger action.                                      |
| `WHERE student_id = NEW.student_id;`                | Ensures that only the corresponding student’s record in the `students` table is updated.                                                                     |
| `RETURN NEW;`                                       | Returns the modified row so the database knows the trigger executed successfully.                                                                            |
| `$$ LANGUAGE plpgsql;`                              | Specifies that this function uses PostgreSQL’s **PL/pgSQL** procedural language.                                                                             |

### 3️⃣ Trigger Event for the Function
The trigger ensures that the grade percentage calculation runs automatically whenever grade changes.

```psql
CREATE TRIGGER trg_update_grades
AFTER INSERT OR UPDATE OR DELETE ON grades
FOR EACH ROW
EXECUTE FUNCTION update_overall_grade();
```

**Explanation:**

| **Code**                                         | **Meaning**                                                       |
| ---------------------------------------------- | ------------------------------------------------------------- |
| `CREATE TRIGGER trg_update_grades`                  | Creates a trigger named `trg_update_grades` that will automatically call the function defined above.                                                         |
| `AFTER INSERT OR UPDATE OR DELETE ON grades`        | Defines **when** the trigger activates — after any `INSERT`, `UPDATE`, or `DELETE` action in the `grades` table.                                             |
| `FOR EACH ROW`                                      | Ensures the function runs once for every individual record that changes (not just once per query).                                                           |
| `EXECUTE FUNCTION update_overall_grade();`          | Connects the trigger to the function, making it execute automatically after every change in the `grades` table.                                              |

### 4️⃣ Insert Sample Grades
Grades are updated for 8 students and 5 subjects = 40 entries.

```psql
INSERT INTO grades (student_id, subject_id, marks_obtained)
VALUES
-- Rahul (10A01)
(1, 1, 85), (1, 2, 90), (1, 3, 88), (1, 4, 92), (1, 5, 95),

-- Sneha (10A02)
(2, 1, 75), (2, 2, 80), (2, 3, 78), (2, 4, 85), (2, 5, 82),

-- Arjun (10A03)
(3, 1, 65), (3, 2, 70), (3, 3, 72), (3, 4, 68), (3, 5, 75),

-- Meera (10A04)
(4, 1, 90), (4, 2, 88), (4, 3, 85), (4, 4, 92), (4, 5, 89),

-- Karthik (10B01)
(5, 1, 80), (5, 2, 84), (5, 3, 82), (5, 4, 85), (5, 5, 88),

-- Divya (10B02)
(6, 1, 88), (6, 2, 92), (6, 3, 90), (6, 4, 85), (6, 5, 94),

-- Ajay (10B03)
(7, 1, 60), (7, 2, 65), (7, 3, 70), (7, 4, 68), (7, 5, 72),

-- Lakshmi (10B04)
(8, 1, 78), (8, 2, 82), (8, 3, 80), (8, 4, 86), (8, 5, 84);
```

> 📝 **Note:** 
>
>- The sample marks above include students from both sections (10-A and 10-B).
>
>- This is purely for demonstration — to show how triggers work across all students. 
>
>- In the actual Rust application, each teacher will manage marks only for their assigned class and section.

### 5️⃣ Verify Grades Data
Verify the data with:

```psql
SELECT student_id, student_name, overall_grade_percent
FROM students
WHERE student_id = 4;
```

***Screenshot***: Grades table, trigger function, and trigger event created successfully.
<div style="text-align: center;">
<a href="/assets/images/grades_fn_trg.png" target="_blank">
  <img src="/assets/images/grades_fn_trg.png" alt="grades_fn" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

<br>
***Screenshot***: Grades inserted and verified successfully.
<div style="text-align: center;">
<a href="/assets/images/grades_insert.png" target="_blank">
  <img src="/assets/images/grades_insert.png" alt="grades_ins" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 6️⃣ Updating Grades (Trigger Test)
To verify the trigger, update the mark for `student_id = 4` and observe how the overall grade recalculates automatically.

```psql
UPDATE grades
SET marks_obtained = 100
WHERE student_id = 4 AND subject_id = 2;
```

**Before Update (Reference)** <br>
The following screenshot shows the marks of `student_id = 4` before making any changes.
At this point, the overall grades percentage is `88.80`.

***Screenshot***: Marks before update (subject_id = 2).
<div style="text-align: center;">
<a href="/assets/images/grades_bef.png" target="_blank">
  <img src="/assets/images/grades_bef.png" alt="gr_before" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>

**After Update** <br>
Now, the mark for `student_id = 4` and for `subject_id = 2` is changed to 100.
The trigger automatically recalculates the overall grade percentage, as shown in the screenshot below.

***Screenshot***: After update — overall grade percentage recalculated automatically via trigger.
<div style="text-align: center;">
<a href="/assets/images/grades_aft.png" target="_blank">
  <img src="/assets/images/grades_aft.png" alt="gr_after" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>
With both attendance and grades now updating automatically, our database no longer just stores data — it maintains accuracy in real time.

Next, we’ll extend this intelligence to generate student and class-level reports — fully dynamic, always up to date, and completely hands-free.

---

## 📊 Reports Table
The Reports table serves as a single source of truth for each student’s overall performance — combining both their attendance percentage and overall grade. In this we'll: 
- Create a Reports table to hold summary data for every student.
- Add a trigger that updates the report automatically whenever attendance or grades change.

### 1️⃣ Create the Reports Table

```psql
CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    overall_attendance NUMERIC(5,2),
    overall_grade NUMERIC(5,2),
    generated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Explanation :**<br>
- `report_id` → Unique identifier for each report entry.<br>
- `student_id` → Links each report to a student in the students table.<br>
- `overall_attendance` → Stores the student’s attendance percentage.<br>
- `overall_grade` → Stores the overall grade percentage.<br>
- `generated_on` → Automatically records when the report was last generated.

### 2️⃣ Adding a Unique Constraint
After creating the reports table, we add a unique constraint on the student_id column:

```psql
ALTER TABLE reports ADD CONSTRAINT unique_student UNIQUE (student_id);
```

**Why this is important:** <br>
- By default, PostgreSQL allows multiple rows with the same **`student_id`**. However, in our case, each student should have only one report record — which should update automatically whenever their attendance or grades change.<br>
- The **`ON CONFLICT (student_id)`** clause in the trigger function relies on this constraint to decide whether to insert or update a record. <br>
- It ensures that instead of inserting duplicate rows, PostgreSQL will update the existing report for that student.

### 3️⃣ Function to View Student Report
Whenever a student’s attendance or overall grade changes, we want the Reports table to refresh automatically — without manual triggers or recalculation. This is achieved through the `update_reports()` function and its trigger.

```psql
CREATE OR REPLACE FUNCTION update_reports()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO reports (student_id, overall_attendance, overall_grade, generated_on)
    VALUES (
        NEW.student_id,
        (SELECT attendance_percentage FROM students WHERE student_id = NEW.student_id),
        (SELECT overall_grade_percentage FROM students WHERE student_id = NEW.student_id),
        CURRENT_TIMESTAMP
    )
    ON CONFLICT (student_id) DO UPDATE
    SET overall_attendance = EXCLUDED.overall_attendance,
        overall_grade = EXCLUDED.overall_grade,
        generated_on = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Explanation:**

| **Code**                                                                                    | **Meaning**                                                                                                     |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `INSERT INTO reports (...) VALUES (...)`                                                       | Inserts a new record for the student when their data changes.                                                   |
| `NEW.student_id`                                                                               | Refers to the student whose record was just updated in the `students` table.                                    |
| `(SELECT attendance_percentage FROM students WHERE student_id = NEW.student_id)`               | Fetches the latest attendance percentage from `students`.                                                       |
| `(SELECT overall_grade_percentage FROM students WHERE student_id = NEW.student_id)`            | Fetches the latest grade percentage from `students`.                                                            |
| `ON CONFLICT (student_id) DO UPDATE`                                                           | Ensures that if the student already exists in the `reports` table, the record is updated instead of duplicated. |
| `SET overall_attendance = EXCLUDED.overall_attendance, overall_grade = EXCLUDED.overall_grade` | Replaces the old values with the new ones.                                                                      |
| `generated_on = CURRENT_TIMESTAMP`                                                             | Updates the timestamp every time the report refreshes.                                                          |
| `RETURN NEW;`                                                                                  | Ensures the trigger completes successfully.                                                                     |

### 4️⃣ Trigger Event for the update_reports()

```psql
CREATE TRIGGER trg_update_reports
AFTER UPDATE OF attendance_percentage, overall_grade_percentage ON students
FOR EACH ROW
EXECUTE FUNCTION update_reports();
```

**Explanation:**

| **Code**                                                              | **Meaning**                                                                          |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `AFTER UPDATE OF attendance_percentage, overall_grade_percentage` | The trigger fires whenever a student’s attendance or grade percentage is updated. |
| `FOR EACH ROW`                                                    | Executes once for every updated student record.                                   |
| `EXECUTE FUNCTION update_reports()`                               | Calls the function to insert or refresh that student’s report entry.              |

<div style="background:#fff3cd; border-left:4px solid #ffca28; padding:12px 18px; border-radius:8px; margin:20px 0; line-height:1.6;">
  <strong>💡 Note — Populating the Reports Table Initially</strong><br><br>
  - Since the Reports trigger was created after the Attendance and Grades tables, existing student data won’t appear automatically in the Reports table.<br><br>
  - To populate it, perform a one-time update to activate the trigger for each student:<br>
  <div style="background:#f5f5f5; border-radius:6px; padding:10px 14px; margin:6px 0;">
    <pre style="margin:0;"><code>UPDATE students
SET attendance_percentage = attendance_percentage,
overall_grade_percentage = overall_grade_percentage;
    </code></pre>
  </div>
  - This “dummy update” doesn’t modify any data — it simply fires the trigger for all students and fills the Reports table with the latest data.<br><br>
  - Finally, verify the entries using:<br>
  <div style="background:#f5f5f5; border-radius:6px; padding:10px 14px; margin:6px 0;">
    <pre style="margin:0;"><code>SELECT * FROM reports;</code></pre>
  </div>
</div><br>

***Screenshot***: Reports table, trigger function, and trigger event created successfully.
<div style="text-align: center;">
<a href="/assets/images/reports_table_fn.png" target="_blank">
  <img src="/assets/images/reports_table_fn.png" alt="reports_fn" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div><br>

***Screenshot***: Reports table after initial update — records generated automatically.
<div style="text-align: center;">
<a href="/assets/images/reports_aft_update.png" target="_blank">
  <img src="/assets/images/reports_aft_update.png" alt="rep_after" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>
In the next section, we’ll extend this intelligence further to class-level reports, making the entire system dynamic, insightful, and completely hands-free.

---

## Class Report View
Instead of running multiple queries, create a database view that brings together each class’s students, their attendance percentage, and overall grade — all in one place.

```psql
CREATE OR REPLACE VIEW class_report AS
SELECT
    c.class_name,
    c.section,
    s.roll_no,
    s.student_name,
    s.attendance_percentage AS attendance_percent,
    s.overall_grade_percentage AS grade_percent
FROM
    students s
    JOIN classes c ON s.class_id = c.class_id
ORDER BY
    c.class_name, c.section, s.roll_no;
```

**Explanation:**

| **Code**                                            | **Meaning**                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| `CREATE OR REPLACE VIEW class_report AS`        | Creates a *virtual table* that combines student and class details. |
| `JOIN classes c ON s.class_id = c.class_id`     | Connects each student to their class name and section.             |
| `s.attendance_percentage AS attendance_percent` | Displays each student’s updated attendance percentage.             |
| `s.overall_grade_percentage AS grade_percent`   | Displays the computed overall grade for the student.               |
| `ORDER BY c.class_name, c.section, s.roll_no`   | Sorts the report so results appear in class and roll order.        |

### Viewing the Report
To view the report class-wise, simply run:

**For Section - 'A':** 
```psql
SELECT * FROM class_report WHERE class_name = '10' AND section = 'A';
```

**For Section - 'B':**
```psql
SELECT * FROM class_report WHERE class_name = '10' AND section = 'B';
```

***Screenshot***: Class-wise report for both sections (10-A and 10-B).
<div style="text-align: center;">
<a href="/assets/images/class_report_view.png" target="_blank">
  <img src="/assets/images/class_report_view.png" alt="rep_after" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>
<br>
With this view, teachers and administrators can instantly see every student’s attendance and grades — organized by class and always up to date, thanks to the triggers and automation built earlier.

---

# Conclusion
✨Congratulations — the PostgreSQL setup has now evolved into a **thinking database** that updates itself automatically.  <br>
Using triggers, we built logic that:<br>
- Calculates attendance and grades in real time<br>
- Keeps reports accurate without manual updates<br>
- Generates class-level summaries instantly<br>

With this, our Teacher Assistant App’s database is now intelligent, self-sustaining, and ready for expansion.

---
## 🔜 Next on Techn0tz

Coming up next — a deep dive into how Rust is powering the technologies of the future.

***Stay Tuned on Techn0tz!!***