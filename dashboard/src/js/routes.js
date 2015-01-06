'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('master', {
                templateUrl: 'templates/master.html'
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
                    templateUrl: 'templates/login.html',
                    controller: 'AuthCtrl'
                })
                .state('auth.register', {
                  url: '/register',
                  templateUrl: 'templates/register.html'
                })
                .state('auth.password-reset', {
                  url: '/reset',
                  templateUrl: 'templates/password-reset.html'
                });
    }
]);
