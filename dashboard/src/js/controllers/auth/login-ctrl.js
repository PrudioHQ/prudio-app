angular
.module('RDash')
.controller('loginCtrl', ['$scope', 'User', function($scope, User) {

  $scope.form = {};

  $scope.login = function() {
    var cred = $scope.form;
    User.login(cred);
  };

}]);
