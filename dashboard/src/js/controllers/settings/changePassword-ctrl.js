/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('changePasswordCtrl', ['$scope', 'User', 'notificationService', changePasswordCtrl]);

function changePasswordCtrl($scope, User, notificationService) {

    console.log("changePasswordCtrl");

    $scope.submitForm = function(password) {
        User.passwordUpdate({password: password}, function() {
                notificationService.success('Password is successfully changed!');
            }, function() {
                notificationService.error('Password could not be changed!');
            });
    }

}