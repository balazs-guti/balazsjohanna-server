var mysql = require('mysql');

var connection = mysql.createConnection({
        host     : '127.0.0.1',
        // host     : '192.168.99.100',
        user     : 'root',
        password : 'password'
    });

module.exports = connection;
