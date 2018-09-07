const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config');
const seedIncidents = require('../db/seeds/seedIncidents');
const seedTestAccount = require('../db/seeds/seedTestAccount');

module.exports = () => {
  const db = config.mongoURI;
  mongoose.connect(db, { useNewUrlParser: true }).then(() => winston.info(`Connected to ${db}...`));
  
  if (process.env.NODE_ENV !== 'test') {
    seedIncidents().then(() => winston.info('Incidents seeded'));
    seedTestAccount().then(() => winston.info('Test Account seeded'));
  }
};