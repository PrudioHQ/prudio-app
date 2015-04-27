var module = angular.module('SlackService', []);

module.factory('SlackService', function() {
  return {
    url: 'https://slack.com/oauth/authorize',
    clientId: 'SLACK_CLIENT_ID',
    scope: 'post'
  };
});
