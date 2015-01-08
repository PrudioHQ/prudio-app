angular
.module('RDash')
.controller('loginCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {

	$scope.login = function(form) {
		var credentials = {
			email: form.email,
			password: form.password
		}
		var rememberMe = form.remember;

		User.login({rememberMe: rememberMe}, credentials, function() {
			// TODO: Notify user that has succesfully logged in
			$state.go('master');
		}, function() {
			$scope.error = true;
		});

	};

}]);
