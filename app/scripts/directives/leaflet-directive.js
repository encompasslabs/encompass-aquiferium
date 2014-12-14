'use strict';

angular.module('eaa.directives.maps.leaflet', [])
    .directive('leafletMap', [function() {

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

            directiveDefinitionObject.link = function postLink(scope, element) {

                var mqLink = '<a href="http://www.mapquest.com/">MapQuest</a>';
                var mqPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
                var mqArialUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg';
                var mqosmUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
                var mqArialAttrib = '&copy; ' + mqArialUrl + '. Tiles courtesy of ' + mqLink + mqPic;
                var mqosmAttrib = 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of ' + mqLink + mqPic;
                var mqArialMap = L.tileLayer(mqArialUrl, {
                    attribution: mqArialAttrib,
                    subdomains: '1234'
                });
                var mqosmMap = L.tileLayer(mqosmUrl, {
                    attribution: mqosmAttrib,
                    subdomains: '1234'
                });

                var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
                var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                var osmAttrib = '&copy; ' + osmLink + ' Contributors';
                var osmMap = L.tileLayer(osmUrl, {
                    attribution: osmAttrib
                });

                // Performance is poor on this one.
                var osmBwLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
                var osmBwUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
                var osmBwAttrib = '&copy; ' + osmBwLink + ' Contributors';
                var osmBwMap = L.tileLayer(osmBwUrl, {
                    attribution: osmBwAttrib
                });

                var thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
                var thunLandscapeUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
                var thunOutdoorsUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
                var thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;
                var thunLandscapeMap = L.tileLayer(thunLandscapeUrl, {
                    attribution: thunAttrib
                });
                var thunOutdoorsMap = L.tileLayer(thunOutdoorsUrl, {
                    attribution: thunAttrib
                });

                var stamenLink = '<a href="http://stamen.com">Stamen Design</a>';
                var stamenUrl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
                var stamenAttrib = '&copy; ' + mqLink + ' Contributors & ' + stamenLink;
                var stamenMap = L.tileLayer(stamenUrl, {
                    attribution: stamenAttrib
                });

                var esriLink = '<a href="http://www.esri.com/">Esri</a>';
                var esriWhoLink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
                var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
                var esriAttrib = '&copy; ' + esriLink + ', ' + esriWhoLink;
                var esriMap = L.tileLayer(esriUrl, {
                    attribution: esriAttrib
                });

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

                var usaStyle = {
                    'fillColor': color_blue
                };
                var texasStyle = {
                    'fillColor': color_red
                };
                var majorAquiferStyle = {
                    'fillColor': color_blue
                };
                var eaaBoundaryZonesStyle = {
                    'fillColor': color_yellow
                };
                var aquiferZonesStyle = {
                    'fillColor': color_green
                };
                // var hatchedAreaStyle = { 'fillColor': color_grey };
                // var directorDistrictsStyle = { 'fillColor': color_purple };
                // var basinsStyle = { 'fillColor': color_orange };
                // var precipitationStyle = { 'fillColor': color_green };
                // var hucddStyle = { 'fillColor': color_green };
                // var majorRiversStyle = { 'fillColor': color_gold };
                // var minorAquifersStyle = { 'fillColor': color_blue };
                // var reservoirsStyle = { 'fillColor': color_brown };

                // Earlier objects override later objects.
                var mergeObjects = function() {
                    var o = {}
                    for (var i = arguments.length - 1; i >= 0; i--) {
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

                // GeoJSON Layers.
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

                // Geojson interaction.

                var geojsonHandler = function(feature, layer, style) {
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
                        layer.on('mouseover', function() {
                            layer.setStyle(baseStyleHover);
                        });
                        layer.on('mouseout', function() {
                            var thisStyle = mergeObjects(style, baseStyle);
                            layer.setStyle(thisStyle);
                        });
                    }
                };

                // Load geojson.

                var processGeojson = function(data, layerStyle, layerGroup) {
                    var geojson = L.geoJson(data, {
                        style: function(feature, layer) {
                            var thisStyle = mergeObjects(layerStyle, baseStyle);
                            return thisStyle;
                        },
                        onEachFeature: function(feature, layer) {
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
                        style: function(feature, layer) {
                            var thisStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
                            return thisStyle;
                        },
                        onEachFeature: function(feature, layer) {
                            // geojsonHandler(feature, layer, eaaBoundaryZonesStyle, eaaBoundaryZonesStyleHover);

                            var popupString = '<div class="popup">Edwards Aquifer Association Boundary Zone</div>';
                            layer.bindPopup(popupString);

                            if (!(layer instanceof L.Point)) {
                                layer.on('mouseover', function() {
                                    layer.setStyle(baseStyleHover);
                                });
                                layer.on('mouseout', function() {
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

                var baseLayers = {
                    'MapQuest Open Arial': mqArialMap,
                    // 'MapQuest-OSM': mqosmMap,
                    'Open Street Map': osmMap,
                    'Open Street Map (Black and White)': osmBwMap,
                    'ESRI World Imagery': esriMap //,
                    // 'Thunderforest Landscape': thunLandscapeMap,
                    // 'Thunderforest Outdoors': thunOutdoorsMap,
                    // 'Stamen Watercolor': stamenMap    
                };

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

                var initialPosition = [55, -97];
                var initialZoom = 6;

                var map = L.map('map', {
                    zoomControl: false,
                    attributionControl: false,
                    inertia: false,
                    keyboard: true,
                    dragging: true,
                    scrollWheelZoom: true,
                    zoomAnimation: false,
                    click: true,
                    layers: [mqArialMap] // only add one!
                }).setView(initialPosition, initialZoom);

                // var maskmap = new L.map('maskmap', {
                //     zoomControl: false,
                //     inertia: false,
                //     keyboard: false,
                //     dragging: false,
                //     scrollWheelZoom: false,
                //     attributionControl: false,
                //     zoomAnimation: false,
                //     click: true,
                //     layers: [mqosmMap]
                // }).setView(viewCoordinates, viewZoomLevel);

                L.Browser.touch = true;
                L.control.attribution({position: 'bottomright'}).addTo(map);
                L.control.layers(baseLayers, overlays, {position: 'topleft'}).addTo(map);
                // L.control.zoom({position: 'bottomleft'}).addTo(map);
                L.control.scale({position: 'bottomleft'}).addTo(map);
                



                // var eaaBounds = [[22, 122], [48, 154]];
                // var panOptions = {animate: true, duration: 3, easeLinearity: 0.25, noMoveStart: false };
                // var theMap = document.getElementById('map');

                // console.log(map);
                // console.log(theMap);
                // console.log(eaaBounds);
                // console.log(panOptions);
                // console.log(L.hasOwnProperty('panInsideBounds'));
                // console.log(map.hasOwnProperty('panInsideBounds'));

                // map.panInsideBounds(eaaBounds, panOptions);
                // L.panInsideBounds(eaaBounds, panOptions);
                // theMap.panInsideBounds(eaaBounds, panOptions);

                // RANDOM PARTS...

                // // L.legend.addTo(map);
                // // map.legendControl.addLegend(legend);

                // // L.control.add(legend);

                // // var info = L.control({position: 'bottomleft'});

                // // info.onAdd = function (map) {
                // //     this._div = L.DomUtil.create('div', 'legend'); // create a div with a class "info"
                // //     this.update();
                // //     return this._div;
                // // };

                // // var legend = L.control({position: 'topleft'});  
                // // legend.onAdd = function (map) {

                // // var div = L.DomUtil.create('div', 'info legend'),
                // //     grades = [50, 100, 150, 200, 250, 300],
                // //     labels = ['<strong> THE TITLE </strong>'],
                // //     from, to;

                // // for (var i = 0; i < grades.length; i++) {
                // //     from = grades [i];
                // //     to = grades[i+1]-1;

                // // labels.push(
                // //     '<i style="background:' + getColor(from + 1) + '"></i> ' +
                // //     from + (to ? '&ndash;' + to : '+'));
                // //     }
                // //     div.innerHTML = labels.join('<br>');
                // //     return div;
                // //     };

                // // $scope.resetView();  // Causes the page to hang. Why?



                // L.panInsideBounds([[40.712, -74.227],[40.774, -74.125]], { true, 3, 0.5, false });
                // L.map('map').panBy(5000, { 'animate': true, 'duration': 9, 'easeLinearity': 0.5, 'noMoveStart': false });
                var southWest0 = L.latLng(32, -100),
                    northEast0 = L.latLng(28, -92),
                    bounds0 = L.latLngBounds(southWest0, northEast0);

                var southWest1 = L.latLng(17, 100),
                    northEast1 = L.latLng(16, 100),
                    bounds1 = L.latLngBounds(southWest1, northEast1);

                var southWest2 = L.latLng(30, -97),
                    northEast2 = L.latLng(30, -97),
                    bounds2 = L.latLngBounds(southWest2, northEast2);

                var area3 = L.latLngBounds([[32, -100],[28, -92]]);

                var panOptions = {
                    'animate': true,
                    'duration': 10,
                    'easeLinearity': 0.25,
                    'noMoveStart': 'false'
                };

                var zoomOptions = { 'animate': 'true' };
                var zoomPanOptions = {'reset': false, 'pan': panOptions, 'zoom': zoomOptions, 'animate': 'true' };
                var fitBoundsOptions = { 'paddingTopLeft': [0, 0], 'paddingBottomRight': [0, 0], 'maxZoom': 16 };

                map.panInsideBounds(bounds2,panOptions);
                
                // map.setZoom(5);
                // map.panInsideBounds(bounds0,panOptions);
                // map.fitBounds(bounds0,zoomPanOptions);
                // map.setZoom(5, zoomPanOptions);
                // map.fitBounds(area3, fitBoundsOptions);                
                // map.setZoom(1);
                // map.zoomIn(15, zoomOptions);
                // map.zoomIn(2, zoomOptions).panInsideBounds(bounds0,panOptions).zoomIn(3, zoomOptions).panInsideBounds(bounds1,panOptions);
                // map.panBy(500).zoomIn();

                majorAquifersLayer.addTo(map);
                // aquiferZonesLayer.addTo(map);
                // eaaBoundaryLayer.addTo(map);
              };

                return directiveDefinitionObject;
            }
        ]);
