// backend/db/connection.js
const mysql = require('mysql2');

const urldb = 'mysql://${{process.env.MYSQLUSER}}:${{process.env.MYSQL_ROOT_PASSWORD}}@${{process.env.RAILWAY_TCP_PROXY_DOMAIN}}:${{process.env.RAILWAY_TCP_PROXY_PORT}}/${{process.env.MYSQL_DATABASE}}'

const db = mysql.createConnection(urldb);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
