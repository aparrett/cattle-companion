const config = require('../config');
const mongoose = require('mongoose');
const seedIncidents = require('./seeds/seedIncidents');

mongoose.connect(config.mongoURI, { useNewUrlParser: true });

seedIncidents().then(() => mongoose.disconnect());
