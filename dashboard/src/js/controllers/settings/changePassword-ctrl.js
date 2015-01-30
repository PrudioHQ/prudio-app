/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('changePasswordCtrl', ['$scope', 'User', changePasswordCtrl]);

function changePasswordCtrl($scope, User) {

    console.log("changePasswordCtrl");

    $scope.submitForm = function(password) {
        User.passwordUpdate({password: password});
        console.log('updated');
    }

}