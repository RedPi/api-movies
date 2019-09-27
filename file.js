const { appendFile, mkdir } = require('fs');
const { join } = require('path');
const { connection } = require('./database.js');

const destDir = 'monDossier';

const createMoviesFile = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM movies`, (error, results) => {
      if (error) reject();
      mkdir(destDir, () => {
        const filenameToCreate = join(destDir, `movies.txt`);
        results.forEach(movie => {
          appendFile(filenameToCreate, movie, (err) => { 
            if (err) reject();
            else resolve();
          });
        });
      }); 
    });
  });
}

module.exports = { createMoviesFile };


