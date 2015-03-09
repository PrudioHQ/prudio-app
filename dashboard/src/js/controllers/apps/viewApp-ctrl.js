/**
 * listApps Controller
 */

angular.module('RDash')
    .controller('viewAppCtrl', ['$state', '$scope', '$stateParams', '$location', 'notificationService', 'User', 'Account', viewAppCtrl]);

function viewAppCtrl($state, $scope, $stateParams, $location, notificationService, User, Account) {

    $scope.application = {};
    $scope.url = $location.absUrl();

    User.getCurrent(function(user, req, err) {
        Account.apps.findById({ id: user.defaultAccountId, fk: $stateParams.appId }, function(app, req, err) {
            $scope.application = app;
        });

        $scope.turnOn = function() {
            Account.apps.updateById({ id: user.defaultAccountId, fk: $stateParams.appId }, { online: true }, function(app, req, err) {
                notificationService.success("Application is now online");
                $scope.application = app;
            });
        }

        $scope.turnOff = function() {
            Account.apps.updateById({ id: user.defaultAccountId, fk: $stateParams.appId }, { online: false }, function(app, req, err) {
                notificationService.success("Application is now offline");
                $scope.application = app;
            });
        }

        $scope.delete = function() {
            Account.apps.destroyById({ id: user.defaultAccountId, fk: $stateParams.appId }, function(req, err) {
                notificationService.success("Application was deleted!");
                $scope.application = null;
                $location.path('/apps');
            });
        }
    });

    
}
