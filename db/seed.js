const config = require('../config');
const mongoose = require('mongoose');
const seedIncidents = require('./seeds/seedIncidents');
const seedTestAccount = require('../db/seeds/seedTestAccount');

mongoose.connect(config.mongoURI, { useNewUrlParser: true });

Promise.all([ seedIncidents(), seedTestAccount() ])
.then(() => mongoose.disconnect());