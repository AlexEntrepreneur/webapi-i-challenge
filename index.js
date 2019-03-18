// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send('Nothing to see here... try /api/');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(data => res.status('500').json({
      "error": "The users information could not be retrieved."
    }));
});

server.listen(3300, () =>
  console.log('Server listening on port 3300')
);
