/**
 * Created by Deepak.Pundir on 12/25/2015.
 */

var login = function (req, res) {
  var User = req.app.models.user;
  var FIVE_MINUTES = 60 * 10;
  User.login({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    ttl: FIVE_MINUTES
  }, 'user', function (err, token) {
    if (err) {
      res.sendStatus(err.statusCode);
    } else {
      res.send({
        email: token.__data.user.email,
        accessToken: token.id,
        username: token.__data.user.username
      });
    }
  });
};

var logout = function (req, res) {
  var User = req.app.models.user;
  var AccessToken = req.app.models.AccessToken;

  if(req.query['access_token']) {
    var token = new AccessToken({id: req.query['access_token']});
    token.destroy();

    res.redirect('/');
  } else if(req.accessToken){
    User.logout(req.accessToken.id, function (err) {
      if (err) return next(err);
      res.redirect('/app/#login');
    });
  } else{
    return res.sendStatus(401);
  }
};

var userMember = function (req, res) {
  var User = req.app.models.user;
  User.fetchMember(req, function (err, member) {
    if (err) {
      res.sendStatus(err.statusCode);
    } else {
      res.send(member);
    }
  });
};

var requestResetPassword = function (req, res, next) {
  var User = req.app.models.user;
  User.resetPassword({
    email: req.body.email
  }, function (err) {
    if (err) return res.status(err.statusCode || 401).send(err);

    res.send({
      title: 'Password reset requested',
      content: 'Check your email for further instructions',
      redirectTo: '/app#/login',
      redirectToLinkText: 'Log in'
    });
  });
};

var resetPassword = function (req, res, next) {
  var User = req.app.models.user;
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
      res.send({
        title: 'Password reset success',
        content: 'Your password has been reset successfully',
        redirectTo: '/app#/login',
        redirectToLinkText: 'Log in'
      });
    });
  });
};

module.exports = {
  login: login,
  logout: logout,
  userMember: userMember,
  requestResetPassword: requestResetPassword,
  resetPassword: resetPassword
}