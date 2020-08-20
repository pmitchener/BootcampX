const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const [, , cohortName, recordLimit] = process.argv;

pool.query(`
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${cohortName}%'
LIMIT ${recordLimit};
`)
.then(res => {
  res.rows.forEach(dbResultSet => {
    console.log(`${dbResultSet.name} has an id of ${dbResultSet.id} and was in the ${dbResultSet.cohort} cohort`);
    });
  })
.catch(err => console.error('query error', err.stack));