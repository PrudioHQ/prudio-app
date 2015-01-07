angular
.module('RDash')
.controller('loginCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {

	$scope.credentials = {};

 
	$scope.login = function() {
		$scope.loginResult = User.login({
			include: 'user',
			rememberMe: $scope.credentials.remember
		}, $scope.credentials,
		function() {
			var next = $location.nextAfterLogin || '/';
			$location.nextAfterLogin = null;
		  
			if(next === '/login') {
		    	next = '/';
			}

		  	$location.path(next);
		},
		function(res) {
		  	$scope.loginError = res.data.error;
		});
	};

}]);
