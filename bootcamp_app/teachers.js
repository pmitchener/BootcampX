const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const [, , cohortName] = process.argv;
const values = [`${cohortName}`];//store all potentially malicius strings into an array.

const sql = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1
GROUP by teachers.name, cohorts.name
ORDER BY teachers.name;
`;
pool.query(sql, values)
.then(res => {
  res.rows.forEach(dbResultSet => {
    console.log(`${dbResultSet.cohort}: ${dbResultSet.teacher}`);
    });
  })
.catch(err => console.error('query error', err.stack));