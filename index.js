const winston = require('winston');
const app = require('express')();
const seedTestAccount = require('./db/seeds/seedTestAccount');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/token')();
require('./startup/validation')();

seedTestAccount();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;