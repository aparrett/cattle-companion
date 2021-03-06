const winston = require('winston');
const app = require('express')();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/token')();
require('./startup/validation')();
require('./startup/cron')();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;