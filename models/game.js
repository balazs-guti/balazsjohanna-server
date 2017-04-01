var connection = require('../connection');

function game() {
  this.newQuestion = function(req, res) {
     
    connection.query('INSERT INTO game(users_id, text)'
        + 'SELECT users.id, "' + req.body.text + '" '
        + 'FROM users WHERE code = "' + req.params.code + '";' , function (err) {
        if (err) throw err;
    });

    res.send(req.body);
  }
}

module.exports = new game();
