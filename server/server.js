var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var bodyParser = require('body-parser');
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

boot(app, __dirname);

var websitePath = require('path').resolve(__dirname, '../build');
app.use(loopback.static(websitePath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(loopback.token({
  model: app.models.accessToken
}));
app.use(loopback.cookieParser(app.get('cookieSecret')));
app.use(loopback.session({secret: 'kitty' }));

var config = {};
try {
  config = require('./providers.json');
} catch(err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}
passportConfigurator.init();

var user = app.models.User;
passportConfigurator.setupModels({
  userModel: user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});
for(var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}

app.get('/auth', function(req, res, next){
  res.cookie('access-token', req.signedCookies['access-token']);
  res.cookie('userId', req.user.id);
  res.redirect('/');
});

app.use(loopback.urlNotFound());
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
