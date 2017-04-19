var connection = require('../connection');
var asyncX = require('async');

function authAdmin() {

  this.getAdminData = function(req, res) {

    var details = {
      general: {}
    };

    if (req.params.code === '3SKUV0') {
      var count = 0;

      function generalQuery(callback) {

        function callbackIfLast() {
          count += 1;
          if (count === 10) { // ! WARNING, MAGIC NUMBER DETECTED :P
            callback(null);
          }
        }

        connection.query('SELECT SUM(invites) AS invites FROM users WHERE id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.invitesSum = result[0].invites;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS userCount FROM users',
          function(err, result) {
            if (err) throw err;
            details.general.userCount = result[0].userCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS guestCount FROM guests WHERE users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.guestCount = result[0].guestCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS babyCount FROM guests WHERE guests.age = "baby" AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.babyCount = result[0].babyCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS childCount FROM guests WHERE guests.age = "child" AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.childCount = result[0].childCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS teenCount FROM guests WHERE guests.age = "teen" AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.teenCount = result[0].teenCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS adultCount FROM guests WHERE guests.age = "adult" AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.adultCount = result[0].adultCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS lactoseCount FROM guests WHERE guests.lactose = true AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.lactoseCount = result[0].lactoseCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS glutenCount FROM guests WHERE guests.gluten = true AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.glutenCount = result[0].glutenCount;
            callbackIfLast();
          }
        );

        connection.query('SELECT COUNT(name) AS allergyCount FROM guests WHERE guests.other_allergy <> "" AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.general.allergyCount = result[0].allergyCount;
            callbackIfLast();
          }
        );
      }

      function usersQuery(callback) {
        connection.query('SELECT * FROM users',
          function(err, result) {
            if (err) throw err;
            details.users = result;
            callback(null);
          }
        );
      }

      function allGuestsQuery(callback) {
        connection.query('SELECT * FROM guests',
          function(err, result) {
            if (err) throw err;
            details.allGuests = result;
            callback(null);
          }
        );
      }

      function guestsQuery(callback) {
        connection.query('SELECT * FROM guests WHERE users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.guests = result;
            callback(null);
          }
        );
      }

      function requestsQuery(callback) {
        connection.query('SELECT name, requests.id, users_id, accepted, text, requested_invites FROM requests, users WHERE users.id = users_id AND users_id IN (SELECT id FROM users WHERE coming <> false OR coming IS NULL)',
          function(err, result) {
            if (err) throw err;
            details.requests = result;
            callback(null);
          }
        );
      }

      function gameQuery(callback) {
        connection.query('SELECT name, game.id, users_id, text FROM game, users WHERE users.id = users_id',
          function(err, result) {
            if (err) throw err;
            details.game = result;
            callback(null);
          }
        );
      }

      function wishesQuery(callback) {
        connection.query('SELECT * FROM wishes',
          function(err, result) {
            if (err) throw err;
            var newResult = result.map(function(wish) {
              wish.accepted = wish.accepted === 1 ? true : false;
              return wish;
            });
            details.wishes = newResult;
            callback(null);
          }
        );
      }

      asyncX.parallel([
        generalQuery,
        usersQuery,
        guestsQuery,
        allGuestsQuery,
        wishesQuery,
        requestsQuery,
        gameQuery
      ], function (err, result) {

        var mergedUsers = details.users.map(function(userItem){
          var guests = [];
          var guestsList = details.allGuests.map(function(guestItem) {
            if (userItem.id === guestItem.users_id) {
              guests.push(guestItem.name)
            }
          });
          userItem.guests = guests;
          return userItem;
        });

        details.users = mergedUsers;
        res.send(details);
      });
    }
  }

  this.addUser = function(req, res) {
    if (req.params.code === '3SKUV0' && req.body.code !== '' && req.body.name !== '') {
      connection.query('INSERT INTO users (code, name, invites) ' 
        + 'VALUES ("' + req.body.code + '","' + req.body.name + '",' + req.body.invites + ');',
        function (err, result) {
            if (err) throw err;
            res.send('User added to database');
        }
      );
    }
  }

  this.deleteUser = function(req, res) {
    if (req.params.code === '3SKUV0' && req.body.code !== '3SKUV0') {
      connection.query('DELETE FROM users  ' 
        + 'WHERE code = "' + req.body.code + '";',
        function (err, result) {
            if (err) throw err;
            res.send('User added to database');
        }
      );
    }
  }

  this.changeUserInvites = function(req, res) {

    connection.query('SELECT invites '
        + 'FROM users WHERE code = "' + req.body.code + '";',
        function (err, result) {
            if (err) throw err;
            if (result[0].invites + Number(req.body.amount) >= 0) { // if it wouldnt go minus
              connection.query('UPDATE users '
                  + 'SET invites = invites + ' + req.body.amount + ' '
                  + 'WHERE code = "' + req.body.code + '";',
                  function (err, result) {
                      if (err) throw err;
                      res.send('set');
                  }
              );
            }
        }
    );
  }

  this.answerRequest = function(req, res) {

    var answer = req.body.answer === 'accept' ? true : false;

    connection.query('UPDATE requests '
        + 'SET accepted = ' + answer + ' '
        + 'WHERE id = "' + req.body.requestId + '";',
        function (err, result) {
            if (err) throw err;
            res.send('set');
        }
    );
  }
}

module.exports = new authAdmin();
