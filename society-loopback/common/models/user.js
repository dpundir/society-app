var config = require('../../server/config.json');
var path = require('path');

module.exports = function(user) {
  //send verification email after registration
  user.afterRemote('create', function(context, user, next) {
    console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: user.email,
      from: 'society.swastik@gmail.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '%2Fapp%23%2Fregister%2Fverified',
      user: user
    };

    user.verify(options, function(err, response, next) {
      if (err) return next(err);

      console.log('> verification email sent:', response);

      context.res.send({
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
            'before logging in.',
        redirectTo: '/app#/login',
        redirectToLinkText: 'Log in'
      });
    });
  });

  //send password reset link when requested
  user.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/app#/reset/password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    user.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  user.fetchMember = function(req, cb){
    var TokenModel = req.app.models.AccessToken;

    TokenModel.findForRequest(req, {}, function(err, token) {
      if(err){
        cb(err, null);
      }
      user.findById(token.userId, {include:"member", fields:['id', 'email', 'username', 'member', 'memberid']}, function(err, usermember){
        if(err){
          cb(err, null);
        }
        cb(null, usermember);
      })
    });
  };

  user.remoteMethod(
    'fetchMember',
    {
      description: 'Fetch member details for logged in user with access token.',
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'},
          description: 'Do not supply this argument, it is automatically extracted ' +
          'from request headers.'
        }
      ],
      returns: {
        arg: 'member', type: 'object',
        description:
          'The response body contains properties of the User details'
      },
      http: {verb: 'get', path: '/usermember'}
    }
  );
};
