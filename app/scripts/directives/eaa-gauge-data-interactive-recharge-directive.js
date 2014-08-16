'use strict';

angular.module('eaa.directives.d3.interactive.recharge', [])
  .directive('eaaGaugeDataInteractiveRecharge', [function() {
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
      var height = width * 0.9; // w.innerHeight || e.clientHeight || g.clientHeight; // width * 0.75;

      var vizMargin = {top: 0, right: 0, bottom: 0, left: 0};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      var dataDisplayWidth = vizWidth * 0.4;
      var dataDisplayHeight = vizHeight * 0.4;

      var mapWidth = vizWidth;
      var mapHeight = vizHeight * 0.4;

      var graphWidth = vizWidth;
      var graphHeight = vizHeight * 0.4;
      var graphLeftOffset = vizWidth * 0.05; //0; //graphWidth*0.1;

      var legendWidth = vizWidth * 0.4;
      var legendHeight = vizHeight * 0.4;

      var boundariesSource = '../../data/geojson/eaa-aquifer-zones-2014.geo.json';
      var dataSource = '../../data/recharge-annualAvg-byDate.csv';

      var markerRadius = 5;
      var mapLabels = [];
      var mapLabelsLength = mapLabels.length;

      var color = d3.scale.category10().domain(['Barton Springs', 'Comal Springs', 'Hueco Springs', 'J17', 'J27', 'Las Moras Springs', 'Leona Springs', 'San Antonio Springs', 'San Marcos Springs', 'San Pedro Springs']);
      var dataKey = d3.scale.ordinal();
      var parseDate = d3.time.format('%Y');

      var x = d3.time.scale().range([graphLeftOffset, graphWidth*0.95]);
      var y = d3.scale.linear().range([graphHeight-50, 50]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(20);
      var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10);

      var xPosRange = [graphLeftOffset, graphWidth*0.95];
      var dateRange = [];
      var xMinDate = 0;
      var xMaxDate = 0;

      // METHODS.
      Array.prototype.max = function() {
        var max = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
        return max;
      }

      Array.prototype.min = function() {
        var min = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
        return min;
      }

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

      var mouseOverGraph = function(event) {
        // console.log(xPosRange);
        console.log(xPosRange[0]);
        console.log(xPosRange[1]);

        var xNumericRange = xPosRange[1] - xPosRange[0];
        console.log('the numeric range is: ' + xNumericRange);

        // console.log(dateRange);
        console.log(xMinDate);
        console.log(xMaxDate);

        var dateDelta = xMaxDate - xMinDate;
        console.log(dateDelta);

        var position = d3.mouse(this);
        var mouseX = position[0];
        var mouseY = position[1];

        // console.log(position);
        console.log(position[0]);
        console.log(position[1]);

        if (mouseX < xPosRange[0]) {
          console.log('left of lowest year');
          // set year and data to lowest.
          // d3.select(dataDisplay).text(xMinDate);
        } else if (mouseX > xPosRange[1]) {
          console.log('right of highest year');
          // set year and data to highest.
          // d3.select(dataDisplay).text(xMaxDate);
        } else {
          console.log('mouse over the x data range');
          // Set year according to mouseX position with date range.
          // Need formula to derive the correct year.
        }
      }

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
        console.log(target.properties.Name);
      }

      // VIZ - BASE.
      var el = element[0];
      var viz = d3.select(el).append('div').attr('class', 'viz').attr('width', vizWidth).attr('height', vizHeight);
      // viz.on('click', vizClick);
      viz.on('mousemove', mouseOverGraph);

      var dataDisplay = viz.append('div').attr('class','data-display');
      dataDisplay.append('text').attr('class','year-display').text('YYYY');

      var geoBounds = viz.append('svg').attr('class', 'geo-bounds')
        .attr('width', mapWidth)
        .attr('height', mapHeight);

      var graphBounds = viz.append('svg').attr('class', 'graph-bounds')
        .attr('width', graphWidth)
        .attr('height', graphHeight);

      // interpolate options: basis, basis-open, basis-closed, linear, step, step-before, step-after, bundle, cardinal, cardinal-open, cardinal-closed, monotone;
      var line = d3.svg.line()
        .interpolate('monotone')
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.gindex); })
        .defined(function (d) { return d.gindex; });

      // VIZ - MAP.
      d3.json(boundariesSource, function (error, boundariesData) {
        if (error) {
          return console.error(error);
        }
        var scale = mapHeight * 30; // geojson display.
        var offset = [mapWidth / 2, mapHeight / 2];
        var center = d3.geo.centroid(boundariesData);
        // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
        // Note: albersUsa() and transverseMercator() require additional configs.
        var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);
        var path = d3.geo.path().projection(projection);
        var geoBoundaries = geoBounds.selectAll('g').data(boundariesData.features).enter().append('g');
        geoBoundaries.append('path').attr('d', path).attr('class', function(d) { return "subunit " + d.properties.Name; }).attr('stroke', '#000').on('click', onTargetClick);
        geoBoundaries.append("text")
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("class", "map-label")
          .text(function(d) {      
            var thisName = d.properties.Name;
            var nameExists = false;

            if (mapLabelsLength === 0) {
              mapLabels.push(thisName);
              mapLabelsLength = mapLabels.length;
              return thisName;
            }

            for (var i = 0; i < mapLabelsLength; ++i) {
              if (thisName == mapLabels[i]) {
                nameExists = true;
              }
            }

            if (!nameExists) {
              mapLabels.push(thisName);
              mapLabelsLength = mapLabels.length;
              return thisName;
            }

            console.log('mapLabels: ' + mapLabels);
          });
      });

      // VIZ - CHART.
      d3.csv(dataSource, function(error, data) {

        data.forEach(function(d) {
          dateRange.push(parseInt(d.Date));
          d.Date = parseDate.parse(d.Date);          
          d['Station ID: AY 68-37-203'] = +d['Station ID: AY 68-37-203'];
        });

        xMinDate = dateRange.min();
        xMaxDate = dateRange.max();

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

        // xPosRange.push( x.domain(d3.extent(data, function (d) { return d.Date; })) );

        graphBounds.append('g')
          .attr('class', 'x axis')
          .attr('id', 'xAxis')
          .attr('transform', 'translate(0,' + (graphHeight - 50) + ')')
          .call(xAxis);

        graphBounds.append('g')
          .attr('class', 'y axis')
          .attr('id', 'yAxis')
          .attr('transform', 'translate(' + graphLeftOffset + ',0)')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -50)
          .attr('dy', '1em')
          .style('text-anchor', 'end')
          .text('ft above msl');

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

        var legend = dataDisplay.append('svg').attr('class','legend')
          .attr('width', legendWidth)
          .attr('height', legendHeight)
          .selectAll('.svg').data(gauges).enter().append('g');
          
        legend.append('rect')
          .attr('x', 20)
          .attr('y', function(d, i){ return i *  20;})
          .attr('width', 20)
          .attr('height', 20)
          .style('fill', function(d) {
            return color(d.name);
          })
          .style('stroke-width', '1px')
          .style('color', '#0f0');
            
        legend.append('text')
          .attr('x', 50)
          .attr('y', function (d, i){ return (i *  20) + 16;})
          .text(function (d){ return d.name; })
          .attr('color', '#000')
          .attr('class', function (d) { return d.name/* + ' legend'*/; });
      });
    };

    return directiveDefinitionObject;
  }]);