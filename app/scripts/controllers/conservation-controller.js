'use strict';

angular.module('aquiferiumApp')
  .controller('ConservationCtrl', function ($scope, $location, $anchorScroll) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass = 'conservation';

    $scope.resetView = function () {
      $location.hash('.conservation');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.goToByScroll = function (slidenumber) {
      // console.log('slide: ' + slidenumber);
      var navbarHeight = $('#navbar').innerHeight();
      var htmlBody = angular.element(document).find('body').css('class', '.conservation');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
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
