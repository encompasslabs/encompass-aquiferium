(function() {
    'use strict';

    angular
        .module('aquiferiumApp')
        .controller('SpringsCtrl', SpringsCtrl);

    SpringsCtrl.$inject = ['$window', '$scope', '$location', '$anchorScroll'];

    function SpringsCtrl($window, $scope, $location, $anchorScroll) {
        $scope.pageClass = 'springs';

        $scope.urlHcp = 'http://eahcp.org';

        $scope.linkModelFunc = function(url) {
            $window.open(url);
        };

        $scope.resetView = function() {
            $location.hash('.springs');
            $anchorScroll();
        };

        $scope.resetView();

        $scope.goToByScroll = function(slidenumber) {
            var navbarHeight = $('#navbar').innerHeight();
            var htmlBody = angular.element(document).find('body').css('class', '.springs');
            htmlBody.animate({
                scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
            }, 2000, 'easeInOutQuint');
        };

        $scope.buttonClick = function(e) {
            // console.log('firing click event from controller $scope with e == ' + e.valueOf());
            e.preventDefault();
            var dataslide = angular.element(e.target).attr('data-slide');
            $scope.goToByScroll(dataslide);
        };
    }
})();
