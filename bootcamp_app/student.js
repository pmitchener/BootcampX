const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const [, , cohortName, recordLimit] = process.argv;
const values = [`%${cohortName}%`, recordLimit];//store all potentially malicius strings into an array.

const sql = `SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`;
pool.query(sql, values)
.then(res => {
  res.rows.forEach(dbResultSet => {
    console.log(`${dbResultSet.name} has an id of ${dbResultSet.id} and was in the ${dbResultSet.cohort} cohort`);
    });
  })
.catch(err => console.error('query error', err.stack));