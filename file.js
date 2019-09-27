const { appendFile, mkdir } = require('fs');
const { join } = require('path');
const { connection } = require('./database.js');

const destDir = 'monDossier';

const createMoviesFile = () => {
  connection.connect();
  connection.query(`SELECT * FROM movies`, (error, results) => {
    if (error) res.status(400).json({ error });
    mkdir(destDir, () => {
      const filenameToCreate = join(destDir, `movies.txt`);
      results.forEach(movie => {
        appendFile(filenameToCreate, movie, (err) => { 
          if(err) reject(err);   
        });
      });
    }); 
  });
}

module.exports = { createMoviesFile };


