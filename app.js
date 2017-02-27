var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var connection = require('./connection');
var routes = require('./routes');
var init = require('./models/init');

var app = express();

init();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configuration
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

routes.configure(app);

// Begin listening
var port = 3000;
app.listen(port);
console.log('Server listening on port ' + port);
