import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sakila',
  password: 'abc12345'
});

export default db;