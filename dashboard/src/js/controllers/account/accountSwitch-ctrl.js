/**
 * Account Switch Controller
 */

angular
    .module('RDash')
    .controller('accountSwitchCtrl', ['$state', '$stateParams', 'User', 'notificationService', accountSwitchCtrl]);

function accountSwitchCtrl($state, $stateParams, User, notificationService) {

    console.log("accountSwitchCtrl");
    console.log($stateParams.accountId);

    User.getCurrent(function(user, req, err) {
        if (err) {
            notificationService.error('Account could not be changed!');
            $state.go('master.index', {}, {location: true});
        }

        user.defaultAccountId = $stateParams.accountId;
        
        User.prototype$updateAttributes({ id: user.id }, user, function() {
            notificationService.success('Account changed!');
            $state.go('master.index', {}, {location: true});
        }, function() {
            notificationService.error('Account could not be changed!');
            $state.go('master.index', {}, {location: true});
        });
    });
}