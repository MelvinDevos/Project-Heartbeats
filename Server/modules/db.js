const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!

  console.log("Connectie met MYSQL database succesvol");

  // Use the connection
  // ...

  // When done with the connection, release it.
  connection.release();
  // Don't use the connection here, it has been returned to the pool.
});

module.exports = pool;
