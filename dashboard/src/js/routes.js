'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
          function success(response) {
            return response;
          }
          function error(response) {
            if (response.status === 401) {
              var LoopBackAuth = $injector.get('LoopBackAuth');

              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();

              $injector.get('$state').go('auth.login', {}, {location: true});
              return $q.reject(response);
            } else {
              return $q.reject(response);
            }
          }
          return function(promise) {
            return promise.then(success, error);
          }
        }];

        $httpProvider.responseInterceptors.push(interceptor);

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
                .state('master.settings', {
                    url: '/settings',
                    templateUrl: 'templates/settings/settings.html'
                })
                .state('master.settingsAccount', {
                    url: '/settings/account',
                    templateUrl: 'templates/settings/my-account.html'
                })
                .state('master.settingsSubscriptions', {
                    url: '/settings/subscriptions',
                    templateUrl: 'templates/settings/subscriptions.html'
                })
                .state('master.accountSwitch', {
                    url: '/account/:accountId/switch',
                    controller: 'accountSwitchCtrl'
                })
                .state('master.listApps', {
                    url: '/apps',
                    controller: 'listAppsCtrl',
                    templateUrl: 'templates/apps/list.html'
                })
                .state('master.createApp', {
                    url: '/app/create',
                    controller: 'createAppCtrl',
                    templateUrl: 'templates/apps/create.html'
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
  .defineRole('registered', function (stateParams) {
    return User.isAuthenticated();
  });

}]);
