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
      // $anchorScroll();
    };

    var dataPanelVisible = false;
    var rechargeVisible = false;
    var wellsVisible = false;
    var springsVisible = false;

    console.log(dataPanelVisible, rechargeVisible, wellsVisible, springsVisible);

    var togglePanel = function(target) {
      $(target).toggleClass('open-panel');
    };

    var toggleSlide = function(target) {
      $(target).toggleClass('open');
    };

    var displayPanel = function() {
      console.log('toggling panel');
      if (dataPanelVisible) {
        console.log('panel was open');
        selectSlide('close');
        togglePanel('#data-panel');
        dataPanelVisible = false;
        document.getElementById('toggle-data-panel').innerHTML = 'Show Data';
      } else {
        console.log('panel was closed');
        togglePanel('#data-panel');
        dataPanelVisible = true;
        document.getElementById('toggle-data-panel').innerHTML = 'Hide Data';
      }
    };

    var selectSlide = function(target) {
      if (target === 'recharge') {
        console.log('recharge');
        if(wellsVisible) {
          toggleSlide('#wells-backdrop');
          wellsVisible = false;
        }
        if(springsVisible) {
          toggleSlide('#springs-backdrop');
          springsVisible = false;
        }        
        if(rechargeVisible) {
          toggleSlide('#recharge-backdrop');
          rechargeVisible = false;
        } else {
          toggleSlide('#recharge-backdrop');
          rechargeVisible = true;
        }
      } else if (target === 'wells') {
        console.log('wells');
        if(rechargeVisible) {
          toggleSlide('#recharge-backdrop');
          rechargeVisible = false;
        }
        if(springsVisible) {
          toggleSlide('#springs-backdrop');
          springsVisible = false;
        }        
        if(wellsVisible) {
          toggleSlide('#wells-backdrop');
          wellsVisible = false;
        } else {
          toggleSlide('#wells-backdrop');
          wellsVisible = true;
        }
      } else if (target === 'springs') {
        console.log('springs');
        if(rechargeVisible) {
          toggleSlide('#recharge-backdrop');
          rechargeVisible = false;
        }
        if(wellsVisible) {
          toggleSlide('#wells-backdrop');
          wellsVisible = false;
        }        
        if(springsVisible) {
          toggleSlide('#springs-backdrop');
          springsVisible = false;
        } else {
          toggleSlide('#springs-backdrop');
          springsVisible = true;
        }
      } else if (target === 'close') {
        console.log('close');
        if(rechargeVisible) {
          toggleSlide('#recharge-backdrop');
          rechargeVisible = false;
        }
        if(wellsVisible) {
          toggleSlide('#wells-backdrop');
          wellsVisible = false;
        }        
        if(springsVisible) {
          toggleSlide('#springs-backdrop');
          springsVisible = false;
        }
      }
      console.log(dataPanelVisible, rechargeVisible, wellsVisible, springsVisible);
    };

    $('#toggle-data-panel').on('click', function(){
      displayPanel();
    });

    $('#toggle-recharge-data').on('click', function(){
      selectSlide('recharge');
    });

    $('#toggle-wells-data').on('click', function(){
      selectSlide('wells');
    });

    $('#toggle-springs-data').on('click', function(){
      selectSlide('springs');
    });

    // Only populating on refresh.
    // Rest of map disappears on refresh.
    // WTF?!
    $scope.legend = {
      position: 'bottomleft',
      colors: [ '#904', '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
      labels: [ 'Texas', 'Drainage', 'Recharge', 'Artesian', 'Authority Zone' ]
    };

    var usaGeojson = './data/geojson/USA.geo.json';
    // var usaGeojson = './data/geojson/gz_2010_us_outline_20m.json';  // Outline only.
    var texasGeojson = './data/geojson/TX.geo.json';
    var majorAquifersGeojson = './data/geojson/eaa/NEW_major_aquifers_dd_reduced10.lco3.geo.json';
    // var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa_boundary_EPSG-3081.geo.json';
    // var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa-boundary.json';   // Doe snot render - may be missing geoprojection.
    var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa_boundary.geo.json';
    var aquiferZonesGeojson = './data/geojson/eaa/eaa-aquifer-zones-2014.geo.json';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';

    var usa = new L.LayerGroup();
    var texas = new L.LayerGroup();
    var majorAquifers = new L.LayerGroup();
    var eaaBoundary = new L.LayerGroup();
    var aquiferZones = new L.LayerGroup();

   var majorAquiferStyle = {
        "clickable": true,
        "color": "#08D",
        "fillColor": "#08D",
        "weight": 1.0,
        "opacity": 0.7,
        "fillOpacity": 0.5
    };

    var majorAquiferStyleHover = {
        "fillOpacity": 0.8
    };

    $.getJSON(usaGeojson, function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature) {
          return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#99f', 'stroke-width': '1', 'color': '#000' };
        },
        onEachFeature: function (feature, layer) {
          // layer.bindPopup('Name: ' + feature.properties.name);
          
        }
      });
      geojson.addTo(usa);
    });

    $.getJSON(texasGeojson, function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature) {
          return { 'opacity' : '0.9', 'fillOpacity' : '0.9', 'fillColor': '#904', 'stroke-width': '1', 'color': '#000' };
        },
        onEachFeature: function (feature, layer) {
          // layer.bindPopup('Name: ' + feature.properties.name);
        
        }
      });
      geojson.addTo(texas);
    });

    $.getJSON(majorAquifersGeojson, function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature, layer) {
          return majorAquiferStyle;
        },
        onEachFeature: function (feature, layer) {
          if (feature.properties) {
            var popupString = '<div class="popup">';
            for (var k in feature.properties) {
              var v = feature.properties[k];
              popupString += k + ': ' + v + '<br />';
            }
            popupString += '</div>';
            layer.bindPopup(popupString);
            // layer.bindPopup('Name: ' + feature.properties.AQ_NAME + '<br/> ' + 'Area: ' + feature.properties.AREA + '</br>' + 'Perimeter: ' + feature.properties.PERIMETER);
          }
          if (!(layer instanceof L.Point)) {
            layer.on('mouseover', function () {
              layer.setStyle(majorAquiferStyleHover);
            });
            layer.on('mouseout', function () {
              layer.setStyle(majorAquiferStyle);
            });
          }
        }
      });
      geojson.addTo(majorAquifers);
    });

    $.getJSON(eaaBoundaryZonesGeojson, function(data) {
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

    $.getJSON(aquiferZonesGeojson, function(data) {
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

    var mqArialUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg';
    var mqosmUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmBwUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
    var thunLandscapeUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
    var thunOutdoorsUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
    var stamenUrl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
    var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    var mqLink = '<a href="http://www.mapquest.com/">MapQuest</a>';  
    var mqPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
    var stamenLink = '<a href="http://stamen.com">Stamen Design</a>';
    var esriLink = '<a href="http://www.esri.com/">Esri</a>';
    var esriWhoLink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

    var mqArialAttrib = 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of ' + mqLink + mqPic;
    var mqosmAttrib = '&copy; ' + osmLink + '. Tiles courtesy of ' + mqLink + mqPic;
    var osmAttrib = '&copy; ' + osmLink + ' Contributors';
    var thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;    
    var stamenAttrib = '&copy; ' + mqLink + ' Contributors & ' + stamenLink;
    var esriAttrib = '&copy; ' + esriLink + ', ' + esriWhoLink;

    var mqArialMap = L.tileLayer(mqArialUrl, {attribution: mqArialAttrib, subdomains: '1234'});
    var mqosmMap = L.tileLayer(mqosmUrl, {attribution: mqosmAttrib, subdomains: '1234'});
    var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib});
    var osmBwMap = L.tileLayer(osmBwUrl, {attribution: osmAttrib});
    var thunLandscapeMap = L.tileLayer(thunLandscapeUrl, {attribution: thunAttrib});
    var thunOutdoorsMap = L.tileLayer(thunOutdoorsUrl, {attribution: thunAttrib});    
    var stamenMap = L.tileLayer(stamenUrl, {attribution: stamenAttrib});    
    var esriMap = L.tileLayer(esriUrl, {attribution: esriAttrib});

    var map = L.map('map', {
      layers: [mqArialMap] // only add one!
    })
    .setView([31.555502, -98.959761], 5);

    var baseLayers = {
      "MapQuest Open Arial": mqArialMap,
      "MapQuest-OSM": mqosmMap,
      "Open Street Map OSM Mapnik": osmMap,
      "Open Street Map OSM Black and White": osmBwMap,
      "Thunderforest Landscape": thunLandscapeMap,
      "Thunderforest Outdoors": thunOutdoorsMap,
      "Stamen Watercolor": stamenMap,
      "ESRI World Imagery": esriMap
    };

    var overlays = {
      "USA": usa,
      "Texas": texas,
      "Major Aquifers": majorAquifers,
      "Aquifer Zones": aquiferZones,
      "EAA Boundary Zone": eaaBoundary      
    };

    L.control.layers(baseLayers,overlays).addTo(map);

    L.control.scale().addTo(map);

    L.Browser.touch = true;

    

    
    // L.legend.addTo(map);
    // map.legendControl.addLegend(legend);

    // L.control.add(legend);


    // var info = L.control({position: 'bottomleft'});

    // info.onAdd = function (map) {
    //     this._div = L.DomUtil.create('div', 'legend'); // create a div with a class "info"
    //     this.update();
    //     return this._div;
    // };

    // var legend = L.control({position: 'topleft'});  
    // legend.onAdd = function (map) {

    // var div = L.DomUtil.create('div', 'info legend'),
    //     grades = [50, 100, 150, 200, 250, 300],
    //     labels = ['<strong> THE TITLE </strong>'],
    //     from, to;

    // for (var i = 0; i < grades.length; i++) {
    //     from = grades [i];
    //     to = grades[i+1]-1;

    // labels.push(
    //     '<i style="background:' + getColor(from + 1) + '"></i> ' +
    //     from + (to ? '&ndash;' + to : '+'));
    //     }
    //     div.innerHTML = labels.join('<br>');
    //     return div;
    //     };




    // $scope.resetView();  // Causes the page to hang. Why?
  }]);
