const mongoose = require("mongoose");

const connectMongoDB = async () => {
   await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  try {
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectMongoDB;
