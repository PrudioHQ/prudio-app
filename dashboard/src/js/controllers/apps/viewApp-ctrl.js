/**
 * listApps Controller
 */

angular.module('RDash')
    .controller('viewAppCtrl', ['$state', '$scope', '$stateParams', '$location', 'notificationService', 'User', 'App', 'Account', viewAppCtrl]);

function viewAppCtrl($state, $scope, $stateParams, $location, notificationService, User, App, Account) {

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

                App.connect({ id: app.id });
            });
        }

        $scope.turnOff = function() {
            Account.apps.updateById({ id: user.defaultAccountId, fk: $stateParams.appId }, { online: false }, function(app, req, err) {
                notificationService.success("Application is now offline");
                $scope.application = app;

                App.disconnect({ id: app.id });
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
