/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$window', '$state', '$cookieStore', 'User', MasterCtrl]);

function MasterCtrl($scope, $window, $state, $cookieStore, User) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    $scope.logout = function() {

        console.log("Login out!");

        User.logout(function() {
            $state.go('auth.login', {}, { location: true });
        });
    };

    $scope.authSlack = function() {

        console.log("authSlack");
        // $window.location.href = 'https://slack.com/oauth/authorize\?client_id\=3045626515.3266629173\&redirect_uri\=http://localhost:3000/auth/slack\&scope\=post\&state\=xxx';
        $window.location.href = 'https://slack.com/oauth/authorize\?client_id\=3045626515.3266629173\&redirect_uri\=https://app.prud.io/auth/slack\&scope\=post\&state\=xxx';
        
    };

    window.onresize = function() {
        $scope.$apply();
    };
}