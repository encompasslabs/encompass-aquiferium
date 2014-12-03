'use strict';

angular.module('eaa.directives.maps.leaflet', [])
  .directive('leafletMap', [ function () {
    var directiveDefinitionObject = {
      compile: false,
      controller: false,
      controllerAs: false,
      link: false,
      priority: 0,
      require: false,
      restrict: 'E',
      scope: {},
      template: false,
      templateUrl: false,
      terminal: false,
      transclude: false,
      type: false
    };

    directiveDefinitionObject.link = function postLink (scope, element) {
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
    };

    return directiveDefinitionObject;
  }]);