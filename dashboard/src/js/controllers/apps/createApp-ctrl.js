/**
 * createApp Controller
 */

angular.module('RDash')
    .controller('createAppCtrl', ['$scope', '$filter', '$location', 'notificationService', 'User', 'Account', createAppCtrl]);

function createAppCtrl($scope, $filter, $location, notificationService, User, Account) {

    $scope.user     = {};
    $scope.account  = {};
    $scope.tokens   = [];
    $scope.bots     = [];
    $scope.users    = [];
    $scope.channels = [];

    $scope.name            = null;
    $scope.isDisabled      = true;
    $scope.selectedToken   = null;
    $scope.selectedBot     = null;
    $scope.selectedUser    = null;
    $scope.selectedChannel = null;
    $scope.botToken        = null;

    User.getCurrent(function(user, req, err) {
        $scope.user = user;

        Account.findById({ id: user.defaultAccountId }, function(account, req, err) {

            $scope.account = account;

            Account.prototype$__get__externalProviderTokens({ id: account.id }, function(tokens, req, err) {
                $scope.tokens = tokens;

                // Select always the first
                if ($scope.tokens.length > 0) {
                    $scope.selectedToken = $scope.tokens[0];
                    $scope.getMembers($scope.tokens[0].id);
                }
            });
        });
    });


    $scope.getChannels = function(token) {
        Account.listSlackChannels({ id: $scope.user.defaultAccountId, fk: token }, function(channels, req, err) {
            $scope.channels = $filter('filter')(channels.result, { is_channel: true, is_archived: false });
        });
    };

    $scope.getMembers = function(token) {
        Account.listSlackMembers({ id: $scope.user.defaultAccountId, fk: token }, function(members, req, err) {
            $scope.bots  = $filter('filter')(members.result, { is_bot: true, deleted: false });
            $scope.users = $filter('filter')(members.result, { is_bot: false, deleted: false });

            // Add the option to don't have a user automatically added
            $scope.users.push({ id: 0, name: "none", profile : { real_name: 'Don\'t add any', image_24: 'https://slack.global.ssl.fastly.net/8390/img/avatars/ava_0009-24.png' }});
        });
    };

    $scope.confirmToken = function(token) {
        Account.testSlackToken({ token: token }, function(result, req, err) {
            console.log(result);
        });
    };

    $scope.create = function(name, botToken, selectedBot, selectedUser, selectedChannel) {
        var application = {
            "name": name,
            "slackApiToken": $scope.selectedToken.token,
            "slackBotToken": botToken,
            "slackInviteUser": selectedUser.id,
            "slackInviteBot": selectedBot.id,
            "notifyChannel": selectedChannel.id,
            "roomCount": 0,
            "roomPrefix": "sp-",
            "accountId": $scope.account.id
        };

        $scope.isSaving = true;

        Account.apps.create({ id: $scope.account.id }, application, 
            function(app) {
                notificationService.success("You have created the application " + app.name + ".");
                $location.path('/apps');
            },
            function(err) {
                notificationService.error("Ups! We couldn't save your app!");
                $scope.isSaving = false;
            }
        );

    };
}
