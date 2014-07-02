'use strict';

angular.module('aquiferiumApp')
  .controller('SpringsCtrl', function ($window, $scope, $location, $anchorScroll) {
    $scope.pageClass = 'springs';

    $scope.hcpurl = 'http://eahcp.org/index.php/about_eahcp/covered_species';

    $scope.trustUrl = function(url) {
      return $sce.trustAsResourceUrl(url);
    };

    $scope.resetView = function () {
      $location.hash('.springs');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.goToByScroll = function (slidenumber) {
      var navbarHeight = $('#navbar').innerHeight();
      var htmlBody = angular.element(document).find('body').css('class', '.springs');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
      }, 2000, 'easeInOutQuint');
    };

    $scope.buttonClick = function (e) {
      console.log('firing click event from controller $scope with e == ' + e.valueOf());
      e.preventDefault();
      var dataslide = angular.element(e.target).attr('data-slide');
      $scope.goToByScroll(dataslide);
    };

    $scope.linkModelFunc = function (url){
      console.log('link model function');
      $window.open(url);
    }
  });
