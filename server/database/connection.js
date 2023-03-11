// Variables
const mongoose = require('mongoose');

// MongoDB connection
const connectToDB = (MONGODB_URL) => {
     return mongoose.connect(MONGODB_URL).then(() => {
          console.log('CONNECTED TO MONGODB DATABASE SUCCESSFULLY!');
     }).catch((error) => {
          console.log('UNABLE TO CONNECT TO MONGODB DATABASE!');
          console.log(error);
     });
}

// Exports module
module.exports = connectToDB;