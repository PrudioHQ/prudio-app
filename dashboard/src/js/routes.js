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
                      only: ['registered'],
                      redirectTo: 'auth.login'
                    }
                  }
                });
    }
])

.run(['Permission', 'User', function(Permission, User){
  var u = User.getCurrent(function(usr) {
    console.log(usr);
  }, function(err) { console.log(err);});
  
  Permission
  .defineRole('anonymous', function (stateParams) {
    return !User.isAuthenticated();
  })
  .defineRole('registered', function(stateParams) {
    return User.isAuthenticated();
  });

}]);
