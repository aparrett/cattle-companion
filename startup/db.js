const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config/keys');

module.exports = function() {
  const db = config.mongoURI;
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
}