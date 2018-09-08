const winston = require('winston');

module.exports = function(err, req, res, next){
  console.log('Error: ' + err);
  winston.error(err.message, err);
  res.status(500).send('The server could not be reached. Please try again later.');
}