const config = require('../config');
const mongoose = require('mongoose');
const seedIncidents = require('./seeds/seedIncidents');
const seedTestAccount = require('./seeds/seedTestAccount');

mongoose.connect(config.mongoURI, { useNewUrlParser: true });
seedIncidents().then(() => mongoose.disconnect());

// Seed Test Account every hour to make sure that any user changes are reset.
setInterval(() => {
  mongoose.connect(config.mongoURI, { useNewUrlParser: true });
  seedTestAccount().then(() => mongoose.disconnect());
}, 30 * 1000);
