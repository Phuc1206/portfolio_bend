require("dotenv").config();
const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

async function connect() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}
module.exports = { connect };
