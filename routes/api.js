const express = require("express");
const router = express.Router();
const apiController = require("../app/controller/apiController");
router.get("/", apiController.home);
module.exports = router;
