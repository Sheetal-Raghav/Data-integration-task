const cron = require('node-cron');
const { importCSVData } = require('../services/importService');
const { GOOGLE_DOCS_CSV_URL } = require('../config');

function scheduleImportJob() {
  cron.schedule('0 10,17 * * *', async () => {
    console.log('Running data import job...');
    await importCSVData(GOOGLE_DOCS_CSV_URL);
  });
}

module.exports = { scheduleImportJob };
