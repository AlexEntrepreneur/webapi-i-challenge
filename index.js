// implement your API here
const express = require('express');
const server = express();
server.use(express.json());
const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send('Nothing to see here... try /api/');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(data => res.status(500).json({
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
      res.status(404).json({
        "message": `The user with the specified ID \"${id}\" does not exist.`
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  });
});

server.post('/api/users', (req, res) => {
  const validBodyProvided = req.body.name && req.body.bio;
  if (validBodyProvided) {
    db.insert(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(error => res.status(500).json({
        error: "There was an error while saving the user to the database"
      }))
  }
  else {
    res.status(404).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
})

server.listen(3300, () =>
  console.log('Server listening on port 3300')
);
