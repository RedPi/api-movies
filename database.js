const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootpassword',
  database : 'api-movies'
});

connection.connect();

module.exports = { connection };

