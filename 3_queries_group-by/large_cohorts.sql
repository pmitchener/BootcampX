SELECT cohorts.name AS cohort_name, COUNT(students.name) AS student_count
FROM cohorts
JOIN students ON students.cohort_id = cohorts.id
GROUP BY cohorts.name
HAVING count(students.name) >= 18
ORDER BY student_count ASC;