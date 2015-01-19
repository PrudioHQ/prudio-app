var module = angular.module('SlackService',[]);
module.factory('SlackService', function() {
	return {
		url: 'https://slack.com/oauth/authorize',
		clientId: '3045626515.3266629173',
		scope: 'post'
	};
});