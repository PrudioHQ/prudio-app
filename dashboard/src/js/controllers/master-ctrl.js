/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'User', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, User) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    User.findById({ id: 1 }, 
        function(res) {
            console.log("Found");
            console.log(res);
        }, function(res) {
            console.log("Not found");
        }
    );

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

    window.onresize = function() {
        $scope.$apply();
    };
}