(function() {
    'use strict';

    angular
        .module('eaa.directives.utils.modal', [])
        .directive('modalDialog', modalDialog);

    function modalDialog() {
        return {
            restrict: 'E',
            scope: { show: '=' },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive

            link: function(scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width) {
                    scope.dialogStyle.width = attrs.width;
                }
                if (attrs.height) {
                    scope.dialogStyle.height = attrs.height;
                }
                scope.hideModal = function() {
                    scope.show = false;
                };
            },

            template: '<div class="ng-modal" ng-show="show"><div class="ng-modal-overlay" ng-click="hideModal()"></div><div class="ng-modal-dialog" ng-style="dialogStyle"><div class="ng-modal-close" ng-click="hideModal()">X</div><div class="ng-modal-dialog-content" ng-transclude><script src="../scripts/embed/wordl-eaa.js"></script></div></div></div>'
        };
    }
})();
