'use strict';

angular.module('aquiferiumApp')
  .controller('CavesKarstsCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'caves-karsts';

    $scope.resetView = function () {
      $location.hash('.caveskarsts');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.goToByScroll = function (slidenumber) {
      var navbarHeight = $('#navbar').innerHeight();
      var htmlBody = angular.element(document).find('body').css('class', '.caveskarsts');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
      }, 2000, 'easeInOutQuint');
    };

    $scope.buttonClick = function (e) {
      // console.log('firing click event from controller $scope with e == ' + e.valueOf());
      e.preventDefault();
      var dataslide = angular.element(e.target).attr("data-slide");
      $scope.goToByScroll(dataslide);
    };
  }]);
