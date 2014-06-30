'use strict';

angular.module('d3-visualizations', [])
  .directive('eaaAquifersBoundaryMap', function () {
    // console.log('eaaAquifersMap directive initialized.');
    function link(scope, element, attrs) {

      // VARS.
      // Screen Setup.
      var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        xx = w.innerWidth || e.clientWidth || g.clientWidth,
        yy = w.innerHeight || e.clientHeight || g.clientHeight;
      // alert(xx + ' × ' + yy);
      // alert(window.screen.availWidth);
      // alert(window.screen.availHeight);
      var xScaling = 0.965;
      var yScaling = 0.65;
      var width = xx * xScaling;
      var height = yy * yScaling;

      var boundariesSource = '../../data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var markerLocations = '../../data/eaaAquiferium-allSprings-markerData.csv';

      var vizMargin = {top: 0, right: 0, bottom: 0, left: 0};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      console.log('width: ', width);
      console.log('height: ', height);
      console.log('vizMargin: ', vizMargin);
      console.log('vizWidth: ', vizWidth);
      console.log('vizHeight: ', vizHeight);

      var el = element[0];
      var tooltip = d3.select(el).append('div').attr('class', 'tooltip');
      var map = d3.select(el).append('div').attr('class', 'map');
      var mapSvg = d3.select('.map').append('svg').attr('height', height).attr('class', 'mapSvg');
      var eaaBounds = mapSvg.append('g').attr('class', 'boundaries');

      var tooltipHorOffset = 20;
      var tooltipVertOffset = 190;
      var markerRadius = 10;
      var markerRadiusSelected = 20;
      var markerStrokeAnimationSpeed = 250;

      // METHODS.
      function randomColor() {
        var newColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
        return newColor;
      };

      function onTargetClick(event) {
        console.log(event);
      };

      // APP.
      d3.json(boundariesSource, function (error, boundariesData) {
        if (error) {
          return console.error(error);
        }
        var scale = height * 24;
        var offset = [width / 2, height / 2];
        var center = d3.geo.centroid(boundariesData);
        var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);
        var path = d3.geo.path().projection(projection);
        // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
        // Note: albersUsa() requires additional configs. transverseMercator() as well.

        // draw eaa boundaries map.
        var eaaBoundaries = eaaBounds.selectAll('g').data(boundariesData.features).enter().append('g');
        eaaBoundaries.append('path').attr('d', path).attr('class', 'area').attr('fill', '#8F8100').attr('stroke', '#000');

        // add markers.
        d3.csv(markerLocations, function (error, data) {
          if (error) {
            return console.error(error);
          }
          eaaBoundaries.selectAll('circle').data(data).enter().append('circle')
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
    }

    // isolate scope
    return {
      restrict: 'E',
      replace: false,
      scope: {
        'data': '=',
        'onClick': '&'
      },
      link: link
    };
  });
