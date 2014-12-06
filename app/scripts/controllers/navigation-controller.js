'use strict';

angular.module('aquiferiumApp')
  .controller('NavigationCtrl', ['$scope', '$location', '$document', function ($scope, $location, $document) {
    $scope.isCollapsed = true;
    $scope.infoToggled = false;
    $scope.code = 'SUhtSnl_ZRM';

    $scope.$on('$routeChangeStart', function () {
      if($scope.infoToggled) {
        console.log('true');
        $scope.togglePanel('#info-panel');
      }
    });

    $scope.$on('$routeChangeSuccess', function () {
      $scope.isCollapsed = true;
    });

    $scope.logLocation = function () {
      console.log($location.$$path);
    };

    $scope.getClass = function (path) {
      if (path === '/') {
        if ($location.path() === '/') {
          // console.log('if /: ' + $location.path());
          return 'active';
        }
      }

      if ($location.path().substr(0, path.length) === path) {
        // console.log('if not /: ' + $location.path());        
        return 'active';
      }
    };

    $scope.toggleSlide = function(target) {
      $(target).toggleClass('open');
    };

    $scope.togglePanel = function (target) {
      $(target).toggleClass('open-panel-top-50');
      $scope.infoToggled = !$scope.infoToggled;
      // console.log('panel toggled.');
    };

    $scope.toggleFullScreen = function() {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
          (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    };

    // var infoPanel = angular.element( elem[0].querySelector('#information'));   // NOT WORKING - elem undefined. Would be good for unit tests.
    // var infoPanel = angular.element( document.querySelector( '#information' ) );   // WORKING.
    // var infoPanel = angular.element.find('#information');  // WORKING.  Prefer this way.

  }]);
