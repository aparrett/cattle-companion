const path = require('path');
const winston = require('winston');
require('express-async-errors');

const dir = 'log';

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: path.join(dir, '/errors.log') }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(winston.transports.File, { filename: path.join(dir, '/info.log') });
}