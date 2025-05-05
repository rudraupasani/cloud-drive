const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rudra:39033903@cloud.iyhgvm2.mongodb.net/?retryWrites=true&w=majority&appName=cloud"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = mongoose;
