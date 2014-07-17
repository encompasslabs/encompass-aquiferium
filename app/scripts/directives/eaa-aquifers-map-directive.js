'use strict';

angular.module('app.directives.d3.maps', [])
  .directive('eaaAquifersMap', function() {
    // console.log('eaaAquifersMap directive initialized.');
    // generic directiveDefinitionObject config.
    var directiveDefinitionObject = {
      compile: false,
      controller: function($scope) {
        console.log('controller for:', $scope.pageClass);
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

    directiveDefinitionObject.link = function postLink(scope, element, attrs) {

      // VARS.
      var w = window;
      var d = document;
      var e = d.documentElement;
      var g = d.getElementsByTagName('body')[0];
      var xx = w.innerWidth || e.clientWidth || g.clientWidth;
      var yy = w.innerHeight || e.clientHeight || g.clientHeight;
      console.log(xx + ' × ' + yy);
      console.log(window.screen.availWidth, window.screen.availHeight);
      var xScaling = 0.9; // 0.965;
      var yScaling = 0.6; // 0.65;
      var width = xx * xScaling;
      var height = yy * yScaling;
      console.log(width, height);

      var mapSource = '../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json';
      var boundariesSource = '../../data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var markerLocations = '../../data/eaaAquiferium-allSprings-markerData.csv';
      var imagePath = '../../images/d3map/';

      var vizMargin = {top: 10, right: 10, bottom: 10, left: 10};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      var mapOffset = [vizWidth / 2, vizHeight / 2];
      var mapScale = vizHeight * 4;

      var tooltipHorOffset = 20;
      var tooltipVertOffset = 190;
      var markerRadius = 5;
      var markerRadiusSelected = 20;
      var markerStrokeAnimationSpeed = 250;

      var lastClickTarget = {};
      var newSelection = {};
      var oldSelection = {};

      var el = element[0];
      var tooltip = d3.select(el).append('div').attr('class', 'tooltip');
      var map = d3.select(el).append('div').attr('class', 'map');
      var mapSvg = d3.select('.map').append('svg').attr('width', vizWidth).attr('height', vizHeight).attr('class', 'mapSvg');
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
      };

      function onTargetClick (target) {
        newSelection = d3.select(this);
        if (tooltip.style('visibility') === 'hidden') {
          // console.log('first click on marker and tooltip is now visible.');
          newSelection.moveToFront().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
          lastClickTarget = target;
          oldSelection = newSelection;
          return tooltip.style('visibility', 'visible').html('<h2>' + target.Location + '</h2><br/>' + '<img src="' + (imagePath + target.img) + '" alt="" /><br/>' + '<a href="../">Explore</a>');
        } else if (tooltip.style('visibility') === 'visible' && target !== lastClickTarget) {
          // console.log('click on different marker, tooltip is now updated.');
          oldSelection.moveToBack().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
          // oldSelection.moveToBack();
          newSelection.moveToFront().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
          lastClickTarget = target;
          oldSelection = newSelection;
          return tooltip.style('visibility', 'visible').html('<h2>' + target.Location + '</h2><br/>' + '<img src="' + (imagePath + target.img) + '" alt="" /><br/>' + '<a href="../">Explore</a>');
        }
        // console.log('second click on marker and tooltip is now hidden.');
        newSelection.transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
        lastClickTarget = {};
        oldSelection = {};
        newSelection = {};
        return tooltip.style('visibility', 'hidden');
      };

      // VIZ.
      d3.json(mapSource, function (error, mapData) {
        if (error) {
          return console.error(error);
        }

        var scale = mapScale;
        var offset = mapOffset;
        var center = d3.geo.centroid(mapData);
        // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
        // Note: albersUsa() and transverseMercator() require additional configs.
        var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);
        var path = d3.geo.path().projection(projection);
        var texasMap = texas.selectAll('g').data(mapData.features).enter().append('g');
        texasMap.append('path').attr('d', path).attr('class', 'area').attr('fill', '#425968').attr('stroke', '#4298B5');

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

    console.log('directiveDefinitionObject: ', directiveDefinitionObject);
    return directiveDefinitionObject;
  });