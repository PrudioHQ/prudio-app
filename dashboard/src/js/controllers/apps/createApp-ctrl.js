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

    User.getCurrent(function(user, req, err) {
        $scope.user = user;

        Account.findById({ id: user.defaultAccountId }, function(account, req, err) {
            Account.prototype$__get__externalProviderTokens({ id: account.id }, function(tokens, req, err) {
                $scope.tokens = tokens;
            });
        });
    });


    $scope.getMembers = function(token) {
        Account.listSlackMembers({ id: $scope.user.defaultAccountId, fk: token }, function(members, req, err) {
            $scope.bots  = $filter('filter')(members.result, { is_bot: true, deleted: false });
            $scope.users = $filter('filter')(members.result, { is_bot: false, deleted: false });
        })
    };


}
