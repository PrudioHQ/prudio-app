module.exports = function Logs() {

	var environment = process.env.NODE_ENV || 'development';
	
	if (environment === 'production') {
		var stdo = require('fs').createWriteStream('/var/log/node-server/log.txt');

		process.stdout.write = (function(write) {
		        return function(string, encoding, fd) {
		                stdo.write(string);
		        }
		})(process.stdout.write);
	}
}