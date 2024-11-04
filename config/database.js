const mongoose = require("mongoose");
require("dotenv").config();
const { scheduleImportJob } = require('../jobs/dataImportJob');

exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("DB Connection Successfully");
      scheduleImportJob();
    })
    .catch((err) => {
      console.error("DB Connection Failed", err);
      process.exit(1); 
    });
};
