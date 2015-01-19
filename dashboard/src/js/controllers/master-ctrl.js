/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$window', '$state', '$cookieStore', 'SlackService', 'User', MasterCtrl]);

function MasterCtrl($scope, $window, $state, $cookieStore, SlackService, User) {
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

        User.getCurrent(function(user, req, err) { 

            if(err) {
                console.log("Error: ", err);
                return; 
            }
            
            $window.location.href = SlackService.url + 
                        '?client_id' + '=' + SlackService.clientId +
                        '&scope=' + SlackService.scope + 
                        '&redirect_uri=' + location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/auth/slack' +
                        '&state=' + user.id + '.' + user.accountId;

        });
        
    };

    window.onresize = function() {
        $scope.$apply();
    };
}