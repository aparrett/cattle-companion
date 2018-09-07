const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config');

module.exports = async function() {
  const db = config.mongoURI;
  mongoose.connect(db, { useNewUrlParser: true }).then(() => winston.info(`Connected to ${db}...`));
}