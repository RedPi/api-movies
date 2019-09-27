const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootpassword',
  database : 'server'
});

module.exports = { connection };

