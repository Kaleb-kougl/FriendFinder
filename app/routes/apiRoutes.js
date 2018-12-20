var path = require("path");
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "friends_db"
});
 
connection.connect();

module.exports = function(app) {

  app.get("/api", function(req, res) {
    res.json({test: "Hello World api!"});
  });

  app.get("/api/friends", function(req, res) {
    connection.query('SELECT * from profiles', function (error, results, fields) {
      if (error) {
        console.log(error); 
        res.json({'error': error}
      )}
      
      console.log('The solution is: ', results);
      res.json(results);
    });
     
    // connection.end();
    
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body);
  });

}
