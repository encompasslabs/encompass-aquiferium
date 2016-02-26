(function() {
    'use strict';

    angular
        .module('aquiferiumApp')
        .controller('NavigationCtrl', NavigationCtrl);

    NavigationCtrl.$inject = ['$scope', '$location', '$document', '$window'];

    function NavigationCtrl($scope, $location, $document, $window) {
        $scope.isCollapsed = true;
        $scope.infoToggled = false;
        $scope.code = 'SUhtSnl_ZRM';

        $scope.$on('$routeChangeStart', function() {
            if ($scope.infoToggled) {
                // console.log('true');
                $scope.togglePanel('#info-panel');
            }
        });

        $scope.$on('$routeChangeSuccess', function() {
            $scope.isCollapsed = true;
            $window.scrollTo(0, top);
        });

        $scope.logLocation = function() {
            // console.log($location.$$path);
        };

        $scope.getClass = function(path) {
            if (path === '/') {
                if ($location.path() === '/') {
                    // console.log($location.path());
                    return 'active';
                }
            }

            if ($location.path().substr(0, path.length) === path) {
                // console.log($location.path());
                return 'active';
            }
        };

        $scope.toggleSlide = function(target) {
            $(target).toggleClass('open');
        };

        $scope.togglePanel = function(target) {
            $(target).toggleClass('open-panel-top-50');
            $scope.infoToggled = !$scope.infoToggled;
        };

        $scope.toggleFullScreen = function() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) || // alternative standard method
                (!document.mozFullScreen && !document.webkitIsFullScreen)) { // current working methods
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        };

    }
})();
