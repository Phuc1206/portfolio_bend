const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Project = new Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  link_github: { type: String },
  link_live: { type: String },
  like_count: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = mongoose.model("Project", Project);
