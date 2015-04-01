/**
 * Account Switch Controller
 */

angular
    .module('RDash')
    .controller('accountSwitchCtrl', ['$state', '$scope', '$stateParams', 'User', 'notificationService', accountSwitchCtrl]);

function accountSwitchCtrl($state, $scope, $stateParams, User, notificationService) {


    User.getCurrent(function(user, req, err) {
        if (err) {
            notificationService.error('Account could not be changed!');
            $state.go('master.index', {}, {location: true});
        }

        User.prototype$updateAttributes({ id: user.id }, { defaultAccountId: $stateParams.accountId }, function() {
            notificationService.success('Account changed!');
            $scope.$emit('retrieveAccounts');
            $state.go('master.index', {}, {location: true});
        }, function() {
            notificationService.error('Account could not be changed!');
            $state.go('master.index', {}, {location: true});
        });
    });
}
