/**
 * Confirm click Directive
 */

angular
    .module('RDash')
    .directive('ngConfirmClick', ngConfirmClick);

function ngConfirmClick() {
	return {
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click', function (event) {
                if ( window.confirm(msg) ) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
};
