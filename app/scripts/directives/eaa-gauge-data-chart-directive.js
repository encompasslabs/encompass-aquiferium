'use strict';

angular.module('app.directives.d3.charts', [])
  .directive('eaaGaugeDataChart', function() {
    // console.log('eaaAquifersBoundaryMap directive initialized.');
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
      // alert(xx + ' × ' + yy);
      // alert(window.screen.availWidth);
      // alert(window.screen.availHeight);
      var xScaling = 0.9; //0.965;
      var yScaling = 0.2; //0.65;
      var width = xx * xScaling;
      var height = yy * yScaling;

      var dataSource1 = '../../data/eaaAquiferium-allSpringsData-annualAvg-byDate.csv';

      var vizMargin = {top: 20, right: 180, bottom: 50, left: 50};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      var color = d3.scale.category10().domain(['Barton Springs', 'Comal Springs', 'Hueco Springs', 'J17', 'J27', 'Las Moras Springs', 'Leona Springs', 'San Antonio Springs', 'San Marcos Springs', 'San Pedro Springs']);
      var dataKey = d3.scale.ordinal();
      var parseDate = d3.time.format('%Y');

      var x = d3.time.scale().range([0, vizWidth]);
      var y = d3.scale.linear().range([vizHeight, 0]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(20);
      var yAxis = d3.svg.axis().scale(y).orient('left').ticks(20);

      var el = element[0];

      var chart = d3.select(el).append('svg').attr('class', 'chart')
        .attr('width', vizWidth + vizMargin.left + vizMargin.right)
        .attr('height', vizHeight + vizMargin.top + vizMargin.bottom)
        .append('g')
        .attr('transform', 'translate(0,400)');

      var line = d3.svg.line()
        .interpolate('monotone') // basis, basis-open, basis-closed, linear, step, step-before, step-after, bundle, cardinal, cardinal-open, cardinal-closed, monotone 
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.gindex); })
        .defined(function (d) { return d.gindex; });

      // METHODS.
      // d3.selection.prototype.moveToFront = function () {
      //   return this.each(function () {
      //     this.parentNode.appendChild(this);
      //   });
      // };

      // d3.selection.prototype.moveToBack = function () {
      //   return this.each(function () {
      //     var firstChild = this.parentNode.firstChild;
      //     if (firstChild) {
      //       this.parentNode.insertBefore(this, firstChild);
      //     }
      //   });
      // };

      function overGauge (d) {
        // console.log('over gauge: ', d.name);
        this.parentNode.parentNode.appendChild(this.parentNode);
        d3.select(this).style('stroke-width', '6px');
      };

      function outGauge (d) {
        d3.select(this).style('stroke-width', '2px');
      };

      // VIZ.
      d3.csv(dataSource1, function(error, data) {

        data.forEach(function(d) {
          d.Date = parseDate.parse(d.Date);
          d['Barton Springs'] = +d['Barton Springs'];
          d['Comal Springs'] = +d['Comal Springs'];
          d['Hueco Springs'] = +d['Hueco Springs'];
          d['J17'] = +d['J17'];
          d['J27'] = +d['J27'];
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
        // console.log('x.domain: ', x.domain());
        // console.log('y.domain: ', y.domain());

        chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + (height - vizMargin.bottom - vizMargin.top) + ')')
          .call(xAxis);

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Gauge Level');

        var gauge = chart.selectAll('.gauge')
          .data(gauges)
          .enter().append('g')
          .attr('class', function (gauges) { return gauges['name']; });
            
        gauge.append('path')  
          .attr('class', 'line')
          .attr('d', function (d) { 
            return line(d.values);
          })
          .style('stroke', function (d) { return color(d.name); }) 
          .on('mouseover', overGauge)
          .on('mouseout', outGauge)
          .attr('id', function(d, i) { return d.name; });

        var filtered = gauge
          // Filter data points by gauge.
          .filter(function(d){
            // console.log(d);
            // return d.name == 'J27';
            // return d.values.gindex !== NaN;
            // return d.name === 'Barton Springs' || 'Comal Springs' || 'Hueco Springs' || 'J17' || 'J27' || 'Las Moras Springs' || 'Leona Springs' || 'San Antonio Springs' || 'San Marcos Springs' || 'San Pedro Springs';
          })
          .selectAll('circle')
          .data(function (d){ return d.values; })
          .enter().append('circle')
          .attr({ cx: function (d,i) { return x(d.date); }, cy: function (d,i){ return y(d.gindex); }, r: 2 })
          .style('fill', '#555');

        filtered.on('mouseover', function (d) {
          filtered.append("text")
            .attr({
                x: function (dd){
                  return x(d.date)
                },
                y: function (dd){
                  return y(d.gindex)
                },
                dx:-3,
                dy:".35em",
                "text-anchor":"end"
            })
            .style("fill", "black")
            .text( function (dd) {
                var formatDate = d3.time.format("%d-%B-%Y");
                return 'Date:' + formatDate(d.date) + ',index:' + d.gindex;
              }
            )
          })
          .on('mouseout', function(dd){
          d3.select(this.parentElement)
          .selectAll('text').remove()
          });

        // Doesn't display lables properly due to gaps in data. Specifically for Leona Springs.
        // gauge.append('text')
        //   .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        //   .attr('transform', function(d) { return 'translate(' /*+ '(20,'*/ + (x(d.value.date) + 10) + ','  + y(d.value.gindex) + ')'; })
        //   .attr('x', 3)
        //   .attr('dy', '.35em')
        //   .text(function(d) { return d.name; });

        var legend = chart.selectAll('.chart')
          .data(gauges)
          .enter()
          .append('g')
          .attr('class', 'legend');
          // .attr('transform', 'translate(' + 0 + ',' + vizHeight / 4 + ')');  // Will reposition the legend group.
          
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

    console.log('directiveDefinitionObject: ', directiveDefinitionObject);
    return directiveDefinitionObject;
  });