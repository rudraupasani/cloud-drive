const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(
    process.env.MONGO_DB_URI 
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = mongoose;
