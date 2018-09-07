const cron = require('node-cron');
const mongoose = require('mongoose');
const config = require('../config/')
const seedTestAccount = require('../db/seeds/seedTestAccount');

module.exports = function() {
  cron.schedule('* * * * *', () => {
    mongoose.connect(config.mongoURI, { useNewUrlParser: true });
    seedTestAccount().then(() => mongoose.disconnect());
  });
};
