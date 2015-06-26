var loopback = require('loopback');
var boot = require('loopback-boot');
var raygun = require('raygun');

// Environment
var environment = process.env.NODE_ENV || 'development';

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var websitePath = require('path').resolve(__dirname, '../build');
app.use(loopback.static(websitePath));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// -- Raygun Error Handling --
if (environment === 'production') {
  var raygunClient = new raygun.Client().init({
    apiKey: process.env.RAYGUN_APIKEY
  });
  app.use(raygunClient.expressHandler);
}

// The ultimate error handler.
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
