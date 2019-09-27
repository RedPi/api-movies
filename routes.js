const router = express.Router();
const axios = require('axios');
const { pushFile } = require('./file.js');
const { connection } = require('./database.js');

router.get('/movies', (req, res) => {
  connection.connect();
  connection.query(`SELECT * FROM movies`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movies : results});
  });  
});

router.get('/movie/:id', (req, res) => {
  const { id } = req.params; 
  connection.connect();
  connection.query(`SELECT * FROM movies WHERE id = ${id}`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movie : results[0]});
  });      
});

router.post('/movie', (req, res) => {
  const { title, year } = req.body; 
  connection.connect();
  connection.query(`INSERT INTO movies ('title', 'year' ) VALUES (${title}, ${year})`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ user : results[0]});
  });      
});

router.put('/movie/:id', (req, res) => {
  const { id } = req.params; 
  const { title, year } = req.body; 
  const query = '';
  if (req.body.title) query += `'title' = ${title}`;
  if (req.body.year) query += `'year' = ${year}`;
  connection.connect();
  connection.query(`UPDATE movies SET ${query} WHERE id = ${id}`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movie : results[0]});
  });      
});


router.delete('/movie/:id', (req, res) => {
  const { id } = req.params; 
  connection.connect();
  connection.query(`DELETE FROM movies WHERE id = ${id}`, (error, results) => {
    if (error) res.status(400).json({ error });
    res.status(201).json({ movie : results[0]});
  });      
});


router.get('/moviesFiles', (req, res) => {
  const result = createMoviesFile();
  if (!result) res.status(400).json({ error: 'File not saved' });
  res.status(201).json({ message : 'File saved' });

});

router.get('/search', (req, res) => {
  const ombdHost = 'http://www.omdbapi.com';
  const apiKey = 'ecff1887';
  const url = `${ombdHost}?apikey=${apiKey}&s=${req.query.title}&type=movie&r=json&plot=full`,; 
  axios.get(url)
  .then(response => res.status(400).json({ contenu : response.data}))
  .catch((err) => res.status(201).json({ err }));
});

module.exports = router;