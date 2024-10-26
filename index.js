const express = require("express");
var app = express();
const route = require("./routes");
const db = require("./config/db");
route(app);
db.connect();
app.listen(8000, function () {
  console.log("Started application on port %d", 8000);
});
