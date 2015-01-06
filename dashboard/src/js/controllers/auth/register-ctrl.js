angular
.module('RDash')
.controller('registerCtrl', ['$scope', 'User', function($scope, User) {

  $scope.form = {};

  $scope.register = function() {
    var cred = $scope.form;
    User.create(cred).then(function(){
      console.log("User created");
    });
  };

}]);
