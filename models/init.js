var connection = require('../connection');

// database setup
module.exports = function() {
  connection.query('CREATE DATABASE IF NOT EXISTS bjwedding '
      + 'DEFAULT CHARACTER SET "utf8"'
      + 'DEFAULT COLLATE "utf8_general_ci";', function (err) {
      if (err) throw err;
      connection.query('USE bjwedding;', function (err) {
          if (err) throw err;
          connection.query('CREATE TABLE IF NOT EXISTS users('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id),'
              + 'is_admin BOOLEAN DEFAULT NULL,'
              + 'coming BOOLEAN DEFAULT NULL,'
              + 'code VARCHAR(6),'
              + 'name VARCHAR(30),'
              + 'invites TINYINT'
              +  ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('CREATE TABLE IF NOT EXISTS guests('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id),'
              + 'users_id INT,'
              + 'FOREIGN KEY (users_id)'
              + 'REFERENCES users(id)'
              + 'ON DELETE CASCADE,'
              + 'name VARCHAR(50),'
              + 'age VARCHAR(50),'
              + 'lactose BOOLEAN DEFAULT NULL,'
              + 'gluten BOOLEAN DEFAULT NULL,'
              + 'other_allergy VARCHAR(50)'
              +  ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('CREATE TABLE IF NOT EXISTS wishes('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id),'
              + 'users_id INT,'
              + 'FOREIGN KEY (users_id)'
              + 'REFERENCES users(id)'
              + 'ON DELETE CASCADE,'
              + 'accepted BOOLEAN DEFAULT NULL,'
              + 'text VARCHAR(1000),'
              + 'signature VARCHAR(50)'
              + ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('CREATE TABLE IF NOT EXISTS requests('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id),'
              + 'users_id INT,'
              + 'FOREIGN KEY (users_id)'
              + 'REFERENCES users(id)'
              + 'ON DELETE CASCADE,'
              + 'accepted BOOLEAN DEFAULT NULL,'
              + 'text VARCHAR(1000),'
              + 'requested_invites TINYINT'
              + ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          connection.query('CREATE TABLE IF NOT EXISTS game('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id),'
              + 'users_id INT,'
              + 'FOREIGN KEY (users_id)'
              + 'REFERENCES users(id)'
              + 'ON DELETE CASCADE,'
              + 'text VARCHAR(1000)'
              + ') ENGINE=InnoDB; ', function (err) {
                  if (err) throw err;
          });
          // connection.query('INSERT INTO users (is_admin, code, name, invites) '
          //     + 'VALUES (true,"3SKUV0","B&J",0); ', function (err) {
          //     if (err) throw err;
          // });
      });
  });
}
