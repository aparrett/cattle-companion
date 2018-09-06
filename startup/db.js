const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config');
const seedIncidents = require('../db/seeds/seedIncidents');

module.exports = async function() {
  const db = config.mongoURI;
  mongoose.connect(db, { useNewUrlParser: true }).then(() => winston.info(`Connected to ${db}...`));
  await seedIncidents();
}