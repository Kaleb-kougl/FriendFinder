var path = require("path");
var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'my_db'
// });
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();

module.exports = function(app) {

  app.get("/api", function(req, res) {
    res.json({test: "Hello World api!"});
  });

  app.get("/api/friends", function(req, res) {
    res.json({test: "hello friends"});
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body);
  });

}
