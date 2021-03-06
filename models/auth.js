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

    function isAdminQuery(callback) {
      connection.query('SELECT is_admin FROM users WHERE code = "' + req.params.code + '"',
        function(err, result) {
          if (err) throw err;
          details.userRights = result[0];
          callback(null);
        }
      );
    }

    function guestsQuery(callback) {
      connection.query('SELECT id, name, age, lactose, gluten, other_allergy FROM guests WHERE users_id IN (SELECT id FROM users WHERE code = "' + req.params.code + '")',
        function(err, result) {
          if (err) throw err;
          details.guests = result;
          callback(null);
        }
      );
    }

    function wishesQuery(callback) {
      connection.query('SELECT id, text, signature, accepted FROM wishes WHERE users_id IN (SELECT id FROM users WHERE code = "' + req.params.code + '")',
        function(err, result) {
          if (err) throw err;
          details.wishes = result;
          callback(null);
        }
      );
    }

    function requestsQuery(callback) {
      connection.query('SELECT id, text, requested_invites, accepted FROM requests WHERE users_id IN (SELECT id FROM users WHERE code = "' + req.params.code + '")',
        function(err, result) {
          if (err) throw err;
          details.requests = result;
          callback(null);
        }
      );
    }

    function gameQuery(callback) {
      connection.query('SELECT id, text FROM game WHERE users_id IN (SELECT id FROM users WHERE code = "' + req.params.code + '")',
        function(err, result) {
          if (err) throw err;
          details.questions = result;
          callback(null);
        }
      );
    }

    asyncX.parallel([
      isAdminQuery,
      guestsQuery,
      wishesQuery,
      requestsQuery,
      gameQuery
    ], function (err, result) {
      res.send(details);
    });

  }

  this.insert = function(req, res) {
    connection.query('INSERT INTO users SET ?', req.body,
      function (err, result) {
          if (err) throw err;
          res.send('User added to database with ID: ' + result.insertId);
      }
    );
  }

  this.answerComing = function(req, res) {
    connection.query('UPDATE users '
        + 'SET coming = ' + req.body.answer + ' '
        + 'WHERE code = "' + req.params.code + '";', function (err) {
        if (err) throw err;
    });
    
    res.send(req.body);
  }
}

module.exports = new auth();
