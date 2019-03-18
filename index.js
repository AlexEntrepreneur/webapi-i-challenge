// implement your API here
const express = require('express');

const server = express();

server.listen(3300, () =>
  console.log('Server listening on port 3300')
);

server.get('/', (req, res) => {
  res.send('Nothing to see here... try /api/');
});
