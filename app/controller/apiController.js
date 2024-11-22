const User = require("../models/User");
const Project = require("../models/Project");
const Journey = require("../models/Journey");
class apiController {
  async getProjects(req, res, next) {
    const projects = await Project.find();
    res.json(projects);
  }
  async getJourneys(req, res, next) {
    try {
      const journeys = await Journey.find(); // Lấy tất cả các Journey từ DB
      res.status(200).json(journeys);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch journeys." });
    }
  }
  async createProject(req, res, next) {
    const { name, role, description, techStack, link_github, link_live } =
      req.body;
    const images = req.files.map((file) => `/img/${file.filename}`);
    try {
      const newProject = new Project({
        name,
        role,
        description,
        techStack,
        images,
        link_github,
        link_live,
      });

      await newProject.save();
      res.status(200).json({ message: "Project created successfully!" });
    } catch (err) {
      res.status(400).json({ message: "Error creating project", error: err });
    }
  }
  async login(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    let user = await User.findOne({ name });
    if (user) {
      // Nếu tên đã tồn tại, trả về thành công
      return res.status(200).json({ message: "User already exists", user });
    }
    user = new User({ name });
    await user.save();

    res.status(201).json({ message: "User saved successfully", user });
  }
  async createComment(req, res, next) {
    const { projectId } = req.params;
    const { user, content } = req.body;
    if (!user || !content) {
      return res.status(400).json({ error: "User and content are required" });
    }
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      project.comments.push({ user, content });
      await project.save();
      res
        .status(200)
        .json({ message: "Comment created successfully!", project });
    } catch (err) {
      res.status(400).json({ message: "Error creating comment", error: err });
    }
  }
  async like(req, res, next) {
    const { projectId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const index = project.like_count.indexOf(userId);
      if (index === -1) {
        project.like_count.push(userId);
      } else {
        project.like_count.splice(index, 1);
      }
      await project.save();
      return res.status(200).json({
        message: "like status updated successfully",
        likeCount: project.like_count.length,
        liked: index === -1,
      });
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
  async createJourney(req, res, next) {
    const { year, content } = req.body;
    const imagePath = req.file ? `/img/${req.file.filename}` : null;

    if (!year || !content || !imagePath) {
      return res
        .status(400)
        .json({ error: "Year, Content, and Image are required." });
    }
    try {
      const newJourney = new Journey({
        year,
        content,
        image: imagePath,
      });

      await newJourney.save(); // Lưu journey vào MongoDB

      return res.status(201).json({
        message: "Journey created successfully",
        journey: newJourney,
      });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while creating the Journey.",
        details: error.message,
      });
    }
  }
}
module.exports = new apiController();
