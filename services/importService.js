const axios = require('axios');
const csv = require('csv-parser');
const Case = require('../models/case');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'import.log' })
  ],
  format: format.combine(format.timestamp(), format.json()),
});

async function importCSVData(url) {
  try {
    const response = await axios.get(url, { responseType: 'stream' });

    const cases = [];
    response.data.pipe(csv())
      .on('data', (data) => {
        cases.push({
          bankName: data['Bank name'],
          propertyName: data['Property name'],
          city: data['City'],
          borrowerName: data['Borrower name'],
          createdAt: new Date(data['Created At']),
        });
      })
      .on('end', async () => {
        await Case.insertMany(cases);
        logger.info('CSV data imported successfully.');
      });

  } catch (error) {
    logger.error(`Error importing CSV data: ${error.message}`);
  }
}

module.exports = { importCSVData };
