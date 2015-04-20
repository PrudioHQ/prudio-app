/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$window', '$state', '$cookieStore', 'SlackService', 'User', 'Account', MasterCtrl]);

function MasterCtrl($scope, $window, $state, $cookieStore, SlackService, User, Account) {
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

    $scope.applications = [];
    $scope.accounts = [];
    $scope.user = {};

    $scope.retrieveAccounts = function() {
        User.getCurrent(function(user, req, err) {

            $scope.user = user;

            // PRUDIO
            window._PrudioSettings = {
                title: 'Prudio Support',
                icon: 'prd-icon-btn-prudio',
                name: user.fname + ' ' + user.lname,
                email: user.email
            }

            $scope.applications = [];
            $scope.accounts = [];

            User.accounts({ id: user.id }, function(accounts, req, err) {
                for (var i = accounts.length - 1; i >= 0; i--) {
                    var account = accounts[i];

                    Account.apps({ id: account.id }, function(apps, req, err) {
                        for (var j = apps.length - 1; j >= 0; j--) {
                            var app = apps[j];
                            $scope.applications.push(app);
                        }
                    });

                    $scope.accounts.push(account);
                };
            });
        });
    }

    $scope.$on('retrieveAccounts', function(event, data) {
        $scope.retrieveAccounts();
    });

    $scope.retrieveAccounts();

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
                        '&state=' + user.id + '.' + user.defaultAccountId;

        });

    };

    window.onresize = function() {
        $scope.$apply();
    };
}
