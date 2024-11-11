const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: "string", required: true },
});

module.exports = mongoose.model("User", User);
