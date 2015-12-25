/**
 * Created by Deepak.Pundir on 12/17/2015.
 */

var dsConfig = require('../datasources.json');

module.exports = function (app) {
  var User = app.models.user;
  var AccessToken = app.models.AccessToken;
  var router = app.loopback.Router();

  router.get('/', function (req, res) {
    res.render('index.html', {
      loginFailed: false
    });
  });
  router.get('/app', function (req, res, next) {
    res.render('index.html', { title: 'Express', loginFailed: false });
  });

  //log a user in
  router.post('/login', function (req, res) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function (err, token) {
      if (err) {
        res.sendStatus(err.statusCode);
      } else {
        res.send({
          email: req.body.email,
          accessToken: token.id
        });
      }
    });
  });

  router.get('/logout', function (req, res) {
    if(req.query['access_token']) {
      var token = new AccessToken({id: req.query['access_token']});
      token.destroy();

      res.redirect('/');
    } else if(req.accessToken){
      User.logout(req.accessToken.id, function (err) {
        if (err) return next(err);
        res.redirect('/');
      });
    } else{
      return res.sendStatus(401);
    }
  });

  app.use(router);
  //login page
  /*  app.get('/', function(req, res) {
   var credentials = dsConfig.emailDs.transports[0].auth;
   res.render('login', {
   email: credentials.user,
   password: credentials.pass
   });
   });*/

  //verified
  router.get('/verified', function (req, res) {
    res.render('verified');
  });

  //send an email with instructions to reset an existing user's password
  router.post('/request-password-reset', function (req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function (err) {
      if (err) return res.status(401).send(err);

      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  //show password reset form
  app.get('/reset-password', function (req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      accessToken: req.accessToken.id
    });
  });

  //reset the user's pasword
  app.post('/reset-password', function (req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);

    //verify passwords match
    if (!req.body.password || !req.body.confirmation ||
      req.body.password !== req.body.confirmation) {
      return res.sendStatus(400, new Error('Passwords do not match'));
    }

    User.findById(req.accessToken.userId, function (err, user) {
      if (err) return res.sendStatus(404);
      user.updateAttribute('password', req.body.password, function (err, user) {
        if (err) return res.sendStatus(404);
        console.log('> password reset processed successfully');
        res.render('response', {
          title: 'Password reset success',
          content: 'Your password has been reset successfully',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });
    });
  });
}