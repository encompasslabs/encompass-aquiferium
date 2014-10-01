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

    $scope.pageClass = 'maps-data';

    $scope.resetView = function () {
      $location.hash('.maps-data');
      $anchorScroll();
    };

    $scope.resetView();

    // var texas = new L.LayerGroup();
    // var majorAquifers = new L.LayerGroup();
    // var eaaBoundary = new L.LayerGroup();
    // var aquiferZones = new L.LayerGroup();

    // $.getJSON('./data/geojson/TX.geo.json', function(data) {
    //   var geojson = L.geoJson(data, {
    //     style: function (feature) {
    //       return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#904', 'stroke-width': '1px', 'color': '#000' };
    //     },
    //     onEachFeature: function (feature, layer) {
    //       layer.bindPopup('Name: ' + feature.properties.name);
    //     }
    //   });
    //   geojson.addTo(texas);
    // });

    // $.getJSON('./data/geojson/NEW_major_aquifers_dd_reduced100.geo.json', function(data) {
    //   var geojson = L.geoJson(data, {
    //     style: function (feature) {
    //       return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#09c', 'stroke-width': '1px', 'color': '#000' };
    //     },
    //     onEachFeature: function (feature, layer) {
    //       layer.bindPopup('Name: ' + feature.properties.AQ_NAME + '<br/> ' + 'Area: ' + feature.properties.AREA + '</br>' + 'Perimeter: ' + feature.properties.PERIMETER);
    //     }
    //   });
    //   geojson.addTo(majorAquifers);
    // });

    // $.getJSON('./data/geojson/eaa_boundary_EPSG-3081.geo.json', function(data) {
    //   var geojson = L.geoJson(data, {
    //     style: function (feature) {
    //       return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#f90', 'stroke-width': '1px', 'color': '#000' };
    //     },
    //     onEachFeature: function (feature, layer) {
    //       layer.bindPopup('EAA Boundary Zone');
    //     }
    //   });
    //   geojson.addTo(eaaBoundary);
    // });

    // $.getJSON('./data/geojson/eaa-aquifer-zones-2014.geo.json', function(data) {
    //   var geojson = L.geoJson(data, {
    //     style: function (feature) {
    //       return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#0f9', 'stroke-width': '1px', 'color': '#000' };
    //     },
    //     onEachFeature: function (feature, layer) {
    //       layer.bindPopup('Name: ' + feature.properties.Name);
    //     }
    //   });
    //   geojson.addTo(aquiferZones);
    // });

    // var mqLink = '<a href="http://www.mapquest.com/">MapQuest</a>';  
    // var mqPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png">';      
    // var mqArialUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg';
    // var mqosmUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
    // var mqArialAttrib = '&copy; ' + mqArialUrl + '. Tiles courtesy of ' + mqLink + mqPic;
    // var mqosmAttrib = 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of ' + mqLink + mqPic;
    // var mqArialMap = L.tileLayer(mqArialUrl, {attribution: mqArialAttrib, subdomains: '1234'});
    // var mqosmMap = L.tileLayer(mqosmUrl, {attribution: mqosmAttrib, subdomains: '1234'});

    // var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    // var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // var osmAttrib = '&copy; ' + osmLink + ' Contributors';
    // var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib});

    // // Performance is poor on this one.
    // var osmBwLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    // var osmBwUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
    // var osmBwAttrib = '&copy; ' + osmBwLink + ' Contributors';
    // var osmBwMap = L.tileLayer(osmBwUrl, {attribution: osmBwAttrib});

    // var thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    // var thunLandscapeUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
    // var thunOutdoorsUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
    // var thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;    
    // var thunLandscapeMap = L.tileLayer(thunLandscapeUrl, {attribution: thunAttrib});
    // var thunOutdoorsMap = L.tileLayer(thunOutdoorsUrl, {attribution: thunAttrib});

    // var stamenLink = '<a href="http://stamen.com">Stamen Design</a>';
    // var stamenUrl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
    // var stamenAttrib = '&copy; ' + mqLink + ' Contributors & ' + stamenLink;
    // var stamenMap = L.tileLayer(stamenUrl, {attribution: stamenAttrib});

    // var esriLink = '<a href="http://www.esri.com/">Esri</a>';
    // var esriWhoLink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    // var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    // var esriAttrib = '&copy; ' + esriLink + ', ' + esriWhoLink;
    // var esriMap = L.tileLayer(esriUrl, {attribution: esriAttrib});




    // // // $http.get('../../data/geojson/USA.geo.json')
    // // // $http.get('../../data/geojson/TX.geo.json')
    // // $http.get('../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json')
    // // // $http.get('../../data/geojson/eaa-aquifer-zones-2014.geo.json')
    // // // $http.get('../../data/geojson/eaa_boundary_EPSG-3081.geo.json')
    // //   .success(function(data, status) {
    // //     angular.extend($scope, {
    // //       geojson: {
    // //         data: data,
    // //         style: {
    // //           fillColor: '#904',
    // //           weight: 1,
    // //           opacity: 0.8,
    // //           color: '#409',
    // //           dashArray: '0',
    // //           fillOpacity: 0.6
    // //         }
    // //       }
    // //     });
    // //   });

    // angular.extend($scope, {
      
    //   pageClass: 'maps-data',

    //   texas: {
    //     lat: 31.555502,
    //     lng: -98.959761,
    //     zoom: 5
    //   },

    //   defaults: {
    //     // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
    //     tileLayer: mqArialUrl,
    //     // maxZoom: 14,
    //     path: {
    //       weight: 10,
    //       color: '#800000',
    //       opacity: 1
    //     }
    //   },

    //   legend: {
    //     position: 'bottomleft',
    //     colors: [ '#904', '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
    //     labels: [ 'Texas', 'Drainage', 'Recharge', 'Artesian', 'Authority Zone' ]
    //   },

    //   markers: {
    //     eaa: {
    //       lat: 29.555502,
    //       lng: -98.959761,
    //       message: "Edwards Aquifer Authority",
    //       focus: false, // true means the message box will be visible initially.
    //       draggable: false
    //     }
    //   },

    //   layers: {
        
    //     baselayers: {

    //       mqosm: {
    //         name: 'Map Quest OSM',
    //         url: 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
    //         type: 'xyz',
    //         layerOptions: {
    //           subdomains: [ 'otile1', 'otile2', 'otile3', 'otile4' ],
    //           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //           continuousWorld: true
    //         }
    //       },
    //       osm: {
    //         name: 'Open Street Map',
    //         url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //         type: 'xyz',
    //         layerOptions: {
    //           subdomains: [ 'a', 'b', 'c' ],
    //           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //           continuousWorld: true
    //         }
    //       },
    //       landscape: {
    //         name: 'Landscape',
    //         url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
    //         type: 'xyz',
    //         layerOptions: {
    //           subdomains: [ 'a', 'b', 'c' ],
    //           attribution: '&copy; <a href="http://www.thunderforest.com/terms"">ThunderForest</a> terms',
    //           continuousWorld: true
    //         }
    //       },
    //       bwmap: {
    //         name: 'B&W Map',
    //         url: 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
    //         type: 'xyz',
    //         layerOptions: {
    //           subdomains: [ 'a', 'b', 'c' ],
    //           attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    //           continuousWorld: true
    //         }
    //       }
    //     },

    //     overlays: {
    //       // wms: {
    //       //   name: 'EEUU States (WMS)',
    //       //   type: 'wms',
    //       //   visible: false,
    //       //   url: 'http://suite.opengeo.org/geoserver/usa/wms',
    //       //   layerParams: {
    //       //     layers: 'usa:states',
    //       //     format: 'image/png',
    //       //     transparent: true
    //       //   }
    //       // },

    //       // majorAquifers: {
    //       //   name:'Texas Major Aquifers',
    //       //   type:'geoJSON',
    //       //   visible: false,
    //       //   url:'../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json',
    //       //   layerParams: {
    //       //     format: 'data/geoJSON'
    //       //   },
    //       //   layerOptions: {
    //       //     style: {
    //       //       'color': '#000',
    //       //       'fillColor': '#09c',
    //       //       'weight': 1.0,
    //       //       'opacity': 0.7,
    //       //       'fillOpacity': 0.7
    //       //     }
    //       //   },
    //         // pluginOptions: {
    //         //   cliptiles: true
    //         // }
    //       // }
    //     }
    //   }
    // });
    // //       // buildings: {
    // //       //   name: 'Buildings',
    // //       //   type: 'geoJSON',
    // //       //   url: 'http://tile.openstreetmap.us/vectiles-buildings/{z}/{x}/{y}.json',
    // //       //   layerOptions: {
    // //       //     style: {
    // //       //       "color": "#00D",
    // //       //       "fillColor": "#00D",
    // //       //       "weight": 1.0,
    // //       //       "opacity": 0.6,
    // //       //       "fillOpacity": .2
    // //       //     }
    // //       //   },
    // //       //   pluginOptions: {
    // //       //     cliptiles: true
    // //       //   }
    // //       // },
    // //       // roads: {
    // //       //   name: 'Roads',
    // //       //   type: 'geoJSON',
    // //       //   url: 'http://tile.openstreetmap.us/vectiles-skeletron/{z}/{x}/{y}.json',
    // //       //   layerOptions: {
    // //       //     style: {
    // //       //       "color": "#DD0000 ",
    // //       //       "fillColor": "#DD0000",
    // //       //       "weight": 1.0,
    // //       //       "fillOpacity": 0.4
    // //       //     }
    // //       //   },
    // //       //   pluginOptions: {
    // //       //     cliptiles: false
    // //       //   }
    // //       // }
    // //     }
    // //   }
    // // });

    // // $scope.addEasyPrint = function() {
    // //   console.log('add easyPrint called.');
    // //   console.log(L);
    // //   console.log(leafletData);
    // //   console.log(leafletData.getMap());

    // //   leafletData.getMap().then( function (map) {
    // //     console.log('I have the map!');
    // //     console.log(map);
    // //     L.easyPrint().addTo(map);
    // //   });
    // // };

    // // $scope.addEasyPrint();   

    // // L.easyPrint().addTo(map);  // This erros out ove rthe position in the easyPrint file. No tsure what is up here.




    var texas = new L.LayerGroup();
    var majorAquifers = new L.LayerGroup();
    var eaaBoundary = new L.LayerGroup();
    var aquiferZones = new L.LayerGroup();

    $.getJSON('./data/geojson/TX.geo.json', function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature) {
          return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#904', 'stroke-width': '1px', 'color': '#000' };
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup('Name: ' + feature.properties.name);
        }
      });
      geojson.addTo(texas);
    });

    $.getJSON('./data/geojson/NEW_major_aquifers_dd_reduced100.geo.json', function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature) {
          return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#09c', 'stroke-width': '1px', 'color': '#000' };
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup('Name: ' + feature.properties.AQ_NAME + '<br/> ' + 'Area: ' + feature.properties.AREA + '</br>' + 'Perimeter: ' + feature.properties.PERIMETER);
        }
      });
      geojson.addTo(majorAquifers);
    });

    $.getJSON('./data/geojson/eaa_boundary_EPSG-3081.geo.json', function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature) {
          return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#f90', 'stroke-width': '1px', 'color': '#000' };
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup('EAA Boundary Zone');
        }
      });
      geojson.addTo(eaaBoundary);
    });

    $.getJSON('./data/geojson/eaa-aquifer-zones-2014.geo.json', function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature) {
          return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#0f9', 'stroke-width': '1px', 'color': '#000' };
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup('Name: ' + feature.properties.Name);
        }
      });
      geojson.addTo(aquiferZones);
    });

    var mqLink = '<a href="http://www.mapquest.com/">MapQuest</a>';  
    var mqPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png">';      
    var mqArialUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg';
    var mqosmUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
    var mqArialAttrib = '&copy; ' + mqArialUrl + '. Tiles courtesy of ' + mqLink + mqPic;
    var mqosmAttrib = 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of ' + mqLink + mqPic;
    var mqArialMap = L.tileLayer(mqArialUrl, {attribution: mqArialAttrib, subdomains: '1234'});
    var mqosmMap = L.tileLayer(mqosmUrl, {attribution: mqosmAttrib, subdomains: '1234'});

    var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = '&copy; ' + osmLink + ' Contributors';
    var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib});

    // Performance is poor on this one.
    var osmBwLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var osmBwUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
    var osmBwAttrib = '&copy; ' + osmBwLink + ' Contributors';
    var osmBwMap = L.tileLayer(osmBwUrl, {attribution: osmBwAttrib});

    var thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    var thunLandscapeUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
    var thunOutdoorsUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
    var thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;    
    var thunLandscapeMap = L.tileLayer(thunLandscapeUrl, {attribution: thunAttrib});
    var thunOutdoorsMap = L.tileLayer(thunOutdoorsUrl, {attribution: thunAttrib});

    var stamenLink = '<a href="http://stamen.com">Stamen Design</a>';
    var stamenUrl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
    var stamenAttrib = '&copy; ' + mqLink + ' Contributors & ' + stamenLink;
    var stamenMap = L.tileLayer(stamenUrl, {attribution: stamenAttrib});

    var esriLink = '<a href="http://www.esri.com/">Esri</a>';
    var esriWhoLink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    var esriAttrib = '&copy; ' + esriLink + ', ' + esriWhoLink;
    var esriMap = L.tileLayer(esriUrl, {attribution: esriAttrib});

    var map = L.map('map', {
      layers: [mqArialMap] // only add one!
    })
    .setView([31.555502, -98.959761], 6);

    var baseLayers = {
      "MapQuest Arial": mqArialMap,
      "MapQuest OSM": mqosmMap,
      "OSM Mapnik": osmMap,
      "OSM BW": osmBwMap,
      "Landscape": thunLandscapeMap,
      "Outdoors": thunOutdoorsMap,
      "Stamen Map": stamenMap,
      "ESRI World Imagery": esriMap
    };

    var overlays = {
      "Texas": texas,
      "Major Aquifers": majorAquifers,
      "Aquifer Zones": aquiferZones,
      "EAA Boundary Zone": eaaBoundary      
    };

    L.control.layers(baseLayers,overlays).addTo(map);

    L.control.scale().addTo(map);

    L.Browser.touch = true;

  }]);
