angular
.module('RDash')
.controller('resetPassCtrl', ['$scope', 'User', function($scope, User) {

  $scope.email = {};

  $scope.reset = function() {
    var email = $scope.email;
    User.resetPassword(email).then(function(){
      console.log("Reset password");
    });
  };

}]);
