'use strict';

angular.module('eaa.directives.d3.interactive.wells', [])
  .directive('eaaGaugeDataInteractiveWells', [function() {
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

    directiveDefinitionObject.link = function postLink (scope, element) {

      // VARS.
      var container = $('#interactive');
      var containerWidth = container.width();

      var width = containerWidth;
      var height = width * 0.75;

      var vizMargin = {top: 0, right: 0, bottom: 0, left: 0};
      var vizWidth = width - vizMargin.left - vizMargin.right;
      var vizHeight = height - vizMargin.top - vizMargin.bottom;

      var dataDisplayWidth = vizWidth * 0.4;
      var dataDisplayHeight = vizHeight * 0.4;

      var mapWidth = vizWidth;
      var mapHeight = vizHeight * 0.35;

      var graphWidth = vizWidth;
      var graphHeight = vizHeight * 0.45;
      var graphLeftOffset = vizWidth * 0.05;
      var graphWidthOffset = 0.98;

      var slideDescText = 'Index wells in the region showcase water levels under the surface.';
      var mapImageStagesSource = '../../images/directives/Stages-Key.png';
      var mapImageBaseSource = '../../images/directives/J17-J27-Index-Wells-Map.png';

      var mapMarkerJ17_stage1Green = '../../images/directives/J17-Green-Callout.png';
      var mapMarkerJ17_stage2Yellow = '../../images/directives/J17-Yellow-Callout.png';
      var mapMarkerJ17_stage3Orange = '../../images/directives/J17-Orange-Callout.png';
      var mapMarkerJ17_stage4Red = '../../images/directives/J17-Red-Callout.png';
      var mapMarkerJ17_stage5Purple = '../../images/directives/J17-Purple-Callout.png';
      
      var mapMarkerJ27_stage1Green = '../../images/directives/J27-Green-Callout.png';
      var mapMarkerJ27_stage2Yellow = '../../images/directives/J27-Yellow-Callout.png';
      var mapMarkerJ27_stage3Orange = '../../images/directives/J27-Orange-Callout.png';
      var mapMarkerJ27_stage4Red = '../../images/directives/J27-Red-Callout.png';
      var mapMarkerJ27_stage5Purple = '../../images/directives/J27-Purple-Callout.png';      
      
      var boundariesSource = '../../data/geojson/eaa/eaa_boundary_EPSG-3081.geo.json';
      var markersSource = '../../data/wells-markerData.csv';
      var dataSource = '../../data/wells-annualAvg-byDate.csv';
      var ingestedData = {};

      // var markerRadius = 5;
      // var mapLabels = [];
      // var mapLabelsLength = mapLabels.length;

      var legendBoxDimensions = width / 50;
      var legendVertSpacingFactor = 1;
      var legendVertOffset = legendBoxDimensions * 0.8;

      var color = d3.scale.category10().domain(['Barton Springs', 'Comal Springs', 'Hueco Springs', 'J17', 'J27', 'Las Moras Springs', 'Leona Springs', 'San Antonio Springs', 'San Marcos Springs', 'San Pedro Springs']);
      var dataKey = d3.scale.ordinal();
      var parseDate = d3.time.format('%Y');

      var x = d3.time.scale().range([graphLeftOffset, graphWidth*graphWidthOffset]);
      var y = d3.scale.linear().range([graphHeight-50, 50]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(20);
      var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10);

      var xPosRange = [];
      var xNumericRange = 0;
      var dateRange = [];
      var xMinDate = 0;
      var xMaxDate = 0;
      var dateDelta = 0;
      var posYear = 0;

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

      var roundDecimals = function (value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
      };

      var defineInteractionRange = function () {
        xPosRange = [graphLeftOffset, graphWidth*graphWidthOffset];
        xNumericRange = xPosRange[1] - xPosRange[0];
        xMinDate = dateRange.min();
        xMaxDate = dateRange.max();
        dateDelta = xMaxDate - xMinDate;
        posYear = xNumericRange / dateDelta;
        setDisplayDate(xMaxDate);
      };

      var setDataValuePercent = function (dataValue) {
        if (dataValue === 0) {
          newValue = newDataMin;
        } else {
          newValue = (((dataValue - dataRangeMin) * newDataRange) / oldDataRange) + newDataMin;
        }

        decimalValue = roundDecimals((newValue / 100), 2);
      };

      var setMapMarkersJ17 = function (currentGaugeValue) {
        var newJ17Image = d3.select('.map-marker-j17-wells');
        var targetPathJ17 = newJ17Image[0][0];
        var newJ17Stage = d3.select('.stage-j17-value');
        var newj17Level = d3.select('.legend-j17-value');

        if (isNaN(currentGaugeValue)) {
          newj17Level.text('No Data');
        } else {
          newj17Level.text(roundDecimals(currentGaugeValue,2));
        }

        if (currentGaugeValue < 625) {
          // console.log('stage V');
          targetPathJ17.src = mapMarkerJ17_stage5Purple;
          newJ17Stage.style('background-color', '#6d2158');
        } else if (currentGaugeValue >= 625 && currentGaugeValue < 630) {
          // console.log('stage IV');
          targetPathJ17.src = mapMarkerJ17_stage4Red;
          newJ17Stage.style('background-color', '#da1f28');
        } else if (currentGaugeValue >= 630 && currentGaugeValue < 640) {
          // console.log('stageIII');
          targetPathJ17.src = mapMarkerJ17_stage3Orange;
          newJ17Stage.style('background-color', '#e08625');
        } else if (currentGaugeValue >= 640 && currentGaugeValue < 650) {
          // console.log('stageII');
          targetPathJ17.src = mapMarkerJ17_stage2Yellow;
          newJ17Stage.style('background-color', '#e7b921');
        } else if (currentGaugeValue >= 650) {
          // console.log('stage I');
          targetPathJ17.src = mapMarkerJ17_stage1Green;
          newJ17Stage.style('background-color', '#72a641');
        }
      };

      var setMapMarkersJ27 = function (currentGaugeValue) {
        var newJ27Image = d3.select('.map-marker-j27-wells');
        var targetPathJ27 = newJ27Image[0][0];
        var newJ27Stage = d3.select('.stage-j27-value');
        var newj27Level = d3.select('.legend-j27-value');

        if (isNaN(currentGaugeValue)) {
          newj27Level.text('No Data');
        } else {
          newj27Level.text(roundDecimals(currentGaugeValue,2));
        }

        if (currentGaugeValue < 840) {
          // console.log('stage V');
          targetPathJ27.src = mapMarkerJ27_stage5Purple;
          newJ27Stage.style('background-color', '#6d2158');
        } else if (currentGaugeValue >= 840 && currentGaugeValue < 842) {
          // console.log('stage IV');
          targetPathJ27.src = mapMarkerJ27_stage4Red;
          newJ27Stage.style('background-color', '#da1f28');
        } else if (currentGaugeValue >= 842 && currentGaugeValue < 845) {
          // console.log('stageIII');
          targetPathJ27.src = mapMarkerJ27_stage3Orange;
          newJ27Stage.style('background-color', '#e08625');
        } else if (currentGaugeValue >= 845 && currentGaugeValue < 850) {
          // console.log('stageII');
          targetPathJ27.src = mapMarkerJ27_stage2Yellow;
          newJ27Stage.style('background-color', '#e7b921');
        } else if (currentGaugeValue >= 850) {
          // console.log('stage I');
          targetPathJ27.src = mapMarkerJ27_stage1Green;
          newJ27Stage.style('background-color', '#72a641');
        } 
      };

      var setDisplayData = function (targetIndex) {
        // console.log(targetIndex);
        var dataSet = ingestedData[targetIndex];        
        var vals = Object.keys(dataSet).map(function (key) {
          // console.log(key);
          return dataSet[key];
        });
        // console.log(vals);
        var dataLabelArray = d3.select(el).select('.legend-box').selectAll('.legend-item-wells').selectAll('text');
        // console.log(dataLabelArray);
        // Need to populate each legend-item text value with the appropriate val index string (remember to skip 0 which is the Date value).
        for (var j=0; j < dataLabelArray.length; j++) {
          // console.log('------------------------');
          // console.log(j);
          // console.log(dataLabelArray[j]);
          // console.log(dataLabelArray[j]['parentNode']['__data__']);
          // console.log(dataLabelArray[j]['parentNode']['__data__']['name']);
          // console.log(dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]);
          // console.log(dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]['gindex']);
          // console.log(' ');

          var currentGaugeValue = dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]['gindex'];
          // console.log(currentGaugeValue);

          if (j === 0) {
            // console.log('J17');
            setMapMarkersJ17(currentGaugeValue);
          } else if (j === 1) {
            // console.log('J27');
            setMapMarkersJ27(currentGaugeValue);
          }

          // var dataIndexOffset = j + 1;
          // d3.select(dataLabelArray[j][1]).text( function() {
          //   var thisValue = roundDecimals(vals[dataIndexOffset], 0);
          //   // console.log(thisValue);
          //   if (isNaN(thisValue)) {
          //     // console.log('No Data');
          //     return 'No Data';
          //   } else {
          //     // console.log(thisValue);
          //     return thisValue.toString(); // + ' FAMSL';
          //   }
          // });
        }
      };

      // var setMapFill = function (targetDate) {
      //   console.log('setMapFill');
      // };

      var setDisplayDate = function (targetDate) {
        // console.log(targetDate);
        d3.select(el).select('.year-display-wells').text(Math.round(targetDate));
        // setMapFill(targetDate);
      };

      var mouseOverGraph = function (event) {
        var position = d3.mouse(this);
        deriveDate(position[0]);
        // console.log(position);
      };

      var deriveDate = function (xPos) {
        var indicatorLine = d3.select(el).select('.indicator-line');

        if (xPos < xPosRange[0]) {
          setDisplayDate(xMinDate);
          indicatorLine.style('visibility', 'hidden');
        } else if (xPos > xPosRange[1]) { 
          setDisplayDate(xMaxDate);
          indicatorLine.style('visibility', 'hidden');
        } else {

          var normalizedX = xPos - xPosRange[0];
          var yearIndex = normalizedX / posYear;
          var currentDate = xMinDate + yearIndex;

          setDisplayDate(currentDate);
          setDisplayData(Math.round(yearIndex));
          indicatorLine.style('visibility', 'visible');
          updateIndicatorLine(xPos);
          
          // console.log('================================');
          // console.log(xPos);
          // console.log(currentDate);
          // console.log(yearIndex);
          // console.log(Math.round(yearIndex));   
          // console.log(' ');       
        }
      };

      var updateIndicatorLine = function (xPos) {
        var indicatorLine = d3.select(el).select('.indicator-line');
        var gBounds = d3.select('.graph-bounds');
        var y1Pos = gBounds[0][0].clientHeight * 0.15;
        var y2Pos = gBounds[0][0].clientHeight * 0.845;

        indicatorLine.attr('x1', xPos).attr('y1', y1Pos).attr('x2', xPos).attr('y2', y2Pos);
      };

      var onTargetClick = function (target) {
        console.log(target.properties.Name);
      };

      // VIZ - BASE.
      var el = element[0];
      var viz = d3.select(el).append('div').attr('class', 'viz').attr('width', vizWidth).attr('height', vizHeight);
      
       // Slide Banner.
      var slideBanner = viz.append('div').attr('class','slide-banner-wells');
      var descriptionText = slideBanner.append('text')
        .attr('x', '0%')
        .attr('y', '0%')
        .text('Historical Aquifer Levels')
        .attr('class', 'banner-text-wells');

      // Slide Description.
      var slideDescription = viz.append('div').attr('class','slide-desc-wells');
      var descriptionText = slideDescription.append('text')
        .attr('x', '0%')
        .attr('y', '20%')
        .text(slideDescText)
        .attr('class', 'desc-text-wells');

      // Data 
      var dataDisplay = viz.append('div').attr('class','div-absolute data-display-wells');

      // Stages.
      var slideStages = viz.append('div')
        .attr('x', '40%')
        .attr('y', '30%')
        .attr('class', 'legend-stages-wells');

      var stage1 = slideStages.append('div')
        .attr('x', '0%')
        .attr('y', '0%')
        .text('CRITICAL PERIOD STAGE I')
        .attr('class', 'wells-stage wells-stage-1');

      var stage2 = slideStages.append('div')
        .attr('x', '0%')
        .attr('y', function () { return (Number(stage1.y + stage1.height + 5) + 'px').toString(); })
        .text('CRITICAL PERIOD STAGE II')
        .attr('class', 'wells-stage wells-stage-2');

      var stage3 = slideStages.append('div')
        .attr('x', '0%')
        .attr('y', function () { return (Number(stage2.y + stage2.height + 5) + 'px').toString(); })
        .text('CRITICAL PERIOD STAGE III')
        .attr('class', 'wells-stage wells-stage-3');

      var stage4 = slideStages.append('div')
        .attr('x', '0%')
        .attr('y', function () { return (Number(stage3.y + stage3.height + 5) + 'px').toString(); })
        .text('CRITICAL PERIOD STAGE IV')
        .attr('class', 'wells-stage wells-stage-4');

      var stage5 = slideStages.append('div')
        .attr('x', '0%')
        .attr('y', function () { return (Number(stage4.y + stage4.height + 5) + 'px').toString(); })
        .text('CRITICAL PERIOD STAGE V')
        .attr('class', 'wells-stage wells-stage-5');

      // Map Image.
      var slideMap = viz.append('div').attr('class','div-absolute slide-map-wells');

      var mapImageBase = slideMap.append('img')
        .attr('src', mapImageBaseSource)
        .attr('class', 'z-100 map-image-base-wells');

      var mapMarkerJ17 = slideMap.append('img')
        .attr('src', mapMarkerJ17_stage1Green)
        .attr('class', 'div-absolute z-200 map-marker-j17-wells');

      var mapMarkerJ27 = slideMap.append('img')
        .attr('src', mapMarkerJ27_stage1Green)
        .attr('class', 'div-absolute z-200 map-marker-j27-wells');

      viz.on('mousemove', mouseOverGraph);
      viz.append('text').attr('class','year-display-wells').text('');

      // var geoBounds = viz.append('svg').attr('class', 'geo-bounds wells')
      //   .attr('width', mapWidth)
      //   .attr('height', mapHeight);

      var graphBounds = viz.append('svg').attr('class', 'graph-bounds')
        .attr('width', graphWidth)
        .attr('height', graphHeight);

      // interpolate options: basis, basis-open, basis-closed, linear, step, step-before, step-after, bundle, cardinal, cardinal-open, cardinal-closed, monotone;
      var line = d3.svg.line()
        .interpolate('monotone')
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.gindex); })
        .defined(function (d) { return d.gindex; });

      // MAP.
      // d3.json(boundariesSource, function (error, boundariesData) {
      //   if (error) {
      //     return console.error(error);
      //   }
      //   var scale = mapHeight * 30; // geojson display.
      //   var offset = [mapWidth / 2, mapHeight / 2];
      //   var center = d3.geo.centroid(boundariesData);
      //   // Valid projection types: azimuthalEqualArea, azimuthalEquidistant, conicEqualArea, conicConformal, conicEquidistant, equirectangular, gnomonic, mercator, orthographic, stereographic, 
      //   // Note: albersUsa() and transverseMercator() require additional configs.
      //   var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);
      //   var path = d3.geo.path().projection(projection);
      //   var geoBoundaries = geoBounds.selectAll('g').data(boundariesData.features).enter().append('g');
      //   geoBoundaries.append('path').attr('d', path).attr('class', 'area').attr('fill', '#8F8100').attr('stroke', '#000');
      //   var eaaMarkers = geoBoundaries.append('g');

      //   d3.csv(markersSource, function (error, data) {
      //     if (error) {
      //       return console.error(error);
      //     }
      //     eaaMarkers.selectAll('circle').data(data).enter().append('circle')
      //       .attr('class', function (d) { return d.Location; })
      //       .attr('cx', function (d) {
      //         return projection([d.lon_ddd, d.lat_ddd])[0];
      //       })
      //       .attr('cy', function (d) {
      //         return projection([d.lon_ddd, d.lat_ddd])[1];
      //       })
      //       .attr('r', markerRadius)
      //       .attr('z-index', 0)
      //       .style('fill', function (d) { return color(d.Location); })
      //       .style('stroke', '#000')
      //       .on('click', onTargetClick);
      //   });
      // });

      // CHART.
      d3.csv(dataSource, function (error, data) {

        data.forEach(function (d) {
          dateRange.push(parseInt(d.Date));
          d.Date = parseDate.parse(d.Date);
          d['J17'] = +d['J17'];
          d['J27'] = +d['J27'];
        });

        ingestedData = data;

        dataKey.domain(d3.keys(data[0]).filter(function (key) { return key !== 'Date'; }));

        var gauges = dataKey.domain().map(function (name) {
          return {
            name: name,
            values: data.map(function (d) {
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
          .attr('class', 'gauge-data');
            
        gauge.append('path')
          .attr('class', 'line')
          .attr('d', function (d) {
            return line(d.values);
          })
          .style('stroke', function (d) { return color(d.name); })
          .attr('id', function (d) { return d.name; });

        // Filter data points by gauge.
        var filtered = gauge.filter(function (d) {})
          .selectAll('circle')
          .data(function (d) { return d.values; })
          .enter().append('circle')
          .attr({ cx: function (d) { return x(d.date); }, cy: function (d) { return y(d.gindex); }, r: 2 })
          .style('fill', '#555');

        var indicatorLine = graphBounds.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 0).attr('stroke-width', 1).attr('stroke', 'rgba(50,50,50,0.9)').attr('class', 'indicator-line');
        
        // LEGEND.
        var legend = dataDisplay.append('div').attr('class','legend-box legend-box-wells').attr('transform', 'translate(-180,30)');
        var legendItem = legend.selectAll('.svg').data(gauges).enter().append('svg').attr('class', 'legend-item-wells');

        var dataTitleJ17 = legend.append('div').attr('class', 'div-absolute legend-title legend-j17-title').text('J17 Index Well');
        var dataLabelJ17 = legend.append('div').attr('class', 'div-absolute data-label-wells legend-j17-label').text('Level: ');
        var dataValueJ17 = legend.append('div').attr('class', 'div-absolute data-value-wells legend-j17-value').text('TBD');
        var stageLabelJ17 = legend.append('div').attr('class', 'div-absolute stage-label-wells stage-j17-label').text('Stage: ');
        var stageValueJ17 = legend.append('div').attr('class', 'div-absolute stage-value-wells stage-j17-value stage-box');

        var dataTitleJ27 = legend.append('div').attr('class', 'div-absolute legend-title legend-j27-title').text('J27 Index Well');
        var dataLabelJ27 = legend.append('div').attr('class', 'div-absolute data-label-wells legend-j27-label').text('Level: ');
        var dataValueJ27 = legend.append('div').attr('class', 'div-absolute data-value-wells legend-j27-value').text('TBD');
        var stageLabelJ27 = legend.append('div').attr('class', 'div-absolute stage-label-wells stage-j27-label').text('Stage: ');
        var stageValueJ27 = legend.append('div').attr('class', 'div-absolute stage-value-wells stage-j27-value stage-box');

        // NOTE.
        var notes = viz.append('div').attr('class','graph-notes')
          .append('text')          
          .text('Note: Any gaps in the data lines represent gaps in the collected data for that time period.');          

        defineInteractionRange();
      });
    };

    return directiveDefinitionObject;
  }]);