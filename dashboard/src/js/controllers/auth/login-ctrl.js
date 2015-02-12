angular
.module('RDash')
.controller('loginCtrl', ['$scope', '$state', '$location', 'User', 'notificationService', function($scope, $state, $location, User, notificationService) {

	$scope.login = function(form) {
		var credentials = {
			email: form.email,
			password: form.password
		}
		var rememberMe = form.remember;

		User.login({rememberMe: rememberMe}, credentials, function() {
			notificationService.success("You have successfully logged in.");
			var next = $location.nextAfterLogin || '/';
			$location.nextAfterLogin = null;
			$location.path(next);
		}, function() {
			$scope.error = true;
			notificationService.error("Wrong email or password.");
		});

	};

}]);
