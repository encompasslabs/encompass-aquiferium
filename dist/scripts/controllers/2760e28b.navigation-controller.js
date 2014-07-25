'use strict';

angular.module('aquiferiumApp')
  .controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCollapsed = true;

    $scope.$on('$routeChangeSuccess', function () {
      $scope.isCollapsed = true;
    });

    $scope.logLocation = function () {
      console.log($location.$$path);
    };

    $scope.getClass = function (path) {
      if (path === '/') {
        if ($location.path() === '/') {
          return 'active';
        }
      }

      if ($location.path().substr(0, path.length) === path) {
        return 'active';
      }
    };
  }]);
