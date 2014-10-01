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

    var texasGeojson = './data/geojson/TX.geo.json';
    var majorAquifersGeojson = './data/geojson/eaa/NEW_major_aquifers_dd_reduced100.geo.json';
    var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa_boundary_EPSG-3081.geo.json';
    var aquiferZonesGeojson = './data/geojson/eaa/eaa-aquifer-zones-2014.geo.json';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';
    // var texasGeojson = '';

    var texas = new L.LayerGroup();
    var majorAquifers = new L.LayerGroup();
    var eaaBoundary = new L.LayerGroup();
    var aquiferZones = new L.LayerGroup();

    $.getJSON(texasGeojson, function(data) {
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

    $.getJSON(majorAquifersGeojson, function(data) {
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
    .setView([31.555502, -98.959761], 6);

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
      "Texas": texas,
      "Major Aquifers": majorAquifers,
      "Aquifer Zones": aquiferZones,
      "EAA Boundary Zone": eaaBoundary      
    };

    L.control.layers(baseLayers,overlays).addTo(map);

    L.control.scale().addTo(map);

    L.Browser.touch = true;

  }]);
