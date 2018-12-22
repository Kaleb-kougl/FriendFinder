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

module.exports = function (app) {

  app.get("/api", function (req, res) {
    res.json({ test: "Hello World api!" });
  });

  app.get("/api/friends", async function (req, res) {
    let dataPromise = await loadProfiles();
    res.json(dataPromise);
  });

  app.post("/api/friends", function (req, res) {
    let scores = req.body.scores.join(',');
    connection.query('INSERT INTO profiles (name, photo, scores) VALUES (?, ?, ?)',
      [req.body.name, req.body.photo, scores],
      async function (error, results) {
        if (error) {
          console.log(error);
          res.json({ 'error': error });
        }
        let profiles = await loadProfiles();
        // console.log(profiles);
        let newFriend = findFriend(profiles, req.body.scores);
        res.json(newFriend);
      });
  });

  async function loadProfiles() {
    let promise1 = new Promise(
      (resolve, reject) => connection.query('SELECT * from profiles', function (error, results, fields) {
        if (error) {
          console.log(error);
          reject({ 'error': error });
        }
        let data = JSON.stringify(results);
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          data[i]['scores'] = data[i].scores.split(',');
        }
        resolve(data);
      })
    );
    return await promise1;
  }

  function findFriend(profileArray, answers) {
    let friend = { "person": "", "difference": Number.MAX_VALUE - 1 }
    for (let i = 0; i < profileArray.length; i++) {
      let currentDifference = 0;
      for (let p = 0; p < profileArray[i].scores.length; p++) {
        let profileScore = parseInt(profileArray[i].scores[p]);
        currentDifference += Math.abs(answers[p] - profileScore);
      }
      if (currentDifference === 0) {
        return profileArray[i];
      } else if (currentDifference < friend.difference) {
        friend.person = profileArray[i];
        friend.difference = currentDifference;
      }
    }
    return friend.person;
  }

}
