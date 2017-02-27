var connection = require('../connection');

// database setup
module.exports = function() {
  connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
      if (err) throw err;
      connection.query('USE test', function (err) {
          if (err) throw err;
          connection.query('CREATE TABLE IF NOT EXISTS users('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id),'
              + 'name VARCHAR(30)'
              +  ')', function (err) {
                  if (err) throw err;
              });
      });
  });
}
