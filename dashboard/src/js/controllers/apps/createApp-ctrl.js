/**
 * createApp Controller
 */

angular.module('RDash')
    .controller('createAppCtrl', ['$scope', '$filter', '$timeout', '$modal', 'notificationService', 'User', 'Account', createAppCtrl]);

function createAppCtrl($scope, $filter, $timeout, $modal, notificationService, User, Account) {

    $scope.user     = {};
    $scope.account  = {};
    $scope.tokens   = [];
    $scope.bots     = [];
    $scope.users    = [];
    $scope.channels = [];

    $scope.name            = 'teste';
    $scope.isDisabled      = true;
    $scope.selectedToken   = null;
    $scope.selectedBot     = null;
    $scope.selectedUser    = null;
    $scope.selectedChannel = null;
    $scope.botToken        = 'xoxb-teste';

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

    $scope.create = function(selectedBot, selectedUser, selectedChannel) {
        $scope.isSaving = true;

        var application = {
            "name": $scope.name,
            "slackApiToken": $scope.selectedToken.token,
            "slackBotToken": $scope.botToken,
            "slackInviteUser": selectedUser.id,
            "slackInviteBot": selectedBot.id,
            "notifyChannel": selectedChannel.id,
            "roomCount": 0,
            "roomPrefix": "sp-",
            "accountId": $scope.account.id
        };

        Account.apps.create({ id: $scope.account.id }, application, function(app, err) {

            if (err) {
                notificationService.error("Ups! We couldn't save your app!");
                $scope.isSaving = false;
                return;
            }

            var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

            notificationService.success("You have created the app!!! Your code: " + app.appId + ".");

        });

    };
}
