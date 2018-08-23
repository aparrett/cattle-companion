const express = require('express');
const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const farms = require('../routes/farms');

module.exports = function(app) {
  app.use(express.json());

  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/farms', farms);

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