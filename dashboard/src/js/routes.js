'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('master', {
                templateUrl: 'templates/master.html',
                data: {
                  permissions: {
                    except: ['anonymous'],
                    redirectTo: 'auth.login'
                  }
                }
            })
                .state('master.index', {
                    url: '/',
                    templateUrl: 'templates/dashboard.html',
                    controller: 'MasterCtrl'
                })


            .state('auth', {
                templateUrl: 'templates/auth/wrapper.html'
            })
                .state('auth.login', {
                    url: '/login',
                    templateUrl: 'templates/auth/login.html',
                    controller: 'AuthCtrl'
                })
                .state('auth.register', {
                  url: '/register',
                  templateUrl: 'templates/auth/register.html'
                })
                .state('auth.password-reset', {
                  url: '/reset',
                  templateUrl: 'templates/auth/password-reset.html'
                });
    }
])
.run(['Permission', 'User', function(Permission, User){
  Permission.defineRole('anonymous', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if (User) {
      return true; // Is anonymous
    }
    return false;
  });
}]);
