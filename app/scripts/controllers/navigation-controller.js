'use strict';

angular.module('aquiferiumApp')
  .controller('NavigationCtrl', function($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isCollapsed = true;

    $scope.$on('$routeChangeSuccess', function() {
      $scope.isCollapsed = true;
    });

    $scope.logLocation = function() {
      console.log($location.$$path);
    };

    $scope.getClass = function(path) {
      if (path === '/') {
        if ($location.path() === '/') {
          return "active";
        } else {
          return "";
        }
      }

      if ($location.path().substr(0, path.length) === path) {
        return "active";
      } else {
        return "";
      }
    };
  });
