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

    // Not populating.
    $scope.legend = {
      position: 'bottomleft',
      colors: [ '#904', '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
      labels: [ 'Texas', 'Drainage', 'Recharge', 'Artesian', 'Authority Zone' ]
    };

    var dataPanelVisible = false;
    var rechargeVisible = false;
    var wellsVisible = false;
    var springsVisible = false;

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
      // console.log(dataPanelVisible, rechargeVisible, wellsVisible, springsVisible);
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

    // Map

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
      'MapQuest Open Arial': mqArialMap,
      'MapQuest-OSM': mqosmMap,
      'Open Street Map OSM Mapnik': osmMap,
      'Open Street Map OSM Black and White': osmBwMap,
      'Thunderforest Landscape': thunLandscapeMap,
      'Thunderforest Outdoors': thunOutdoorsMap,
      'Stamen Watercolor': stamenMap,
      'ESRI World Imagery': esriMap
    };

    // Geojson to display.

    var usaGeojson = './data/geojson/USA.geo.json';
    // var usaGeojson = './data/geojson/gz_2010_us_outline_20m.json';  // Outline only.
    var texasGeojson = './data/geojson/TX.geo.json';
    // var majorAquifersGeojson = './data/geojson/eaa/NEW_major_aquifers_dd_reduced10.lco3.geo.json';
    var majorAquifersGeojson = './data/geojson/eaa/NEW_major_aquifers_dd_reduced100.geo.json';
    // var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa_boundary.geo.json';
    var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa_boundary_EPSG-3081.geo.json';
    var aquiferZonesGeojson = './data/geojson/eaa/eaa-aquifer-zones-2014.geo.json';

    // ALL of these render as the aquifer zones. Must have bad shp files or need to do something different to export for geojson.
    // var hatchedAreaGeojson = './data/geojson/eaa/713-H_HatchedArea.geo.json';
    // var directorDistrictsGeojson = './data/geojson/eaa/DirectorDistricts2014._optimized.EPSG4326.geo.json';
    // var basinsGeojson = './data/geojson/eaa/basins_dd.geo.json';
    // var precipitationGeojson = './data/geojson/eaa/precipitation_lin.geo.json';
    // var hucddGeojson = './data/geojson/eaa/tx_hucdd.geo.json';
    // var majorRiversGeojson = './data/geojson/eaa/MajorRivers_dd83.geo.json';
    // var minorAquifersGeojson = './data/geojson/eaa/NEW_minor_aquifers_dd.geo.json';
    // var reservoirsGeojson = './data/geojson/eaa/Existing_Reservoirs_2007_dd.geo.json';

    // Styles for geojson layers.

    var color_black = '#000000';
    var color_grey = '#4D4B5B';
    var color_white = '#FFFFFF';
    var color_brown = '#C9985B';
    var color_purple = '#91278D';
    var color_blue = '#539CBE';
    var color_green = '#018752';
    var color_lime = '#C9FA58';
    var color_yellow = '#F9E555';
    var color_gold = '#FAA635';
    var color_orange = '#F2572A';
    var color_red = '#D21245';

    var weight = 1.0;
    var opacity = 1.0;
    var fillOpacity = 0.7;
    var fillOpacityHover = 1.0;

    // Earlier objects override later objects.
    var mergeObjects = function() {
      var o = {}
      for (var i = arguments.length - 1; i >= 0; i --) {
        var s = arguments[i]
        for (var k in s) o[k] = s[k]
      }
      return o
    };

    var baseStyle = {
      'clickable': true,
      'color': color_black,
      'fillColor': color_grey,
      'weight': weight,
      'opacity': opacity,
      'fillOpacity': fillOpacity
    };

    var baseStyleHover = {
      'fillOpacity': fillOpacityHover
    };

    var usaStyle = { 'fillColor': color_blue };
    var texasStyle = { 'fillColor': color_red };
    var majorAquiferStyle = { 'fillColor': color_blue };
    var eaaBoundaryZonesStyle = { 'fillColor': color_yellow };
    var aquiferZonesStyle = { 'fillColor': color_green };
    // var hatchedAreaStyle = { 'fillColor': color_grey };
    // var directorDistrictsStyle = { 'fillColor': color_purple };
    // var basinsStyle = { 'fillColor': color_orange };
    // var precipitationStyle = { 'fillColor': color_green };
    // var hucddStyle = { 'fillColor': color_green };
    // var majorRiversStyle = { 'fillColor': color_gold };
    // var minorAquifersStyle = { 'fillColor': color_blue };
    // var reservoirsStyle = { 'fillColor': color_brown };

    // Geojson interaction.

    var geojsonHandler = function (feature, layer, style) {
      if (feature.properties) {
        var popupString = '<div class="popup">';
        for (var k in feature.properties) {
          var v = feature.properties[k];
          popupString += k + ': ' + v + '<br />';
        }
        popupString += '</div>';
        layer.bindPopup(popupString);
      }
      if (!(layer instanceof L.Point)) {
        layer.on('mouseover', function () {
          layer.setStyle(baseStyleHover);
        });
        layer.on('mouseout', function () {
          var thisStyle = mergeObjects(style, baseStyle);
          layer.setStyle(thisStyle);
        });
      }
    };

    // Load geojson.

    var usaLayer = new L.LayerGroup();
    var texasLayer = new L.LayerGroup();
    var majorAquifersLayer = new L.LayerGroup();
    var aquiferZonesLayer = new L.LayerGroup();
    var eaaBoundaryLayer = new L.LayerGroup();
    // var hatchedAreaLayer = new L.LayerGroup();
    // var directorDistrictsLayer = new L.LayerGroup();
    // var basinsLayer = new L.LayerGroup();
    // var precipitationLayer = new L.LayerGroup();
    // var hucddLayer = new L.LayerGroup();
    // var majorRiversLayer = new L.LayerGroup();
    // var minorAquifersLayer = new L.LayerGroup();
    // var reservoirsLayer = new L.LayerGroup();

    var processGeojson = function(data, layerStyle, layerGroup) {
      var geojson = L.geoJson(data, {
        style: function (feature, layer) {
          var thisStyle = mergeObjects(layerStyle, baseStyle);
          return thisStyle;
        },
        onEachFeature: function (feature, layer) {
          geojsonHandler(feature, layer, layerStyle);
        }
      });
      geojson.addTo(layerGroup);
    };

    $.getJSON(usaGeojson, function(data) {
      processGeojson(data, usaStyle, usaLayer);
    });

    $.getJSON(texasGeojson, function(data) {
      processGeojson(data, texasStyle, texasLayer);
    });

    $.getJSON(majorAquifersGeojson, function(data) {
      processGeojson(data, majorAquiferStyle, majorAquifersLayer);
    });

    $.getJSON(aquiferZonesGeojson, function(data) {
      processGeojson(data, aquiferZonesStyle, aquiferZonesLayer);
    });

    $.getJSON(eaaBoundaryZonesGeojson, function(data) {
      var geojson = L.geoJson(data, {
        style: function (feature, layer) {
          var thisStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
          return thisStyle;
        },
        onEachFeature: function (feature, layer) {
          // geojsonHandler(feature, layer, eaaBoundaryZonesStyle, eaaBoundaryZonesStyleHover);

          var popupString = '<div class="popup">Edwards Aquifer Association Boundary Zone</div>';
          layer.bindPopup(popupString);

          if (!(layer instanceof L.Point)) {
            layer.on('mouseover', function () {
              layer.setStyle(baseStyleHover);
            });
            layer.on('mouseout', function () {
              var thisStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
              layer.setStyle(thisStyle);
            });
          }          
        }
      });
      geojson.addTo(eaaBoundaryLayer);
    });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, hatchedAreaStyle, hatchedAreaLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, directorDistrictsStyle, directorDistrictsLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, basinsStyle, basinsLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, precipitationStyle, precipitationLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, hucddStyle, hucddLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, majorRiversStyle, majorRiversLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, minorAquifersStyle, minorAquifersLayer);
    // });

    // $.getJSON(aquiferZonesGeojson, function(data) {
    //   processGeojson(data, reservoirsStyle, reservoirsLayer);
    // });

    var overlays = {
      'USA': usaLayer,
      'Texas': texasLayer,
      'Major Aquifers': majorAquifersLayer,
      'Aquifer Zones': aquiferZonesLayer,
      'EAA Boundary Zone': eaaBoundaryLayer,
      // 'Hatched Area': hatchedAreaLayer,
      // 'Director Districts': directorDistrictsLayer,
      // 'Basins': basinsLayer,
      // 'Precipitation': precipitationLayer,
      // 'HUCDD': hucddLayer,
      // 'Major Rivers': majorRiversLayer,
      // 'Minor Aquifers': minorAquifersLayer,
      // 'Reservoirs': reservoirsLayer
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
