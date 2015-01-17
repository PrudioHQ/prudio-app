var request = require('request');
var qs      = require('querystring');

module.exports = function slackOAuth(server) {

  	server.get('/auth/slack', function(req, res){
		
  		console.log("Auth Slack!!!");

  		var client_id     = process.env.SLACK_CLIENT_ID;
  		var client_secret = process.env.SLACK_CLIENT_SECRET;
  		var redirect_uri  = process.env.SLACK_REDIRECT_URI;  //'http://localhost:3000/auth/slack';
  		var url           = 'https://slack.com/api/oauth.access';
  		var error         = req.query.error;
  		var code          = req.query.code;
  		var state         = req.query.state;

  		if (!error) {
  			var query = {
  				client_id: client_id,
  				client_secret: client_secret,
  				code: code,
  				redirect_uri: redirect_uri
  			}

  			request
	  			.get({url: url + '?' + qs.stringify(query), json: true}, function (error, response, body) {
	  					res.send(body);
	  				})
	  			.on('error', function(err) {
					console.log(err);
					res.send(err);
				})
  		}
	});
};
