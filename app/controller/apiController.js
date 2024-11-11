const User = require("../models/User");
const Project = require("../models/Project");
class apiController {
  async home(req, res, next) {
    const projects = await Project.find().populate("user");
    res.json(projects);
  }
  async login(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const user = new User({
      name,
    });
    await user.save();
    res.status(201).json({ message: "User saved successfully", user });
  }
}
module.exports = new apiController();
