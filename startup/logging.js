const path = require('path');
const winston = require('winston');
const fs = require('fs');
require('express-async-errors');

const dir = 'log';

module.exports = function() {
  if (!fs.existsSync('log')){
    fs.mkdirSync('log');
  }

  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: path.join(dir, '/errors.log') }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(winston.transports.File, { filename: path.join(dir, '/info.log') });
}