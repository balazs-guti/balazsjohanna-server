var auth = require('./models/auth');
var authAdmin = require('./models/authAdmin');
var wishes = require('./models/wishes');
var guests = require('./models/guests');
var requests = require('./models/requests');
var game = require('./models/game');

module.exports = {
  configure: function(app) {
    app.get('/', function(req, res) {
        res.sendFile('/index.html', {root: __dirname});
    });

    // app.post('/users', function(req, res, next) {
    //   auth.insert(req, res, next);
    // });

    // wishes

    app.get('/getWishes/', function(req, res) {
      wishes.getWishes(req, res);
    });

    app.post('/sendWish/:code', function(req, res) {
      wishes.addWish(req, res);
    });

    app.post('/acceptWish/:code', function(req, res) {
      wishes.acceptWish(req, res);
    });

    app.post('/deleteWish/:code', function(req, res) {
      wishes.deleteWish(req, res);
    });

    // guests

    app.post('/addUser/:code', function(req, res) {
      authAdmin.addUser(req, res);
    });

    app.post('/deleteUser/:code', function(req, res) {
      authAdmin.deleteUser(req, res);
    });

    app.post('/changeUserInvites/:code', function(req, res) {
      authAdmin.changeUserInvites(req, res);
    });

    app.post('/addGuest/:code', function(req, res) {
      guests.addGuest(req, res);
    });

    app.post('/deleteGuest/:code', function(req, res) {
      guests.deleteGuest(req, res);
    });

    // requests

    app.post('/requestInvite/:code', function(req, res) {
      requests.requestInvite(req, res);
    });

    app.post('/deleteRequest/:code', function(req, res) {
      requests.deleteRequest(req, res);
    });

    app.post('/answerRequest/:code', function(req, res) {
      authAdmin.answerRequest(req, res);
    });

    // questions

    app.post('/sendQuestion/:code', function(req, res) {
      game.newQuestion(req, res);
    });

    app.post('/deleteQuestion/:code', function(req, res) {
      game.deleteQuestion(req, res);
    });

    // login

    app.post('/user/:code', function(req, res) {
      auth.login(req, res);
    });

    app.get('/user/:code', function(req, res) {
      auth.getLoginDetails(req, res);
    });

    app.get('/admin/:code', function(req, res) {
      authAdmin.getAdminData(req, res);
    });
    
    app.post('/answerComing/:code', function(req, res) {
      auth.answerComing(req, res);
    });


    
  }
};
