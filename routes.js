var auth = require('./models/auth');

module.exports = {
  configure: function(app) {
    app.get('/', function(req, res) {
        res.sendFile('/index.html', {root: __dirname});
    });

    // app.post('/users', function(req, res, next) {
    //   auth.insert(req, res, next);
    // });

    app.post('/user/:code', function(req, res) {
      auth.login(req, res);
    });

    app.get('/user/:code', function(req, res) {
      auth.getLoginDetails(req, res);
    });
  }
};
