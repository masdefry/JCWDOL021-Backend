import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jcwdol021_intro',
  password: 'abc12345'
});

export default db;