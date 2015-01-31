angular
.module('RDash')
.controller('loginCtrl', ['$scope', '$state', 'User', 'notificationService', function($scope, $state, User, notificationService) {

	$scope.login = function(form) {
		var credentials = {
			email: form.email,
			password: form.password
		}
		var rememberMe = form.remember;

		User.login({rememberMe: rememberMe}, credentials, function() {
			notificationService.success("You have successfully logged in.");
			$state.go('master.index', {}, {location: true});
		}, function() {
			$scope.error = true;
			notificationService.error("Wrong email or password.");
		});

	};

}]);
