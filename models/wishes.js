var connection = require('../connection');

function wishes() {
  this.getWishes = function(req, res) {
    connection.query('SELECT * FROM wishes WHERE accepted = true',
      function(err, result) {
        if (err) throw err;
        res.send(result);
      }
    );
  }

  this.addWish = function(req, res) {
    var newWish = req.body;
    connection.query('INSERT INTO wishes(users_id, accepted, text, signature)'
        + 'SELECT users.id, 0, "' + newWish.text + '", "' + newWish.signature + '"'
        + 'FROM users WHERE code = "' + req.params.code + '";' , function (err) {
        if (err) throw err;
    });
    
    res.send(req.body);
  }

  this.acceptWish = function(req, res) {
  	var wishToSet = req.body;
    if (req.params.code === '3SKUV0') {
		connection.query('UPDATE wishes '
		    + 'SET accepted = ' + req.body.accepted + ' '
		    + 'WHERE id = ' + req.body.id + ';', function (err) {
		    if (err) throw err;
	    });
	}

    res.send('DONE');
  }
}

module.exports = new wishes();
