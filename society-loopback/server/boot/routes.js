/**
 * Created by Deepak.Pundir on 12/17/2015.
 */

module.exports = function (app) {
  var router = app.loopback.Router();
  var authentication = require("../controller/authentication");

  router.get('/app', function (req, res, next) {
    res.render('index.html');
  });

  //log a user in
  router.post('/login', authentication.login);
  router.get('/logout', authentication.logout);

  //send an email with instructions to reset an existing user's password
  router.post('/request/reset/password', authentication.requestResetPassword);

  //reset the user's pasword
  router.post('/reset/password', authentication.resetPassword);

  app.use(router);
}