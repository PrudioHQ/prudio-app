/**
 * listApps Controller
 */

angular.module('RDash')
    .controller('viewAppCtrl', ['$state', '$scope', '$stateParams', 'User', 'Account', viewAppCtrl]);

function viewAppCtrl($state, $scope, $stateParams, User, Account) {

    $scope.application = {};

    User.getCurrent(function(user, req, err) {

        console.log("UID: ", user.defaultAccountId);
        console.log("AID: ", $stateParams.appId);


        Account.apps.findById({ id: user.defaultAccountId, fk: $stateParams.appId }, function(app, req, err) {
            console.log(app);
            $scope.application = app;
        });
    });
}
