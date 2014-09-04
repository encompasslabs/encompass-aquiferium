'use strict';

angular.module('aquiferiumApp')
  .controller('ExploreCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'explore';

    $scope.resetView = function () {
      $location.hash('.explore');
      $anchorScroll();
    };

    $scope.resetView();
  }]);