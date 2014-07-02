'use strict';

angular.module('aquiferiumApp')
  .controller('ConservationCtrl', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'conservation';

    $scope.resetView = function () {
      $location.hash('.conservation');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.goToByScroll = function (slidenumber) {
      var navbarHeight = $('#navbar').innerHeight();
      var htmlBody = angular.element(document).find('body').css('class', '.conservation');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
      }, 2000, 'easeInOutQuint');
    };

    $scope.buttonClick = function (e) {
      e.preventDefault();
      var dataslide = angular.element(e.target).attr("data-slide");
      $scope.goToByScroll(dataslide);
    };

    $scope.randomColor = function () {
      var newColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
      return newColor;
    };    
  });
