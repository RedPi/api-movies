
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { createMoviesFile } = require('./file.js');
const { connection } = require('./database.js');

router.get('/movies', (req, res) => {
  connection.query(`SELECT * FROM movies`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movies : results});
  });  
});

router.get('/movie/:id', (req, res) => {
  const { id } = req.params; 
  connection.query(`SELECT * FROM movies WHERE id = ${id}`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movie : results[0]});
  });      
});

router.post('/movie', (req, res) => {
  const { title, year } = req.body; 
  connection.query(`INSERT INTO movies (title, year) VALUES ( "${title}", "${year}")`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movie : { id: results[0].insertId, title , year }});
  });      
});

router.put('/movie/:id', (req, res) => {
  const { id } = req.params; 
  const { title, year } = req.body; 
  let queryTitle = '';
  let queryYear = '';
  if (req.body.title) queryTitle = `title = "${title}"`;
  if (req.body.year) queryYear = `year = "${year}"`;
  connection.query(`UPDATE movies SET ${queryTitle} ${queryYear} WHERE id = ${id}`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ message: `Movie ${id} updated`});
  });      
});


router.delete('/movie/:id', (req, res) => {
  const { id } = req.params; 
  connection.query(`DELETE FROM movies WHERE id = ${id}`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ message: `Movie ${id} deleted`});
  });      
});


router.get('/moviesFiles', (req, res) => {
   createMoviesFile()
    .then(() => res.status(201).json({ message : 'File saved' }))
    .catch(err => res.status(400).json({ error: 'File not saved' }));
});

router.get('/search', (req, res) => {
  const ombdHost = 'http://www.omdbapi.com';
  const apiKey = 'ecff1887';
  const url = `${ombdHost}?apikey=${apiKey}&s=${req.query.title}&type=movie&r=json&plot=full`; 
  axios.get(url)
  .then(response => res.status(400).json({ contenu : response.data}))
  .catch((err) => res.status(201).json({ err }));
});

module.exports = router;