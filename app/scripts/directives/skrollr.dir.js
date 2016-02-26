(function() {
    'use strict';

    angular
        .module('eaa.directives.skrollr', [])
        .directive('skrollr', Skrollr);

    function Skrollr() {
        var directiveDefinitionObject = {
            compile: false,
            // controller: function($scope, $element) {
            //     console.log('controller for:', $scope.pageClass);
            // },
            controller: false,
            controllerAs: false,
            link: false,
            priority: 0,
            require: false,
            restrict: 'AE',
            scope: false,
            template: false,
            templateUrl: false,
            terminal: false,
            transclude: false,
            type: false
        };

        directiveDefinitionObject.link = function postLink(scope, element) {
            // skrollr.init();
            var s;
            var scrollScale = 1; // Do not adjust - throws off all data- values by scale multiplier.
            var scrollRateModifier = 0.4; // smaller value == faster scroll.

            s = skrollr.init({
                render: function(data) {
                    // document.getElementById('scroll-status').innerHTML = 'scrollPos: ' + data.curTop;
                    if (document.getElementById('scroll-status')) {
                        // console.log('skrollr position element found. populating.');
                        document.getElementById('scroll-status').innerHTML = 'scrollPos: ' + data.curTop;
                        return;
                    } else {
                        // console.log('skrollr position element not found.');
                    }
                    // console.log('scrollPos: ' + data.curTop);
                }
            });

            // Reset the view content when initialized.
            s.refresh();
        };

        return directiveDefinitionObject;
    }
})();
