// backend/db/connection.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.MYSQLHOST, // Use the MYSQLHOST environment variable for the host
  user: process.env.MYSQLUSER, // Use the MYSQLUSER environment variable for the user
  password: process.env.MYSQLPASSWORD, // Use the MYSQLPASSWORD environment variable for the password
  database: process.env.MYSQLDATABASE, // Use the MYSQLDATABASE environment variable for the database name
  port: process.env.MYSQLPORT // Use the MYSQLPORT environment variable for the port
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
