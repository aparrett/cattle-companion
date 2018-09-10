const cron = require('node-cron');
const seedTestAccount = require('../db/seeds/seedTestAccount');

module.exports = function() {
  cron.schedule('0 * * * *', async () => {
    await seedTestAccount();
  });
};
