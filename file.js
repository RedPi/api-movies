const { appendFile, mkdir } = require('fs');
const { join } = require('path');
const { connection } = require('./database.js');
const { format } = require('date-fns');
const destDir = 'movies';

const createMoviesFile = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM movies`, (error, results) => {
      if (error) reject();
      mkdir(destDir, () => {
        const date = format(new Date(), 'ddmmyyyy_Hms');
        const filenameToCreate = join(destDir, `movies_${date}.txt`);
        results.forEach(movie => {
          const movieLine = `${movie.title} - ${movie.year}\n`;
          appendFile(filenameToCreate, movieLine, (err) => { 
            if (err) reject();
            else resolve();
          });
        });
      }); 
    });
  });
}

module.exports = { createMoviesFile };


