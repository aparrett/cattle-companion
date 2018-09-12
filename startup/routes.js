const express = require('express');
const compression = require('compression');
const path = require('path');

const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const farms = require('../routes/farms');
const me = require('../routes/me');
const cattle = require('../routes/cattle');
const incidents = require('../routes/incidents');

module.exports = function(app) {
  app.use(compression());
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/me', me);
  app.use('/api/farms', farms);
  app.use('/api/cattle', cattle);
  app.use('/api/incidents', incidents);

  if (process.env.NODE_ENV === 'production') {
    // Use express to serve up production assets like main.js and main.css.
    app.use(express.static('client/build'));
  
    // Point all other routes to index.html.
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
  }

  app.use(error);
}