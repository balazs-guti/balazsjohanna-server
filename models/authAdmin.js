var connection = require('../connection');
var asyncX = require('async');
var _ = require('lodash-node');

function authAdmin() {

  this.getAdminData = function(req, res) {

    var details = {};

    if (req.params.code === '3SKUV0') {
      console.log(req.params.code);

      function generalQuery(callback) {
        connection.query('SUM (invites) FROM users',
          function(err, result) {
            if (err) throw err;
            details.general.invitesSum = result;
            callback(null);
          }
        );

        connection.query('COUNT (*) FROM users',
          function(err, result) {
            if (err) throw err;
            details.general.usersCount = result;
            callback(null);
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

      function guestsQuery(callback) {
        connection.query('SELECT * FROM guests',
          function(err, result) {
            if (err) throw err;
            details.guests = result;
            callback(null);
          }
        );
      }

      function wishesQuery(callback) {
        connection.query('SELECT * FROM wishes',
          function(err, result) {
            if (err) throw err;
            console.log(result);
            var newResult = result.map(function(wish) {
              wish.accepted = wish.accepted === 1 ? true : false;
              return wish;
            });
            console.log('newResult: ',newResult);
            details.wishes = newResult;
            callback(null);
          }
        );
      }

      asyncX.parallel([
        usersQuery,
        guestsQuery,
        wishesQuery
      ], function (err, result) {
        console.log(details);

        var mergedUsers = details.users.map(function(userItem){
          var guests = [];
          var guestsList = details.guests.map(function(guestItem) {
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
    console.log(req.body);
    if (req.params.code === '3SKUV0') {
      connection.query('INSERT INTO users (code, name, invites) ' 
        + 'VALUES ("' + req.body.code + '","' + req.body.name + '",' + req.body.invites + ');',
        function (err, result) {
            if (err) throw err;
            res.send('User added to database');
        }
      );
    }
  }
}

module.exports = new authAdmin();
