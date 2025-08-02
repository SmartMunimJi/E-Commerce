const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

const pool = mysql.createPool({
  host: process.env.DB_HOST || "nozomi.proxy.rlwy.net",
  port: process.env.DB_PORT || 52235,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "xTCxfxxFWEjVgJWgKZirIqCIejkAWEWZ",
  database: process.env.DB_NAME || "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
