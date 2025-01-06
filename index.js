const express = require("express");
var app = express();
require("dotenv").config();
const route = require("./routes");
const cors = require("cors");
const db = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/img", express.static("public/img"));
route(app);
db.connect();
app.listen(8000, function () {
  console.log("Started application on port %d", 8000);
});
