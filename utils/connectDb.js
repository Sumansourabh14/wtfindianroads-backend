const mongoose = require("mongoose");

let carsDbConnection; // Store Cars DB connection

const connectDb = async (MAIN_DB_URI, CARS_DB_URI) => {
  try {
    const mainConn = await mongoose.connect(MAIN_DB_URI);
    console.log("✅ Connected to DB: " + mainConn.connection.host);

    // Create a separate connection for the Cars Database
    carsDbConnection = mongoose.createConnection(CARS_DB_URI);
    console.log("✅ Connected to Caars DB");
  } catch (error) {
    console.log("Database connection error: ", error);
    process.exit(1);
  }
};

// Get the separate Cars DB connection
const getCarsDbConnection = () => {
  if (!carsDbConnection) {
    throw new Error("Cars DB not connected. Call connectDb() first.");
  }
  return carsDbConnection;
};

module.exports = { connectDb, getCarsDbConnection };
