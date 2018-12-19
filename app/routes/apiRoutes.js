var path = require("path");

module.exports = function(app) {

  app.get("/api", function(req, res) {
    res.json({test: "Hello World api!"});
  });

}
