const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Database Error");
    console.log(err);
  } else {
    console.log("Database Connected");
    connection.release();
  }
});

module.exports = db;
