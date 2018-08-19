const express = require('express');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send({ hello: 'world' });
  });

  if (process.env.NODE_ENV === 'production') {
    // Use express to serve up production assets like main.js and main.css.
    app.use(express.static('client/build'));
  
    // Point all other routes to index.html.
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  app.use(error);
}