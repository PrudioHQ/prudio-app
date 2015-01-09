angular
.module('RDash')
.controller('registerCtrl', ['$scope', 'User', '$state', function($scope, User, $state) {

  $scope.register = function(form) {
    if (form.$invalid) {
      return
    }
    var newUser = {
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password
    };
    User.create(newUser, function(){
      // TODO: Notify the user that has been successfully created
      $state.go('master', {}, {location: true});
    }, function(res){
      console.log(res);
      $scope.errorMessage = res.data.error.message
    });
  };

}]);
