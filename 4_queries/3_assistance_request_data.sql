SELECT teachers.name AS teacher, students.name AS student, assignments.name AS assignment, 
SUM(assistance_requests.completed_at - assistance_requests.started_at) AS duration
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN assignments ON assignments.id = assistance_requests.assignment_id
GROUP BY teachers.name, students.name, assignments.name
ORDER BY duration;