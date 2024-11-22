const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  user: { type: String, required: true }, // Tên người bình luận
  content: { type: String, required: true }, // Nội dung bình luận
  createdAt: { type: Date, default: Date.now }, // Thời gian bình luận
});
const Project = new Schema({
  name: { type: String },
  role: { type: String },
  description: { type: String },
  images: { type: [String] },
  techStack: { type: [String] },
  link_github: { type: String },
  link_live: { type: String },
  comments: [CommentSchema],
  like_count: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = mongoose.model("Project", Project);
