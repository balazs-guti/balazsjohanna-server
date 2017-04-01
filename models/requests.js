var connection = require('../connection');

function requests() {
  this.requestInvite = function(req, res) {
     
    connection.query('INSERT INTO requests(users_id, text, requested_invites)'
        + 'SELECT users.id, "' + req.body.text + '", "' + req.body.amount + '" '
        + 'FROM users WHERE code = "' + req.params.code + '";' , function (err) {
        if (err) throw err;
    });

    // connection.query('UPDATE users '
    //     + 'SET invites = invites + ' + req.body + ' '
    //     + 'WHERE code = "' + req.params.code + '";', function (err) {
    //     if (err) throw err;
    // });

    res.send(req.body);
  }
}

module.exports = new requests();
