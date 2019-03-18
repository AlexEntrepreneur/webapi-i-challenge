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

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
  .then(data => {
    if (data) {
      res.json(data)
    }
    else {
      res.status('404').json({
        "message": `The user with the specified ID \"${id}\" does not exist.`
      })
    }
  })
  .catch(err => {
    res.status('500').json({
      error: "The user information could not be retrieved."
    });
  });
});

server.listen(3300, () =>
  console.log('Server listening on port 3300')
);
