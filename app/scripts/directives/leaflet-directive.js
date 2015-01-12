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
            scope: {
                displayRechargePanel: '&',
                displayWellsPanel: '&',
                displaySpringsPanel: '&',
                closeAllPanels: '&'
            },
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
            var mqArialAttrib = 'Tiles courtesy of ' + mqLink + mqPic;
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

            // Colors.
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

            // EAA Colors
            var color_eaa_Blue = '#425968';
            var color_eaa_Orange = '#AB650D';
            var color_eaa_Gold = '#8F8100';
            var color_eaa_Tan = '#E6D395';
            var color_eaa_Stone = '#8E8C7A';
            var color_eaa_Lake = '#71B2C9';
            var color_eaa_Amber = '#C6930A';
            var color_eaa_Orange = '#D15B05';
            var color_eaa_Brown = '#6D4F47';
            var color_eaa_Melon = '#AADD6D';
            var color_eaa_Teal = '#00B28C';
            var color_eaa_Sky = '#4298B5';

            // Styles for geojson layers.

            var weight = 1.0;
            var opacity = 1.0;
            var fillOpacity = 0.6;
            var fillOpacityHover = 0.8;

            var baseStyle = {
                'clickable': true,
                'color': color_black,
                'fillColor': color_grey,
                'weight': weight,
                'opacity': opacity,
                'fillOpacity': fillOpacity
            };
            var baseStyleHover = { 'fillOpacity': fillOpacityHover };

            // var usaStyle = { 'fillColor': color_eaa_Blue };
            // var usaStyleHover = { };

            var texasStyle = {
                'fillColor': color_eaa_Orange,
                'fillOpacity': 0.0,
                'color': color_eaa_Orange,
                'weight': '3px'
            };
            var texasStyleHover = { 'fillOpacity': 0.0 };

            var majorAquiferStyle = { 'fillColor': color_eaa_Lake };
            var majorAquiferStyleHover = { };

            var eaaBoundaryZonesStyle = { 'fillColor': color_eaa_Gold };
            var eaaBoundaryZonesStyleHover = { };

            var aquiferZonesStyle = { 'fillColor': color_eaa_Melon };
            var aquiferZonesStyleHover = { };

            // Geojson to display.
            // var usaGeojson = './data/geojson/USA.geo.json';
            // var usaGeojson = './data/geojson/gz_2010_us_outline_20m.json';  // Outline only.
            var texasGeojson = './data/geojson/TX.geo.json';
            var majorAquifersGeojson = './data/geojson/eaa/NEW_major_aquifers_dd_reduced100.geo.json';
            var eaaBoundaryZonesGeojson = './data/geojson/eaa/eaa_boundary_EPSG-3081.geo.json';
            var aquiferZonesGeojson = './data/geojson/eaa/eaa-aquifer-zones-2014.geo.json';

            // GeoJSON Layers.
            // var usaLayer = new L.LayerGroup();
            var texasLayer = new L.LayerGroup();
            var majorAquifersLayer = new L.LayerGroup();
            var aquiferZonesLayer = new L.LayerGroup();
            var eaaBoundaryLayer = new L.LayerGroup();

            // Marker Layers.
            // Look into using the MarkerClusterGroup.
            var allMarkersLayer = new L.LayerGroup();

            // Merges Style Objects.
            var mergeObjects = function() {
                // Earlier objects override later objects.
                var o = {}
                for (var i = arguments.length - 1; i >= 0; i--) {
                    var s = arguments[i];
                    for (var k in s) {
                        o[k] = s[k];
                    }
                }
                return o;
            };

            // Geojson interaction.
            var geojsonHandler = function(feature, layer, style, styleHover) {
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
                        var thisStyleHover = mergeObjects(styleHover, baseStyleHover);
                        layer.setStyle(thisStyleHover);
                    });
                    layer.on('mouseout', function() {
                        var thisStyle = mergeObjects(style, baseStyle);
                        layer.setStyle(thisStyle);
                    });
                }
            };

            // Load geojson.
            var processGeojson = function(data, layerGroup, layerStyle, layerStyleHover) {
                var geojson = L.geoJson(data, {
                    style: function(feature, layer) {
                        var thisStyle = mergeObjects(layerStyle, baseStyle);
                        return thisStyle;
                    },
                    onEachFeature: function(feature, layer) {
                        geojsonHandler(feature, layer, layerStyle, layerStyleHover);
                    }
                });
                geojson.addTo(layerGroup);
            };

            // $.getJSON(usaGeojson, function(data) {
            //     processGeojson(data, usaLayer, usaStyle, usaStyleHover);
            // });

            $.getJSON(texasGeojson, function(data) {
                processGeojson(data, texasLayer, texasStyle, texasStyleHover);
            });

            $.getJSON(majorAquifersGeojson, function(data) {
                processGeojson(data, majorAquifersLayer, majorAquiferStyle, majorAquiferStyleHover);
            });

            $.getJSON(aquiferZonesGeojson, function(data) {
                processGeojson(data, aquiferZonesLayer, aquiferZonesStyle, aquiferZonesStyleHover);
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
                                var eaaStyleHover = mergeObjects(eaaBoundaryZonesStyleHover, baseStyleHover);
                                layer.setStyle(eaaStyleHover);
                            });
                            layer.on('mouseout', function() {
                                var eaaStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
                                layer.setStyle(eaaStyle);
                            });
                        }
                    }
                });
                geojson.addTo(eaaBoundaryLayer);
            });

            // Markers.
            // On Popup with Links - Take care with hyphenated spelling of method in view HTML.

            // Example.
            // var exampleView = L.latLng(45.5, -100.5);
            // var exampleMarkerLocationSW = L.latLng(35.5, -90.5);
            // var exampleMarkerLocationNE = L.latLng(55.5, -110.5);
            // var exampleMarkerBounds = L.latLngBounds(exampleMarkerLocationSW, exampleMarkerLocationNE);

            // var exampleMarkerLocation = L.latLng(45.5, -100.5);
            // var exampleMarkerOptions = { title: 'example title' };
            // var exampleMarker = L.marker(exampleMarkerLocation, exampleMarkerOptions);
            // exampleMarker.addTo(allMarkersLayer);            
            // var examplePopupContent = '<p>Example Popup</p>';
            // var exampleContentContainer = $('<div />');
            // exampleContentContainer.html(examplePopupContent);
            // exampleMarker.bindPopup(exampleContentContainer[0]);
            // exampleContentContainer.on('click', '.exampleLink', function() {
            //     event.preventDefault();
            //     map.panBy(panByPoint, panOptionsInteractive);
            //     scope.displaySpringsPanel();
            // });
            
            // J17.
            var j17MarkerLocation = L.latLng(29.45, -98.48);
            var j17MarkerOptions = { title: 'J17' };
            var j17Marker = L.marker(j17MarkerLocation, j17MarkerOptions);
            // j17Marker.addTo(usaMarkersLayer);
            j17Marker.addTo(allMarkersLayer);
            var j17PopupContent = '<h2>J17 Index Well</h2><a href="" class="rechargeInteractiveLink">Recharge Data Interactive</a><br/>';
            var j17ContentContainer = $('<div />');
            j17ContentContainer.html(j17PopupContent);
            j17Marker.bindPopup(j17ContentContainer[0]);
            j17ContentContainer.on('click', '.rechargeInteractiveLink', function() {
                event.preventDefault();
                map.panBy(panByPoint, panOptionsInteractive);
                scope.displayRechargePanel();
            });

            // Leona Springs.
            var leonaSpringsMarkerLocation = L.latLng(29.15417, -99.7431);
            var leonaSpringsMarkerOptions = { title: 'Leona Springs' };
            var leonaSpringsMarker = L.marker(leonaSpringsMarkerLocation, leonaSpringsMarkerOptions);
            // leonaSpringsMarker.addTo(usaMarkersLayer);
            leonaSpringsMarker.addTo(allMarkersLayer);
            var leonaSpringsPopupContent = '<h2>Leona Springs</h2><a href="" class="wellsInteractiveLink">Wells Data Interactive</a><br/>';
            var leonaSpringsContentContainer = $('<div />');
            leonaSpringsContentContainer.html(leonaSpringsPopupContent);
            leonaSpringsMarker.bindPopup(leonaSpringsContentContainer[0]);
            leonaSpringsContentContainer.on('click', '.wellsInteractiveLink', function() {
                event.preventDefault();
                map.panBy(panByPoint, panOptionsInteractive);
                scope.displayWellsPanel();
            });

            // San Marcos Springs.
            var sanMarcosSpringsMarkerLocation = L.latLng(29.89326, -97.9312);
            var sanMarcosSpringsMarkerOptions = { title: 'San Marcos Springs' };
            var sanMarcosSpringsMarker = L.marker(sanMarcosSpringsMarkerLocation, sanMarcosSpringsMarkerOptions);
            // sanMarcosSpringsMarker.addTo(usaMarkersLayer);      
            sanMarcosSpringsMarker.addTo(allMarkersLayer);         
            var sanMarcosSpringsPopupContent = '<h2>San Marcos Springs</h2><a href="" class="springsInteractiveLink">Springs Data Interactive</a><br/>';
            var sanMarcosSpringsContentContainer = $('<div />');
            sanMarcosSpringsContentContainer.html(sanMarcosSpringsPopupContent);
            sanMarcosSpringsMarker.bindPopup(sanMarcosSpringsContentContainer[0]);
            sanMarcosSpringsContentContainer.on('click', '.springsInteractiveLink', function() {
                event.preventDefault();
                map.panBy(panByPoint, panOptionsInteractive);
                scope.displaySpringsPanel();
            });   

            // Populate Map Controls.
            var baseLayers = {
                'MapQuest Open Arial': mqArialMap,
                'MapQuest-OSM': mqosmMap,
                'Open Street Map': osmMap,
                // 'Open Street Map (Black and White)': osmBwMap,   // Not performant.
                'ESRI World Imagery': esriMap,
                'Thunderforest Landscape': thunLandscapeMap,
                'Thunderforest Outdoors': thunOutdoorsMap,
                'Stamen Watercolor': stamenMap
            };

            var overlays = {
                // All Markers.
                'EAA Monitoring Stations': allMarkersLayer,
                // USA.
                // 'USA': usaLayer,
                'Texas': texasLayer,
                'Major Aquifers': majorAquifersLayer,
                'Aquifer Zones': aquiferZonesLayer,
                'EAA Boundary Zone<br/>': eaaBoundaryLayer,    
            };

            // Map Panning/Zooming.

            var zoomOptions = {
                'animate': 'true'
            };
            var zoomPanOptions = {
                'reset': false,
                'pan': panOptions,
                'zoom': zoomOptions,
                'animate': 'true'
            };
            var fitBoundsOptions = {
                'paddingTopLeft': [0, 0],
                'paddingBottomRight': [0, 0],
                'maxZoom': 16
            };
            var panOptions = {
                'animate': true,
                'duration': 5,
                'easeLinearity': 0.25,
                'noMoveStart': 'false'
            };
            var panOptionsInitial = {
                'animate': true,
                'duration': 4,
                'easeLinearity': 0.50,
                'noMoveStart': 'false'
            };
            var panOptionsInteractive = {
                'animate': true,
                'duration': 2,
                'easeLinearity': 0.25,
                'noMoveStart': 'false'
            };
            var panOptionsMarkers = {
                'animate': true,
                'duration': 3,
                'easeLinearity': 0.25,
                'noMoveStart': 'false'
            };
            var panByPoint = new L.Point(-350, 0);

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

            var rechargeView = L.latLng(29.45, -109.48);
            var wellsView = L.latLng(29.15417, -110.7431);
            var springsView = L.latLng(29.89326, -108.9312);   

            // Build Map.

            var initialZoom = 6;
            var initialPosition = [50, -98];
            var targetPosition = [30, -98];
            
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

            map.on('popupopen', function(centerMarker) {
                var cM = map.project(centerMarker.popup._latlng);
                cM.y -= centerMarker.popup._container.clientHeight / 2;
                var cZ = map.getZoom();
                map.setView(map.unproject(cM), cZ, {
                    animate: true
                });
            });

            L.Browser.touch = true;
            L.Icon.Default.imagePath = './styles/images';

            L.control.layers(baseLayers, overlays, {
                position: 'topleft'
            }).addTo(map);

            // L.control.zoom({position: 'topright'}).addTo(map);

            L.control.scale({
                position: 'bottomleft'
            }).addTo(map);

            L.control.attribution({
                position: 'bottomright'
            }).addTo(map);

            // Setup Initial View & Animation.
            texasLayer.addTo(map);
            eaaBoundaryLayer.addTo(map);
            allMarkersLayer.addTo(map);
            map.panTo(targetPosition, panOptionsInitial);

            // $(".leaflet-popup-close-button")[0].click();  // Closes all popups.
            // Reverse this so close button on slide closes popup on leaflet map (reverse of displayRechargePanel method).
            // Also have the method pan the view back to the default.                              

            // // $scope.resetView();  // Causes the page to hang. Why?
        };

        return directiveDefinitionObject;
    }]);