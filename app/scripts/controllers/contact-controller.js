'use strict';

angular.module('aquiferiumApp')
  .controller('ContactCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'contact';

    $scope.resetView = function () {
      $location.hash('.contact');
      $anchorScroll();
    };

    $scope.resetView();
  }]);
