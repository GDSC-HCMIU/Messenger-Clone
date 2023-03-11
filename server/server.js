// Variables
const express = require('express');
const router = require('./routers/route');
const connectToDB = require('./database/connection');
const PORT=5454
require('dotenv').config();
const server = express();

// Middleware
server.use(express.json());

// Router
server.use('/messenger-clone/api/user', router);

// Server start
const start = async (req, res) => {
     try {
          // Database connection
          await connectToDB(process.env.MONGODB_URL);
          // Server start listening
          server.listen(
               PORT,
               console.log(`SERVER STARTS LISTENING ON PORT ${PORT}...`)
          )
     } catch(error) {
          console.log(error);
     }
};

start();