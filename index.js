const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);