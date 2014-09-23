'use strict';

/**
 * @ngdoc function
 * @name aquiferiumApp.controller:MapsDataCtrl
 * @description
 * # MapsDataCtrl
 * Controller of the aquiferiumApp
 */
angular.module('aquiferiumApp')
  .controller('MapsDataCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'maps-data';

    $scope.resetView = function () {
      $location.hash('.maps-data');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.defaults = {
      tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      maxZoom: 14,
      path: {
          weight: 10,
          color: '#800000',
          opacity: 1
      }
    };

    $scope.center = {
      lat: 29.555502,
      lng: -98.959761,
      zoom: 8
    };
    
  }]);
