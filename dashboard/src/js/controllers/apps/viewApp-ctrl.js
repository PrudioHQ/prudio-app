/**
 * listApps Controller
 */

angular.module('RDash')
    .controller('viewAppCtrl', ['$state', '$scope', '$stateParams', '$location', 'User', 'Account', viewAppCtrl]);

function viewAppCtrl($state, $scope, $stateParams, $location, User, Account) {

    $scope.application = {};

    User.getCurrent(function(user, req, err) {
        Account.apps.findById({ id: user.defaultAccountId, fk: $stateParams.appId }, function(app, req, err) {
            $scope.application = app;
        });

        $scope.turnOn = function() {
            Account.apps.updateById({ id: user.defaultAccountId, fk: $stateParams.appId }, { online: true }, function(app, req, err) {
                console.log("Online");
                $scope.application = app;
            });
        }

        $scope.turnOff = function() {
            Account.apps.updateById({ id: user.defaultAccountId, fk: $stateParams.appId }, { online: false }, function(app, req, err) {
                console.log("Offline");
                $scope.application = app;
            });
        }

        $scope.delete = function() {
            Account.apps.destroyById({ id: user.defaultAccountId, fk: $stateParams.appId }, function(req, err) {
                console.log("Delete");
                $scope.application = null;
                $location.path('/apps');
            });
        }
    });

    
}
