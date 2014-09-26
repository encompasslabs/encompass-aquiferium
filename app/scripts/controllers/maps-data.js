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

    // $scope.pageClass = 'maps-data';

    $scope.resetView = function () {
      $location.hash('.maps-data');
      $anchorScroll();
    };

    $scope.resetView();

    // $http.get('../../data/geojson/USA.geo.json')
    $http.get('../../data/geojson/TX.geo.json')
    // $http.get('../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json')
    // $http.get('../../data/geojson/eaa-aquifer-zones-2014.geo.json')
    // $http.get('../../data/geojson/eaa_boundary_EPSG-3081.geo.json')
      .success(function(data, status) {
        angular.extend($scope, {
          geojson: {
            data: data,
            style: {
              fillColor: '#904',
              weight: 1,
              opacity: 0.8,
              color: '#409',
              dashArray: '0',
              fillOpacity: 0.6
            }
          }
        });
      });

    angular.extend($scope, {
      
      pageClass: 'maps-data',

      texas: {
        lat: 31.555502,
        lng: -98.959761,
        zoom: 5
      },

      defaults: {
        // firstlayer in layers object will be used if specified, overrides default.
        // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        maxZoom: 14,
        path: {
          weight: 10,
          color: '#800000',
          opacity: 1
        }
      },

      legend: {
        position: 'bottomleft',
        colors: [ '#904', '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
        labels: [ 'Texas', 'Drainage', 'Recharge', 'Artesian', 'Authority Zone' ]
      },

      markers: {
        eaa: {
          lat: 29.555502,
          lng: -98.959761,
          message: "Edwards Aquifer Authority",
          focus: false, // true means the message box will be visible initially.
          draggable: false
        }
      },

      layers: {
        
        baselayers: {
          landscape: {
            name: 'Landscape',
            url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
            type: 'xyz',
            layerOptions: {
              subdomains: [ 'a', 'b', 'c' ],
              attribution: '&copy; <a href="http://www.thunderforest.com/terms"">ThunderForest</a> terms',
              continuousWorld: true
            }
          },
          osm: {
            name: 'Open Street Map',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz',
            layerOptions: {
              subdomains: [ 'a', 'b', 'c' ],
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              continuousWorld: true
            }
          }
        },

        overlays: {
          texasMajAquifers: {
            name:'Texas Major Aquifers',
            type:'geoJSON',
            url:'../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json',
            layerOptions: {
              style: {
                'color': '#000',
                'fillColor': '#09c',
                'weight': 1.0,
                'opacity': 0.7,
                'fillOpacity': 0.7
              }
            },
            pluginOptions: {
              // cliptiles: true
            }
          }
        }
      }
    })    
  }]);
