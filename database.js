const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootpassword',
  database : 'api-movies'
});

module.exports = { connection };

