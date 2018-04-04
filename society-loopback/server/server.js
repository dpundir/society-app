var bodyParser = require('body-parser');
var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var cons = require('consolidate');
var app = module.exports = loopback();

app.middleware('initial', bodyParser.urlencoded({ extended: true }));
app.middleware('initial', bodyParser.json({ extended: true }));
app.middleware('initial', bodyParser.raw({ extended: true }));

app.use(loopback.token({ model: app.models.accessToken }));
app.use(function(req, res, next) {
    var token = req.accessToken;
    if (!token) return next();

    var now = new Date();

    // performance optimization:
    // do not update the token more often than once per second
    if (now.getTime() - token.created.getTime() < 1000){
        return next()
    };

    // update the token and save the changes
    req.accessToken.created = now;
    req.accessToken.ttl = 600; /* session timeout in seconds */
    req.accessToken.save(next);
});

app.engine('html', cons.lodash);
app.engine('ejs', cons.ejs);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

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

/*var ds = loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: path.join(__dirname, 'storage')
});

var container = ds.createModel('container');
app.model(container);*/

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
