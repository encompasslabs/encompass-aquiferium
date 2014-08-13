'use strict';

angular.module('eaa.directives.d3.interactive.springs', [])
  .directive('eaaGaugeDataInteractiveSprings', [function() {
    // console.log('eaaAquifersBoundaryMap directive initialized.');
    // generic directiveDefinitionObject config.
    var directiveDefinitionObject = {
      compile: false,
      controller: function($scope) {
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

    directiveDefinitionObject.link = function postLink(scope, element) {

      // VARS.
      var w = window;
      var d = document;
      var e = d.documentElement;
      var g = d.getElementsByTagName('body')[0];
      var width = w.innerWidth || e.clientWidth || g.clientWidth;
      var height = w.innerHeight || e.clientHeight || g.clientHeight;

      var vizMargin = {top: 0, right: 20, bottom: 0, left: 20};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      var mapWidth = vizWidth; //vizWidth * 0.9;
      var mapHeight = vizHeight * 0.4;

      var graphWidth = vizWidth; //vizWidth * 0.9;
      var graphHeight = vizHeight * 0.4;
      var graphLeftOffset = graphWidth*0.05;

      var boundariesSource = '../../data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var markersSource = '../../data/springs-markerData.csv';
      var dataSource = '../../data/springs-annualAvg-byDate.csv';

      // var tooltipHorOffset = 20;
      // var tooltipVertOffset = 190;
      var markerRadius = 5;
      // var markerRadiusSelected = 20;
      // var markerStrokeAnimationSpeed = 250;

      // var lastClickTarget = {};
      // var newSelection = {};
      // var oldSelection = {};

      var color = d3.scale.category10().domain(['Barton Springs', 'Comal Springs', 'Hueco Springs', 'J17', 'J27', 'Las Moras Springs', 'Leona Springs', 'San Antonio Springs', 'San Marcos Springs', 'San Pedro Springs']);
      var dataKey = d3.scale.ordinal();
      var parseDate = d3.time.format('%Y');

      var x = d3.time.scale().range([graphLeftOffset, graphWidth*0.85]);
      var y = d3.scale.linear().range([graphHeight-50, 50]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(20);
      var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10);

      var el = element[0];
      var viz = d3.select(el).append('div').attr('class', 'viz').attr('width', vizWidth).attr('height', vizHeight);

      var dataDisplay = viz.append('div').attr('class','data-display');
      dataDisplay.append('text').attr('class','year-display').text('YYYY');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');
      dataDisplay.append('br');
      dataDisplay.append('text').attr('class','springs-value-display').text('value: TBD');

      var map = viz.append('div').attr('class', 'map');
      var mapSvg = map.append('svg').attr('class', 'mapSvg')
        .attr('width', mapWidth)
        .attr('height', mapHeight);

      var geoBounds = mapSvg.append('g').attr('class', 'geoBounds');
      geoBounds.attr('transform', 'translate(200,40)');

      var chart = viz.append('div').attr('class', 'chart');
      var chartSvg = chart.append('svg').attr('class', 'chartSvg')
        .attr('width', graphWidth)
        .attr('height', graphHeight);

      var graphBounds = chartSvg.append('g').attr('class', 'graphbounds');
      graphBounds.attr('transform', 'translate(0,0)');

      var line = d3.svg.line()
        .interpolate('monotone') // basis, basis-open, basis-closed, linear, step, step-before, step-after, bundle, cardinal, cardinal-open, cardinal-closed, monotone 
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.gindex); })
        .defined(function (d) { return d.gindex; });

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

      function overGauge (d) {
        console.log('over gauge: ', d.name);
        this.parentNode.parentNode.appendChild(this.parentNode);
        d3.select(this).style('stroke-width', '6px');
      }

      function outGauge (d) {
        console.log('out gauge: ', d.name);
        d3.select(this).style('stroke-width', '2px');
      }

      function onTargetClick (target) {
        console.log(d3.select(target)[0][0].Location);
      }

      // VIZ - MAP.
      d3.json(boundariesSource, function (error, boundariesData) {
        if (error) {
          return console.error(error);
        }
        var scale = mapHeight * 28; // geojson display.
        var offset = [mapWidth / 2, mapHeight / 2];
        var center = d3.geo.centroid(boundariesData);
        // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
        // Note: albersUsa() and transverseMercator() require additional configs.
        var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);
        var path = d3.geo.path().projection(projection);
        var geoBoundaries = geoBounds.selectAll('g').data(boundariesData.features).enter().append('g');
        geoBoundaries.append('path').attr('d', path).attr('class', 'area').attr('fill', '#8F8100').attr('stroke', '#000');
        var eaaMarkers = geoBoundaries.append('g');

        d3.csv(markersSource, function (error, data) {
          if (error) {
            return console.error(error);
          }
          eaaMarkers.selectAll('circle').data(data).enter().append('circle')
            .attr('class', function (d) { /*console.log(d['Location']);*/ return d.Location; })
            .attr('cx', function (d) {
              return projection([d.lon_ddd, d.lat_ddd])[0];
            })
            .attr('cy', function (d) {
              return projection([d.lon_ddd, d.lat_ddd])[1];
            })
            .attr('r', markerRadius)
            .attr('z-index', 0)
            .style('fill', function (d) { return color(d.Location); })
            .style('stroke', '#000')
            .on('click', onTargetClick);
        });
      });

      // VIZ - CHART.
      d3.csv(dataSource, function(error, data) {

        data.forEach(function(d) {
          d.Date = parseDate.parse(d.Date);
          d['Barton Springs'] = +d['Barton Springs'];
          d['Comal Springs'] = +d['Comal Springs'];
          d['Hueco Springs'] = +d['Hueco Springs'];
          d['Las Moras Springs'] = +d['Las Moras Springs'];
          d['Leona Springs'] = +d['Leona Springs'];
          d['San Antonio Springs'] = +d['San Antonio Springs'];
          d['San Marcos Springs'] = +d['San Marcos Springs'];
          d['San Pedro Springs'] = +d['San Pedro Springs'];
        });

        dataKey.domain(d3.keys(data[0]).filter(function (key) { return key !== 'Date'; }));

        var gauges = dataKey.domain().map(function(name) {
          return {
            name: name,
            values: data.map(function(d) {
              return { date: d.Date, gindex: +d[name] };
            })
          };
        });

        x.domain(d3.extent(data, function (d) { return d.Date; }));
        y.domain([
          d3.min(gauges, function (c) { return d3.min(c.values, function (v) { return v.gindex; }); }),
          d3.max(gauges, function (c) { return d3.max(c.values, function (v) { return v.gindex; }); })
        ]);

        graphBounds.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + (graphHeight - 50) + ')')
          .call(xAxis);

        graphBounds.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + graphLeftOffset + ',0)')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -70)
          .attr('dy', '1em')
          .style('text-anchor', 'end')
          .text('cfs');

        var gauge = graphBounds.selectAll('.gauge')
          .data(gauges)
          .enter().append('g')
          .attr('class', function (gauges) { return gauges.name; });
            
        gauge.append('path')
          .attr('class', 'line')
          .attr('d', function (d) {
            return line(d.values);
          })
          .style('stroke', function (d) { return color(d.name); })
          .on('mouseover', overGauge)
          .on('mouseout', outGauge)
          .attr('id', function(d) { return d.name; });

        var filtered = gauge
          // Filter data points by gauge.
          .filter(function(d){
            // console.log(d.name);
            // return d.name == 'J27';
            // return d.values.gindex !== NaN;
            // return d.name === 'Barton Springs' || 'Comal Springs' || 'Hueco Springs' || 'J17' || 'J27' || 'Las Moras Springs' || 'Leona Springs' || 'San Antonio Springs' || 'San Marcos Springs' || 'San Pedro Springs';
          })
          .selectAll('circle')
          .data(function (d){ return d.values; })
          .enter().append('circle')
          .attr({ cx: function (d) { return x(d.date); }, cy: function (d){ return y(d.gindex); }, r: 2 })
          .style('fill', '#555');

        filtered.on('mouseover', function (d) {
          console.log(d);
          filtered.append('text')
            .attr({
              x: function (d){
                return x(d.date);
              },
              y: function (d){
                return y(d.gindex);
              },
              dx:-3,
              dy:'.35em',
              'text-anchor':'end'
            })
            .style('fill', 'black')
            .text( function (d) {
              var formatDate = d3.time.format('%d-%B-%Y');
              return 'Date:' + formatDate(d.date) + ',index:' + d.gindex;
            }
          );
        })
          .on('mouseout', function (d) {
            console.log('mouse out: ', d);
            d3.select(this.parentElement)
              .selectAll('text').remove();
          });

        var legend = graphBounds.append('g').attr('class','chart-legend').attr('transform', 'translate(-180,30)')
          .selectAll('.svg').data(gauges).enter().append('g');
          
        legend.append('rect')
          .attr('x', vizWidth + 20)
          .attr('y', function(d, i){ return i *  20;})
          // Can reposition legend laong bottom or top of viz but will take a lot of effort to layout cleanly.
          // .attr('x', function(d, i){ return i *  50;})
          // .attr('y', vizHeight + 40)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', function(d) {
            return color(d.name);
          });
            
        legend.append('text')
          .attr('x', vizWidth + 34)
          .attr('y', function (d, i){ return (i *  20) + 9;})
          .text(function (d){ return d.name; })
          .attr('color', '#000')
          .attr('class', function (d) { return d.name/* + ' legend'*/; });
      });
    };

    return directiveDefinitionObject;
  }]);