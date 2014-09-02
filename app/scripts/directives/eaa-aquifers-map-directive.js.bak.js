'use strict';

angular.module('eaa.directives.d3.maps', [])
  .directive('eaaAquifersMap', [ function () {
    var directiveDefinitionObject = {
      compile: false,
      controller: function ($scope) {
        // console.log('controller for:', $scope.pageClass);
      }, /*false,*/
      controllerAs: false,
      link: false,
      priority: 0,
      // replace: false,  -deprecated.
      require: false,
      restrict: 'E',
      scope: false,
      template: false,
      templateUrl: false,
      terminal: false,
      transclude: false,
      type: false
    };

    directiveDefinitionObject.link = function postLink (scope, element) {

      // VARS.
      var w = window;
      var d = document;
      var e = d.documentElement;
      var g = d.getElementsByTagName('body')[0];
      var xx = w.innerWidth || e.clientWidth || g.clientWidth;
      var yy = w.innerHeight || e.clientHeight || g.clientHeight;
      // console.log(xx + ' × ' + yy);
      // console.log(window.screen.availWidth, window.screen.availHeight);
      var xScaling = 0.9; // 0.965;
      var yScaling = 0.6; // 0.65;
      var width = xx * xScaling;
      var height = yy * yScaling;
      // console.log(width, height);

      var mapSource = '../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json';
      var boundariesSource = '../../data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var markerLocations = '../../data/eaaAquiferium-allSprings-markerData.csv';
      // var imagePath = '../../images/d3map/';

      var vizMargin = {top: 10, right: 10, bottom: 10, left: 10};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;
      // console.log(vizWidth, vizHeight);

      var mapOffset = [vizWidth * 0.5, vizHeight * 0.5];
      var mapScale = 2; //3.8;
      // console.log(mapOffset, mapScale);

      function setMapOffset() {
        // console.log('setMapOffset()');
        if (vizWidth > 1440) {
          mapOffset = [vizWidth * 0.3, vizHeight * 0.5];
        } else if (vizWidth > 1200) {
          mapOffset = [vizWidth * 0.4, vizHeight * 0.5];
        } else if (vizWidth > 960) {
          mapOffset = [vizWidth * 0.45, vizHeight * 0.5];
        } else if (vizWidth > 768) {
          mapOffset = [vizWidth * 0.42, vizHeight * 0.5];
        } else {
          mapOffset = [vizWidth * 0.5, vizHeight * 0.5];
        }
        // console.log(mapOffset);
      }

      function setMapScale() {
        // console.log('setMapScale()');
        if (vizWidth > 1440) {
          mapScale = 5.5;
        } else if (vizWidth > 1200) {
          mapScale = 5;
        } else if (vizWidth > 960) {
          mapScale = 4.5;
        } else if (vizWidth > 768) {
          mapScale = 4;
        } else {
          mapScale = 3.5;
        }
        // console.log(mapScale);
      }
      
      setMapOffset();
      setMapScale();

      // var tooltipHorOffset = 20;
      // var tooltipVertOffset = 190;
      var markerRadius = 5;
      // var markerRadiusSelected = 20;
      // var markerStrokeAnimationSpeed = 250;

      // var lastClickTarget = {};
      // var newSelection = {};
      // var oldSelection = {};

      var el = element[0];
      // var tooltip = d3.select(el).append('div').attr('class', 'tooltip');
      var map = d3.select(el).append('div').attr('class', 'map');
      var mapSvg = map.append('svg').attr('class', 'mapSvg').attr('width', vizWidth * 0.92).attr('height', vizHeight);
      var texas = mapSvg.append('g').attr('class', 'texas');
      var eaaBounds = mapSvg.append('g').attr('class', 'boundaries');

      // METHODS.
      d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
          this.parentNode.appendChild(this);
        });
      };

      d3.selection.prototype.moveToBack = function () {
        return this.each(function () {
          var firstChild = this.parentNode.firstChild;
          if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
          }
        });
      };

      function randomColor() {
        var newColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
        return newColor;
      }

      function onTargetClick (target) {
        console.log(target);
        // newSelection = d3.select(this);
        // if (tooltip.style('visibility') === 'hidden') {
        //   // console.log('first click on marker and tooltip is now visible.');
        //   newSelection.moveToFront().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
        //   lastClickTarget = target;
        //   oldSelection = newSelection;
        //   return tooltip.style('visibility', 'visible').html('<h2>' + target.Location + '</h2><br/>' + '<img src="' + (imagePath + target.img) + '" alt="" /><br/>' + '<a href="../">Explore</a>');
        // } else if (tooltip.style('visibility') === 'visible' && target !== lastClickTarget) {
        //   // console.log('click on different marker, tooltip is now updated.');
        //   oldSelection.moveToBack().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
        //   // oldSelection.moveToBack();
        //   newSelection.moveToFront().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
        //   lastClickTarget = target;
        //   oldSelection = newSelection;
        //   return tooltip.style('visibility', 'visible').html('<h2>' + target.Location + '</h2><br/>' + '<img src="' + (imagePath + target.img) + '" alt="" /><br/>' + '<a href="../">Explore</a>');
        // }
        // // console.log('second click on marker and tooltip is now hidden.');
        // newSelection.transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
        // lastClickTarget = {};
        // oldSelection = {};
        // newSelection = {};
        // return tooltip.style('visibility', 'hidden');
      }

      // VIZ.
      d3.json(mapSource, function (error, mapData) {
        if (error) {
          return console.error(error);
        }

        var center = d3.geo.centroid(mapData);
        // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
        // Note: albersUsa() and transverseMercator() require additional configs.
        var projection = d3.geo.mercator().scale(mapScale).center(center).translate(mapOffset);
        var path = d3.geo.path().projection(projection);
        var texasMap = texas.selectAll('g').data(mapData.features).enter().append('g');
        texasMap.append('path').attr('d', path).attr('class', 'area').attr('fill', '#71B2C9').attr('stroke', '#4298B5');
        // texasMap.attr('transform', 'translate(-200,0)');

        d3.json(boundariesSource, function (error, boundariesData) {
          if (error) {
            return console.error(error);
          }

          var eaaBoundaries = eaaBounds.selectAll('g').data(boundariesData.features).enter().append('g');
          eaaBoundaries.append('path').attr('d', path).attr('class', 'area').attr('fill', '#8F8100').attr('stroke', '#000');
          var eaaMarkers = eaaBoundaries.append('g');

          d3.csv(markerLocations, function (error, data) {
            if (error) {
              return console.error(error);
            }
            eaaMarkers.selectAll('circle').data(data).enter().append('circle')
              .attr('cx', function (d) {
                return projection([d.lon_ddd, d.lat_ddd])[0];
              })
              .attr('cy', function (d) {
                return projection([d.lon_ddd, d.lat_ddd])[1];
              })
              .attr('r', markerRadius)
              .attr('z-index', 0)
              .style('fill', function () { return randomColor(); })
              .style('stroke', '#000')
              .on('click', onTargetClick);
          });
        });
      });
    };

    // console.log('directiveDefinitionObject: ', directiveDefinitionObject);
    return directiveDefinitionObject;
  }]);