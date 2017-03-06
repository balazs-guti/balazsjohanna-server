var connection = require('../connection');
var asyncX = require('async');

function auth() {
  this.login = function(req, res) {
    connection.query('SELECT * FROM users WHERE code = ?', [req.params.code],
      function(err, result) {
        if (err) throw err;
        res.send(result);
      }
    );
  }

  this.getLoginDetails = function(req, res) {

    var details = {};
    console.log(req.params.code);

    function guestsQuery(callback) {
      connection.query('SELECT text FROM guests WHERE users_id IN (SELECT id FROM users WHERE code = "' + req.params.code + '")',
        function(err, result) {
          if (err) throw err;
          console.log(result);
          details.guests = result;
          callback(null);
        }
      );
    }

    function wishQuery(callback) {
      connection.query('SELECT text FROM wishes WHERE users_id IN (SELECT id FROM users WHERE code = "' + req.params.code + '")',
        function(err, result) {
          console.log(result);
          if (err) throw err;
          details.wishes = result;
          callback(null);
        }
      );
    }

    asyncX.parallel([
      guestsQuery,
      wishQuery
    ], function (err, result) {
       console.log(details);
       res.send(details);
    });

  }

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
