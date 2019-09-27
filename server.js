const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const server = express();
const port = 3000;

server.use(bodyParser.json());
server.use(cors());

server.use(routes);
server.listen(port, () => {
    console.log(`Node Server is running on port ${port} 🚀`);
});
