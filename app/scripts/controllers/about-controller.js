'use strict';

angular.module('aquiferiumApp')
  .controller('AboutCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'about';
    $scope.code = 'SUhtSnl_ZRM';

    $scope.resetView = function () {
      $location.hash('.about');
      $anchorScroll();
    };

    $scope.resetView();
  }]);