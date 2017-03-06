var connection = require('../connection');

// database setup
module.exports = function() {
  connection.query('CREATE DATABASE IF NOT EXISTS bjwedding', function (err) {
      if (err) throw err;
      connection.query('USE bjwedding', function (err) {
          if (err) throw err;
          connection.query('CREATE TABLE IF NOT EXISTS users('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'is_admin BOOLEAN DEFAULT NULL,'
              + 'PRIMARY KEY(id),'
              + 'code VARCHAR(6),'
              + 'name VARCHAR(30),'
              + 'invites TINYINT'
              +  ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('CREATE TABLE IF NOT EXISTS guests('
              + 'users_id INT,'
              + 'FOREIGN KEY (users_id)'
              + 'REFERENCES users(id)'
              + 'ON DELETE CASCADE,'
              + 'text VARCHAR(50)'
              +  ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('CREATE TABLE IF NOT EXISTS wishes('
              + 'users_id INT,'
              + 'FOREIGN KEY (users_id)'
              + 'REFERENCES users(id)'
              + 'ON DELETE CASCADE,'
              + 'text VARCHAR(100)'
              + ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('INSERT INTO users (is_admin, code, name, invites) '
              + 'VALUES (false,"ABC123","Stefan",5); ', function (err) {
              if (err) throw err;
          });
      });
  });
}
