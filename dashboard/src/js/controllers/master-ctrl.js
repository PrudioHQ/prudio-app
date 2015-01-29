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

        User.logout(function() {
            $state.go('auth.login', {}, { location: true });
        });
    };

    $scope.authSlack = function() {

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

    /* Dummy data */
    var date = new Date();
    date.setHours(20);

    $scope.applications = [
        {
            name: "App1",
            room_count: 3,
            createdAt: new Date()
        },
        {
            name: "My cool apps",
            room_count: 6,
            createdAt: date
        },
    ];

    window.onresize = function() {
        $scope.$apply();
    };
}