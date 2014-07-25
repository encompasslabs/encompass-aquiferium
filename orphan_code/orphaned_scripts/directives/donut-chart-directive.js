'use strict';

angular.module('d3-visualizations', [])
  .directive('donutChart', function () {
    console.log('donutChart directive initialized.');
    function link(scope, element) {
      var color = d3.scale.category10();
      var el = element[0];  // d3.select('texas-eaa-aquifers');
      var width = el.clientWidth;
      var height = el.clientHeight;
      var min = Math.min(width, height);
      var radius = Math.min(width, height) / 2;
      var duration = 750;
      var easing = 'circle-in-out';  // elastic, linear
      var pie = d3.layout.pie().sort(null);

      var arc = d3.svg.arc()
        .outerRadius(min / 2 * 0.9)
        .innerRadius(min / 2 * 0.5);

      console.log(el);

      var svg = d3.select(el).append('svg:svg')
        .attr({
          width: width,
          height: height
        });

      var g = svg.append('g')
        .attr('class', 'donut')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      // add the <path>s for each arc slice
      var arcs = g.selectAll('.donut').data(pie(scope.data))
        .enter().append('path')
        .attr('class', 'arc')
        .style('stroke', 'white')
        .attr('fill', function (d, i) {
          return color(i);
        })
        // .attr('d', arc)
        .each(function (d) {  // store the initial angles
          return this._current = d;
        });

      svg.on('mousedown', function (d) {
        // yo angular, the code in this callback might make a change to the scope!
        // so be sure to apply $watch's and catch errors.
        scope.$apply(function () {
          if (scope.onClick) {
            scope.onClick();
          }
        });
      });

      function arcTween(a) {
        // see: http://bl.ocks.org/mbostock/1346410
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function (t) {
          return arc(i(t));
        };
      }

      // GROUP FOR CENTER TEXT
      var center_group = svg.append('svg:g')
        .attr('class', 'ctrGroup')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

      // CENTER LABEL
      var pieLabel = center_group.append('svg:text')
        .attr('dy', '.35em').attr('class', 'chartLabel')
        .attr('text-anchor', 'middle')
        .text('CLICK THE DONUT');

      // DRAW SLICE LABELS
      var sliceLabel = g.selectAll('.arc').data(pie(scope.data))
        .enter().append('svg:text')
        .attr('class', 'arcLabel')
        .attr('transform', function (d) {return 'translate(' + arc.centroid(d) + ')'; })
        .attr('text-anchor', 'middle')
        .text(function (d, i) {
          return d.data;
        });

      // our data changed! update the arcss, adding, updating, or removing elements as needed.
      scope.$watch('data', function (newData, oldData) {
        var delay = 50; //50 //150 //300
        var data = newData.slice(0); // copy
        var PI = Math.PI;

        while (data.length < oldData.length) {
          data.push(0);
        }

        var updatedArcs = g.selectAll('.arc').data(pie(data));

        updatedArcs.transition()
          .delay(function(d, i) {
            return i * delay;
          })
          .duration(duration).ease(easing).attrTween('d', arcTween);

        // transition in any new slices.
        updatedArcs.enter().append('path')
          .style('stroke', 'white')
          .attr('class', 'arc')
          .attr('fill', function (d, i) {
            return color(i);
          })
          .each(function (d) {
            this._current = {
              startAngle: 2 * PI - 0.001,
              endAngle: 2 * PI
            };
          })
          .transition().delay(function(d, i) {
            return i * delay;
          })
          .duration(duration).attrTween('d', arcTween);

        // transition out any slices with size = 0.
        updatedArcs.filter(function (d) {
          return d.data === 0;
        })
          .transition()
          .delay(function(d, i) {
            return i * delay;
          })
          .duration(duration)
          .each(function (d) {
            d.startAngle = 2 * PI - 0.001;
            d.endAngle = 2 * PI;
          })
          .attrTween('d', arcTween)
          .remove();

        var updatedSliceLabel = g.selectAll('.donut').data(pie(scope.data));

        updatedSliceLabel.enter().append('svg:text')
          .attr('class', 'arcLabel')
          .attr('text-anchor', 'middle')
          .text(function (d, i) {
            return d.data;
          })
          .transition()
          .delay(function(d, i) {
            return i * delay;
          })
          .duration(duration)
          .ease('elastic')
          .attr('transform', function (d) {
            return 'translate(' + arc.centroid(d) + ')';
          });

        updatedSliceLabel.exit()
          .transition()
          .duration(duration)
          .attr('opacity', 0)
          .remove();
      });
    }

    // isolate scope
    return {
      scope: {
        'data': '=',
        'onClick': '&'
      },
      restrict: 'E',
      replace: false,
      link: link
    };
  });
