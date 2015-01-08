angular
.module('RDash')
.controller('resetPassCtrl', ['$scope', 'User', function($scope, User) {

  $scope.form = {};
  $scope.emailSent = false;

  $scope.resetPass = function() {
    var email = $scope.form.email;
    User.resetPassword(email)
    $scope.emailSent = true;
  };

}]);
