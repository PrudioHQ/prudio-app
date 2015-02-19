/**
 * createApp Controller
 */

angular.module('RDash')
    .controller('createAppCtrl', ['$scope', '$filter', 'User', 'Account', createAppCtrl]);

function createAppCtrl($scope, $filter, User, Account) {

    var url = "https://slack.com/api/users.list";

    $scope.user   = {};
    $scope.tokens = [];
    $scope.bots   = [];
    $scope.users  = [];

    $scope.selectedToken = null;
    $scope.selectedBot   = null;

    User.getCurrent(function(user, req, err) {
        $scope.user = user;

        Account.findById({ id: user.defaultAccountId }, function(account, req, err) {
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


    $scope.getMembers = function(token) {
        Account.listSlackMembers({ id: $scope.user.defaultAccountId, fk: token }, function(members, req, err) {
            $scope.bots  = $filter('filter')(members.result, { is_bot: true, deleted: false });
            $scope.users = $filter('filter')(members.result, { is_bot: false, deleted: false });

            // Add the option to don't have a user automatically added
            $scope.users.push({ id: 0, name: "none", profile : { real_name: 'Don\'t add any', image_24: 'https://slack.global.ssl.fastly.net/8390/img/avatars/ava_0009-24.png' }});
        })
    };


}
