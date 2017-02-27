var connection = require('../connection');

function auth() {
  this.insert = function(req, res) {
    console.log(req.body);
    connection.query('INSERT INTO users SET ?', req.body,
      function (err, result) {
          if (err) throw err;
          res.send('User added to database with ID: ' + result.insertId);
      }
    );
  }
}

module.exports = new auth();
