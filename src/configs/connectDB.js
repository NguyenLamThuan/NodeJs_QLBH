import mysql from 'mysql2/promise';

// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsqlbh'
});

export default pool;