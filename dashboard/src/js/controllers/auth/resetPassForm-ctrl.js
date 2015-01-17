angular
.module('RDash')
.controller('resetPassFormCtrl', ['$scope', '$state', '$stateParams', 'User', function($scope, $state, $stateParams, User) {

  $scope.form = {};

  $scope.resetPassForm = function() {
    
    var password = $scope.form.password;
    var passwordConfirm = $scope.form.passwordConfirm;
    var accessToken = $stateParams.accessToken;

    User.passwordUpdate({accessToken: accessToken, password: password}, function() {
      // TODO: Notify user that has succesfully logged in
      $state.go('master.index', {}, {location: true});
    }, function() {
      $scope.error = true;
    });

  };


}]);
