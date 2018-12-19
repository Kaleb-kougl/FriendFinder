var express = require('express');
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "inventory"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    //once successfully connected, you may want to query your database for the info you'll need later!
  }
});
