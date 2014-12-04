'use strict';

angular.module('aquiferiumApp')
  .controller('NavigationCtrl', ['$scope', '$location', '$document', function ($scope, $location, $document) {
    $scope.isCollapsed = true;
    $scope.infoToggled = false;

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

    $scope.toggleInfo = function() {
      if ($scope.infoToggled) {
        // hide info panel.
        $scope.infoToggled = false;
      } else {
        // display info panel.
        $scope.infoToggled = true;
      }
      console.log($scope.infoToggled);
    };

    // var infoPanel = angular.element( elem[0].querySelector('#information'));   // NOT WORKING - elem undefined. Would be good for unit tests.
    // var infoPanel = angular.element( document.querySelector( '#information' ) );   // WORKING.
    // var infoPanel = angular.element.find('#information');  // WORKING.  Prefer this way.

  }]);
