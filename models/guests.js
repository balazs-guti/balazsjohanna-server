var connection = require('../connection');

function guests() {
  this.addGuest = function(req, res) {
    console.log(req.body);
    console.log(req.params);

    var newGuest = req.body;
    var lactose = newGuest.lactose ? 1 : 0;
    var gluten = newGuest.gluten ? 1 : 0;
    
    if (newGuest.name !== '' && newGuest.age !== '') {
        connection.query('INSERT INTO guests(users_id, name, age, lactose, gluten, other_allergy)'
            + 'SELECT users.id, "' + newGuest.name + '", "' + newGuest.age + '", "' + lactose + '", "' + gluten + '", "' + newGuest.other_allergy + '"'
            + 'FROM users WHERE code = "' + req.params.code + '";' , function (err) {
            if (err) throw err;
        });

        connection.query('UPDATE users '
            + 'SET invites = invites - 1 '
            + 'WHERE code = "' + req.params.code + '";', function (err) {
            if (err) throw err;
        });
        
        res.send(req.body);
    }

    // connection.query('INSERT INTO guests(users_id, name, age, lactose, gluten, other_allergy)'
    //     + 'SELECT users.id, "testname", "testage", "0", "1", "testotherallergy"'
    //     + 'FROM users WHERE code = "123";', function (err) {
    //     if (err) throw err;
    // });

  }

  this.deleteGuest = function(req, res) {

    connection.query('DELETE FROM guests '
        + 'WHERE id = "'+ req.body.guestId +'";', function (err) {
        if (err) throw err;
    });

    connection.query('UPDATE users '
        + 'SET invites = invites + 1 '
        + 'WHERE code = "' + req.params.code + '";', function (err) {
        if (err) throw err;
    });
    
    res.send(req.body);
  }
}

module.exports = new guests();
