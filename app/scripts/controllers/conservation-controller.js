'use strict';

angular.module('aquiferiumApp')
  .controller('ConservationCtrl', ['$window', '$scope', '$location', '$anchorScroll','$http', '$timeout', function ($window, $scope, $location, $anchorScroll, $http, $timeout) {

    $scope.pageClass = 'conservation';
    $scope.urlHcp = 'http://eahcp.org';
    $scope.src_wordl = '../scripts/embed/wordl-eaa.js';
    // $scope.modalShown = false;
    // $scope.myWindow = angular.element($window);
    $scope.urlWordl = 'http://www.edwardsaquifer.org/'; // Need to point to world on server.

    $scope.linkModelFunc = function (url) {
      $window.open(url);
    };

    $scope.resetView = function () {
      $location.hash('.conservation');
      $anchorScroll();
    };

    $scope.goToByScroll = function (slidenumber) {
      var navbarHeight = $('#navbar').innerHeight();
      var htmlBody = angular.element(document).find('body').css('class', '.conservation');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
      }, 2000, 'easeInOutQuint');
    };

    $scope.buttonClick = function (e) {
      // console.log('firing click event from controller $scope with e == ' + e.valueOf());
      e.preventDefault();
      var dataslide = angular.element(e.target).attr('data-slide');
      $scope.goToByScroll(dataslide);
    };

    $scope.fullscreenWordl = function () {
      console.log('Go to the wordl.');
    };

    
    // $scope.toggleModal = function() {
    //   $scope.modalShown = !$scope.modalShown;
    //   console.log('modal toggled.', $scope.modalShown);

    //   // $scope.script = {}; //document.createElement('script');
    //   // $scope.script.src = $scope.src_wordl;
    //   // $scope.script.async = false;
    //   // // console.log($scope.script.src);

    //   // $scope.targetElement = document.getElementById('wordlObject');
    //   // // console.log($scope.targetElement);

    //   // // $scope.targetElement.innerHTML = '<div onload="displayWordl()"></div>';
    //   // $scope.targetElement.innerHTML = ('<script src="' + $scope.script.src + '"></script>');
    // };

    $scope.resetView();

    // $scope.myWindow.on("scroll", function() {

    //   // console.log('scrolling...');
    //   // console.log($scope.modalShown);

    //   if($scope.modalShown) {
    //     // console.log('its TRUE!');

    //     // $scope.toggleModal();

    //     // $scope.el = document.getElementById('modal-world');
    //     // angular.element($scope.el).triggerHandler('ng-click');

    //     // $timeout(function() {
    //     //     angular.element($scope.el).triggerHandler('click');
    //     // }, 0);
    //   } else {
    //     // console.log('filthy LIES!!!!');
    //   }
    // });

  }]);
