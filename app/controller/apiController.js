class apiController {
  async home(req, res, next) {
    res.status(200).send("Welcome to the API!");
  }
}
module.exports = new apiController();
