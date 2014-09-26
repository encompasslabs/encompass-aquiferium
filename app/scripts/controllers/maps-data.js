'use strict';

/**
 * @ngdoc function
 * @name aquiferiumApp.controller:MapsDataCtrl
 * @description
 * # MapsDataCtrl
 * Controller of the aquiferiumApp
 */
angular.module('aquiferiumApp')
  .controller('MapsDataCtrl', ['$scope', '$http', '$location', '$anchorScroll', 'leafletData', function ($scope, $http, $location, $anchorScroll, leafletData) {

    // $scope.pageClass = 'maps-data';

    $scope.resetView = function () {
      $location.hash('.maps-data');
      $anchorScroll();
    };

    $scope.resetView();

    // $http.get('../../data/geojson/USA.geo.json')
    // $http.get('../../data/geojson/TX.geo.json')
    $http.get('../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json')
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
        // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        // maxZoom: 14,
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
          mqosm: {
            name: 'Map Quest OSM',
            url: 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
            type: 'xyz',
            layerOptions: {
              subdomains: [ 'otile1', 'otile2', 'otile3', 'otile4' ],
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
          },
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
          bwmap: {
            name: 'B&W Map',
            url: 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
            type: 'xyz',
            layerOptions: {
              subdomains: [ 'a', 'b', 'c' ],
              attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
              continuousWorld: true
            }
          }
        },

        overlays: {
          majorAquifers: {
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
              cliptiles: true
            }
          },
          buildings: {
            name: 'Buildings',
            type: 'geoJSON',
            url: 'http://tile.openstreetmap.us/vectiles-buildings/{z}/{x}/{y}.json',
            layerOptions: {
              style: {
                "color": "#00D",
                "fillColor": "#00D",
                "weight": 1.0,
                "opacity": 0.6,
                "fillOpacity": .2
              }
            },
            pluginOptions: {
              cliptiles: true
            }
          },
          roads: {
            name: 'Roads',
            type: 'geoJSON',
            url: 'http://tile.openstreetmap.us/vectiles-skeletron/{z}/{x}/{y}.json',
            layerOptions: {
              style: {
                "color": "#DD0000 ",
                "fillColor": "#DD0000",
                "weight": 1.0,
                "fillOpacity": 0.4
              }
            },
            pluginOptions: {
              cliptiles: false
            }
          }
        }
      }
    });

    // $scope.addEasyPrint = function() {
    //   console.log('add easyPrint called.');
    //   console.log(L);
    //   console.log(leafletData);
    //   console.log(leafletData.getMap());

    //   leafletData.getMap().then( function (map) {
    //     console.log('I have the map!');
    //     console.log(map);
    //     L.easyPrint().addTo(map);
    //   });
    // };

    // $scope.addEasyPrint();   

    // L.easyPrint().addTo(map);  // This erros out ove rthe position in the easyPrint file. No tsure what is up here.

  }]);
