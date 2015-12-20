var bodyParser = require('body-parser');
var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var cons = require('consolidate');

var app = module.exports = loopback();

app.middleware('initial', bodyParser.urlencoded({ extended: true }));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.engine('html', cons.lodash);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
