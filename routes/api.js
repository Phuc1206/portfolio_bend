const express = require("express");
const router = express.Router();
const apiController = require("../app/controller/apiController");
router.get("/", apiController.home);
router.post("/login", apiController.login);
module.exports = router;
