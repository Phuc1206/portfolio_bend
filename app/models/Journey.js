const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Journey = new Schema({
  year: { type: "string", required: true },
  content: { type: "string", required: true },
  image: { type: "string", required: true },
});

module.exports = mongoose.model("Journey", Journey);
