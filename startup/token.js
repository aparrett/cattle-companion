const config = require('../config/keys');

module.exports = function() {
  if (!config.jwtPrivateKey) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}