'use strict';

angular.module('aquiferiumApp')
  .controller('GeographyCtrl', ['$scope', '$http', '$location', '$anchorScroll', 'leafletData', function ($scope, $http, $location, $anchorScroll, leafletData) {
    $scope.pageClass = 'geography';

    $scope.resetView = function () {
      $location.hash('.geography');
      $anchorScroll();
    };

    // $scope.resetView();

    // $scope.animateTo(10000, 15000, linear);
    // console.log($skrollr.data.curTop);
  }]);