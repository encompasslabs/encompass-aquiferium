'use strict';

angular.module('aquiferiumApp')
  .controller('ExploreCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'explore';

    $scope.resetView = function () {
      $location.hash('.explore');
      $anchorScroll();
    };

    $scope.resetView();

    // $scope.animateTo(10000, 15000, linear);
    // console.log($skrollr.data.curTop);
  }]);