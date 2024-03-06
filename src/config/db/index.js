const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/course-nodejs-poly");
    console.log("Connect successfully");
  } catch (error) {
    console.log("Failed to connect with database", error.message);
  }
}

module.exports = { connect };
