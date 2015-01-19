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
                    only: ['registered'],
                    redirectTo: 'auth.login'
                  }
                }
            })
                .state('master.index', {
                    url: '/',
                    templateUrl: 'templates/dashboard.html',
                    controller: 'MasterCtrl'
                })
                .state('master.authorized', {
                    url: '/authorized',
                    templateUrl: 'templates/authorized.html',
                    controller: 'MasterCtrl'
                })


            .state('auth', {
                templateUrl: 'templates/auth/wrapper.html'
            })
                .state('auth.login', {
                    url: '/login',
                    templateUrl: 'templates/auth/login.html',
                    controller: 'AuthCtrl',
                    data: {
                      permissions: {
                        only: ['anonymous'],
                        redirectTo: 'master.index'
                      }
                    }
                })
                .state('auth.register', {
                  url: '/register',
                  templateUrl: 'templates/auth/register.html',
                  data: {
                    permissions: {
                      only: ['anonymous'],
                      redirectTo: 'master.index'
                    }
                  }
                })
                .state('auth.password-reset', {
                  url: '/reset',
                  templateUrl: 'templates/auth/password-reset.html',
                  data: {
                    permissions: {
                      only: ['anonymous'],
                      redirectTo: 'master.index'
                    }
                  }
                })
                .state('auth.password-reset-form', {
                  url: '/reset-form/:accessToken',
                  templateUrl: 'templates/auth/password-reset-form.html',
                  data: {
                    permissions: {
                      only: ['anonymous'],
                      redirectTo: 'master.index'
                    }
                  }
                });
    }
])

.run(['Permission', 'User', function(Permission, User){
  Permission
  .defineRole('anonymous', function (stateParams) {
    return !User.isAuthenticated();
  })
  .defineRole('registered', function(stateParams) {
    return User.isAuthenticated();
  });

}]);
