const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionConfig = process.env.MYSQL_URL || process.env.DATABASE_URL ? {
  uri: process.env.MYSQL_URL || process.env.DATABASE_URL
} : {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'restaurantpos'
};

const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.MYSQL_URL || process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined
});

// Test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database: ' + (process.env.DB_NAME || 'restaurantpos'));
    connection.release();
  } catch (err) {
    console.error('Database connection failed: ' + err.message);
  }
})();

module.exports = pool;
