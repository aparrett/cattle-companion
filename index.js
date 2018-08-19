const winston = require('winston');
const app = require('express')();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/token')();

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));