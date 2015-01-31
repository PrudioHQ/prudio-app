angular
.module('RDash')
.controller('resetPassCtrl', ['$scope', 'User', 'notificationService', function($scope, User, notificationService) {

  $scope.form = {};
  $scope.emailSent = false;

  $scope.resetPass = function() {
    var email = $scope.form.email;
    User.resetPassword({email: email}, function() {
   		$scope.emailSent = true; 
   		notificationService.notice('Reset email has been sent. Check your inbox.');
    });
  };

}]);
