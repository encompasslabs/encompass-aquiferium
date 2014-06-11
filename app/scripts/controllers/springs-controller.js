'use strict';

angular.module('aquiferiumApp')
  .controller('SpringsCtrl', function ($scope, $location, $anchorScroll) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass = 'springs';

    $scope.resetView = function () {
      $location.hash('.springs');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.goToByScroll = function (slidenumber) {
      // console.log('slide: ' + slidenumber);
      var htmlBody = angular.element(document).find('body').css('class', '.springs');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top
      }, 2000, 'easeInOutQuint');
    };

    $scope.buttonClick = function (e) {
      // console.log('firing click event from controller $scope with e == ' + e.valueOf());
      e.preventDefault();
      var dataslide = angular.element(e.target).attr("data-slide");
      // console.log(dataslide);
      $scope.goToByScroll(dataslide);
    };
  });
