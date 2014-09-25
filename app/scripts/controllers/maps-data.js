'use strict';

/**
 * @ngdoc function
 * @name aquiferiumApp.controller:MapsDataCtrl
 * @description
 * # MapsDataCtrl
 * Controller of the aquiferiumApp
 */
angular.module('aquiferiumApp')
  .controller('MapsDataCtrl', ['$scope', '$http', '$location', '$anchorScroll', function ($scope, $http, $location, $anchorScroll) {
    $scope.pageClass = 'maps-data';

    $scope.resetView = function () {
      $location.hash('.maps-data');
      $anchorScroll();
    };

    $scope.resetView();

    $http.get('../../data/geojson/TX.geo.json').success(function(data, status) {
      // console.log('geojson loaded.');
      // console.log(data);
      // console.log(status);
      angular.extend($scope, {
        geojson: {
          data: data,
          style: {
            fillColor: '#904',
            weight: 2,
            opacity: 1,
            color: '#fff',
            dashArray: '3',
            fillOpacity: 0.6
          }
        },
      });
    });

    $scope.legend = {
      position: 'bottomleft',
      colors: [ '#904', '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
      labels: [ 'Texas', 'Authority Zone', 'Drainage', 'Recharge', 'Artesian' ]
    };

    $scope.layers = {
      baselayers: {
        ocm: {
          name: 'Open Cycle Maps',
          url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
          type: 'xyz'
        },
        osm: {
          name: 'Open Street Map',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz'
        }        
        // // These require Google Maps Library and Google Maps Leaflet Plugin.
        // // https://developers.google.com/maps/documentation/javascript/libraries
        // // https://github.com/shramov/leaflet-plugins
        // googleTerrain: {
        //     name: 'Google Terrain',
        //     layerType: 'TERRAIN',
        //     type: 'google'
        // },
        // googleHybrid: {
        //     name: 'Google Hybrid',
        //     layerType: 'HYBRID',
        //     type: 'google'
        // },
        // googleRoadmap: {
        //     name: 'Google Streets',
        //     layerType: 'ROADMAP',
        //     type: 'google'
        // }
      }
    };

    $scope.markers = {
      eaa: {
        lat: 29.555502,
        lng: -98.959761,
        message: "Edwards Aquifer Authority",
        focus: false, // true means the message box will be visible initially.
        draggable: false
      }
    };

    $scope.texas = {
      lat: 31.555502,
      lng: -98.959761,
      zoom: 5
    };

    $scope.defaults = {
      // firstlayer in layers object will be used if specified, overrides default.
      // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      maxZoom: 14,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      },
    };
    
  }]);
