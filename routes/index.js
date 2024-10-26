const apiRouter = require("./api");

function route(app) {
  app.use("/", apiRouter);
}
module.exports = route;
