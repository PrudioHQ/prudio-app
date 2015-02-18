/**
 * listApps Controller
 */

angular.module('RDash')
    .controller('listAppsCtrl', ['$scope', 'User', 'Account', listAppsCtrl]);

function listAppsCtrl($scope, User, Account) {

    $scope.applications = [];

    User.getCurrent(function(user, req, err) {

        User.accounts({ id: user.id }, function(accounts, req, err) {
            for (var i = accounts.length - 1; i >= 0; i--) {
                var account = accounts[i];

                Account.apps({ id: account.id }, function(apps, req, err) {
                    for (var j = apps.length - 1; j >= 0; j--) {
                        var app = apps[j];
                        $scope.applications.push(app);
                    }
                });

            };
        });
    });
}
