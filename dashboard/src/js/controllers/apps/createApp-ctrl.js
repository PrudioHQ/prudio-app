/**
 * createApp Controller
 */

angular.module('RDash')
    .controller('createAppCtrl', ['$scope', '$http', 'User', 'Account', createAppCtrl]);

function createAppCtrl($scope, $http, User, Account) {

    var url = "https://slack.com/api/users.list";

    $scope.token = [];
    $scope.bots  = [];

    User.getCurrent(function(user, req, err) {
        console.log("User: ", user);
        Account.findById({ id: user.defaultAccountId }, function(account, req, err) {
            console.log("Account: ", account);
            Account.prototype$__get__externalProviderTokens({ id: account.id }, function(tokens, req, err) {
                console.log("Tokens: ", tokens);

                $scope.tokens = tokens;
                console.log("Tokens: ", req);
                console.log("Tokens: ", err);
            });
        });
    });

    $scope.getBots = function(token) {
        console.log("Token: " + token);
        $http.post(url + "?token=xoxp-3045626515-3045626517-3758533827-9009a2", { token: token }).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.bots = data.members;
                console.log("Members: ", $scope.bots);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Error: ", headers)
            });
    };


}
