angular
.module('RDash')
.controller('registerCtrl', ['$scope', 'User', '$state', 'notificationService', function($scope, User, $state, notificationService) {

  $scope.register = function(form) {
    if (form.$invalid) {
      return;
    }
    var newUser = {
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password
    };
    User.create(newUser, function(){
      notificationService.success("Your account has been created!");
      $state.go('master.index', {}, {location: true});
    }, function(res){
      console.log(res);
      notificationService.error(res.data.error.message);
      $scope.errorMessage = res.data.error.message;
    });
  };

}]);
