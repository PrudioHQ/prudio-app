module.exports = function forceSSL(server) {
	var environment = process.env.NODE_ENV || 'development';

	if (environment === 'production') {
		server.get('*', function(req, res, next) {
			if (req.headers['x-forwarded-proto'] !== 'https') {
				res.redirect('https://app.prud.io' + req.url);
			} else {
				next();
			}
		});

		server.post('*', function(req, res, next) {
			if (req.headers['x-forwarded-proto'] !== 'https') {
				res.status(403).send('403.4 - SSL required.');
			} else {
				next();
			}
		});
	}
};