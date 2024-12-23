const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db " + conn.connection.host);
  } catch (error) {
    console.log("Db connection error: ", error);
  }
};

module.exports = connectDb;
