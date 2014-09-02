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
      var container = $('#major-aquifers');
      var containerWidth = container.width();

      var width = containerWidth;
      var height = width * 0.75;

      var vizMargin = {top: 0, right: 0, bottom: 0, left: 0};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      var mapWidth = vizWidth;
      var mapHeight = vizHeight * 0.75;

      // var boundariesSource = '../../data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var boundariesSource = '../../data/geojson/NEW_major_aquifers_dd_reduced100.geo.json';
      // var markerLocations = '../../data/eaaAquiferium-allSprings-markerData.csv';

      // var markerRadius = 5;
      // var mapLabels = [];
      // var mapLabelsLength = mapLabels.length;

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

      var mouseOverGraph = function (event) {
        var position = d3.mouse(this);
        console.log(position);
      };

      var onTargetClick = function (target) {
        console.log(target.properties.Name);
      };

      // VIZ - BASE.
      var el = element[0];
      var viz = d3.select(el).append('div').attr('class', 'viz z-400').attr('width', vizWidth).attr('height', vizHeight);
      viz.on('mousemove', mouseOverGraph);

      var geoBounds = viz.append('svg').attr('class', 'geo-bounds major-aquifers')
        .attr('width', mapWidth)
        .attr('height', mapHeight);

      // MAP.
      d3.json(boundariesSource, function (error, boundariesData) {
        if (error) {
          return console.error(error);
        }
        var scale = mapHeight * 4; // geojson display.
        var offset = [mapWidth / 2, mapHeight / 2];
        var center = d3.geo.centroid(boundariesData);
        // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
        // Note: albersUsa() and transverseMercator() require additional configs.
        var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);
        var path = d3.geo.path().projection(projection);
        var geoBoundaries = geoBounds.selectAll('g').data(boundariesData.features).enter().append('g');
        geoBoundaries.append('path').attr('d', path).attr('class', function (d) { return 'subunit ' + d.properties.Name; }).attr('stroke', '#000').attr('fill', '#f00').on('click', onTargetClick);
      });

    };

    return directiveDefinitionObject;
  }]);