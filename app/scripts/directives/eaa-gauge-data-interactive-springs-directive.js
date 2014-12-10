'use strict';

angular.module('eaa.directives.d3.interactive.springs', [])
    .directive('eaaGaugeDataInteractiveSprings', [function() {
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

        directiveDefinitionObject.link = function postLink(scope, element) {

            // VARS.
            var container = $('#interactive');
            var containerWidth = container.width();

            var width = containerWidth;
            var height = width * 0.75;

            var vizMargin = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
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

            // var slideDescText = 'Springs do...';
            var mapImageStagesSource = '../../images/directives/Stages-Key.png';
            var mapImageBaseSource = '../../images/directives/Springs-Map.png';

            var boundariesSource = '../../data/geojson/eaa/eaa_boundary_EPSG-3081.geo.json';
            var markersSource = '../../data/springs-markerData.csv';
            var dataSource = '../../data/springs-annualAvg-byDate.csv';
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

            var x = d3.time.scale().range([graphLeftOffset, graphWidth * graphWidthOffset]);
            var y = d3.scale.linear().range([graphHeight - 50, 50]);

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
                for (var i = 1; i < len; i++)
                    if (this[i] > max) max = this[i];
                return max;
            }

            Array.prototype.min = function() {
                var min = this[0];
                var len = this.length;
                for (var i = 1; i < len; i++)
                    if (this[i] < min) min = this[i];
                return min;
            }

            d3.selection.prototype.moveToFront = function() {
                return this.each(function() {
                    this.parentNode.appendChild(this);
                });
            };

            d3.selection.prototype.moveToBack = function() {
                return this.each(function() {
                    var firstChild = this.parentNode.firstChild;
                    if (firstChild) {
                        this.parentNode.insertBefore(this, firstChild);
                    }
                });
            };

            var roundDecimals = function(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            };

            var defineInteractionRange = function() {
                xPosRange = [graphLeftOffset, graphWidth * graphWidthOffset];
                xNumericRange = xPosRange[1] - xPosRange[0];
                xMinDate = dateRange.min();
                xMaxDate = dateRange.max();
                dateDelta = xMaxDate - xMinDate;
                posYear = xNumericRange / dateDelta;
                setDisplayDate(xMaxDate);
            };

            var setDataValuePercent = function(dataValue) {
                if (dataValue === 0) {
                    newValue = newDataMin;
                } else {
                    newValue = (((dataValue - dataRangeMin) * newDataRange) / oldDataRange) + newDataMin;
                }

                decimalValue = roundDecimals((newValue / 100), 2);
            };

            var setDataLabel = function(targetIndex, currentGaugeValue) {

                var newDataValue = d3.select('.data-value-springs-' + targetIndex.toString());

                if (isNaN(currentGaugeValue)) {
                    newDataValue.text('No Data');
                } else {
                    newDataValue.text(roundDecimals(currentGaugeValue, 2));
                }
            };

            var setDisplayData = function(targetIndex) {
                // console.log(targetIndex);
                var dataSet = ingestedData[targetIndex];
                var vals = Object.keys(dataSet).map(function(key) {
                    return dataSet[key];
                });
                var dataLabelArray = d3.select(el).select('.legend-box').selectAll('.legend-item-springs').selectAll('text');

                // Need to populate each legend-item text value with the appropriate val index string (remember to skip 0 which is the Date value).
                for (var j = 0; j < dataLabelArray.length; j++) {
                    // console.log('gaugeIndex: ' + j + ', currentGaugeName: ' + currentGaugeName + ', currentGaugeValue: ' + currentGaugeValue + ', dataIndex: ' + targetIndex);
                    // console.log(vals);
                    // console.log('j: ' + j + ', ' + currentGaugeName + ' = ' + currentGaugeValue);
                    var currentGaugeName = dataLabelArray[j]['parentNode']['__data__']['name'];
                    var currentGaugeValue = dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]['gindex'];
                    setDataLabel(j, currentGaugeValue);
                }
            };

            var setDisplayDate = function(targetDate) {
                d3.select(el).select('.year-display-springs').text(Math.round(targetDate));
            };

            var mouseOverGraph = function(event) {
                var position = d3.mouse(this);
                deriveDate(position[0]);
            };

            var deriveDate = function(xPos) {
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
                }
            };

            var updateIndicatorLine = function(xPos) {
                var indicatorLine = d3.select(el).select('.indicator-line');
                var gBounds = d3.select('.graph-bounds');
                var y1Pos = gBounds[0][0].clientHeight * 0.15;
                var y2Pos = gBounds[0][0].clientHeight * 0.845;

                indicatorLine.attr('x1', xPos).attr('y1', y1Pos).attr('x2', xPos).attr('y2', y2Pos);
            };

            var onTargetClick = function(target) {
                console.log(target.properties.Name);
            };

            // VIZ - BASE.
            var el = element[0];
            var viz = d3.select(el).append('div').attr('class', 'viz').attr('width', vizWidth).attr('height', vizHeight);

            // Slide Banner.
            var slideBanner = viz.append('div').attr('class', 'slide-banner-springs');
            var descriptionText = slideBanner.append('text')
                .attr('x', '0%')
                .attr('y', '0%')
                .text('Springs')
                .attr('class', 'banner-text-springs');

            // Slide Description.
            // var slideDescription = viz.append('div').attr('class','slide-desc-springs');
            // var descriptionText = slideDescription.append('text')
            //   .attr('x', '0%')
            //   .attr('y', '20%')
            //   .text(slideDescText)
            //   .attr('class', 'desc-text-springs');

            // Data
            var dataDisplay = viz.append('div').attr('class', 'div-absolute data-display-springs');

            // Map Image.
            var slideMap = viz.append('div').attr('class', 'div-absolute slide-map-springs');

            var mapImageBase = slideMap.append('img')
                .attr('src', mapImageBaseSource)
                .attr('class', 'z-100 map-image-base-springs');

            viz.on('mousemove', mouseOverGraph);
            viz.append('text').attr('class', 'year-display-springs').text('');

            // var geoBounds = viz.append('svg').attr('class', 'geo-bounds springs')
            //   .attr('width', mapWidth)
            //   .attr('height', mapHeight);

            var graphBounds = viz.append('svg').attr('class', 'graph-bounds')
                .attr('width', graphWidth)
                .attr('height', graphHeight);

            // interpolate options: basis, basis-open, basis-closed, linear, step, step-before, step-after, bundle, cardinal, cardinal-open, cardinal-closed, monotone;
            var line = d3.svg.line()
                .interpolate('monotone')
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.gindex);
                })
                .defined(function(d) {
                    return d.gindex;
                });

            // MAP.
            // d3.json(boundariesSource, function (error, boundariesData) {
            //   if (error) {
            //     return console.error(error);
            //   }
            //   var scale = mapHeight * 28; // geojson display.
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
            d3.csv(dataSource, function(error, data) {

                data.forEach(function(d) {
                    dateRange.push(parseInt(d.Date));
                    d.Date = parseDate.parse(d.Date);
                    // d['Barton Springs'] = +d['Barton Springs'];
                    d['Comal Springs'] = +d['Comal Springs'];
                    d['Hueco Springs'] = +d['Hueco Springs'];
                    // d['Las Moras Springs'] = +d['Las Moras Springs'];
                    d['Leona Springs'] = +d['Leona Springs'];
                    d['San Antonio Springs'] = +d['San Antonio Springs'];
                    d['San Marcos Springs'] = +d['San Marcos Springs'];
                    d['San Pedro Springs'] = +d['San Pedro Springs'];
                });

                ingestedData = data;

                dataKey.domain(d3.keys(data[0]).filter(function(key) {
                    return key !== 'Date';
                }));

                var gauges = dataKey.domain().map(function(name) {
                    return {
                        name: name,
                        values: data.map(function(d) {
                            return {
                                date: d.Date,
                                gindex: +d[name]
                            };
                        })
                    };
                });

                x.domain(d3.extent(data, function(d) {
                    return d.Date;
                }));

                y.domain([
                    d3.min(gauges, function(c) {
                        return d3.min(c.values, function(v) {
                            return v.gindex;
                        });
                    }),
                    d3.max(gauges, function(c) {
                        return d3.max(c.values, function(v) {
                            return v.gindex;
                        });
                    })
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
                    .attr('x', -70)
                    .attr('dy', '1em')
                    .style('text-anchor', 'end')
                    .text('cfs');

                var gauge = graphBounds.selectAll('.gauge')
                    .data(gauges)
                    .enter().append('g')
                    .attr('class', 'gauge-data');

                gauge.append('path')
                    .attr('class', 'line')
                    .attr('d', function(d) {
                        return line(d.values);
                    })
                    .style('stroke', function(d) {
                        return color(d.name);
                    })
                    .attr('id', function(d) {
                        return d.name;
                    });

                // Filter data points by gauge.
                var filtered = gauge.filter(function(d) {})
                    .selectAll('circle')
                    .data(function(d) {
                        return d.values;
                    })
                    .enter().append('circle')
                    .attr({
                        cx: function(d) {
                            return x(d.date);
                        },
                        cy: function(d) {
                            return y(d.gindex);
                        },
                        r: 2
                    })
                    .style('fill', '#555');

                var indicatorLine = graphBounds.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 0).attr('stroke-width', 1).attr('stroke', 'rgba(50,50,50,0.9)').attr('class', 'indicator-line');

                // LEGEND.
                var legend = dataDisplay.append('div').attr('class', 'legend-box legend-box-springs').attr('transform', 'translate(-180,30)');
                var legendItem = legend.selectAll('.svg').data(gauges).enter().append('svg').attr('class', function(d, i) {
                    return 'div-absolute legend-item-springs legend-item-springs-' + i.toString();
                });

                var dataBox_ = legendItem.append('rect')
                    .attr('width', legendBoxDimensions)
                    .attr('height', legendBoxDimensions)
                    .attr('class', function(d, i) {
                        return 'legend-box-springs-' + i.toString();
                    })
                    .style('fill', function(d) {
                        if (d === 4 || d === 5) {
                            return null;
                        } else {
                            return color(d.name);
                        }
                    });

                var dataLabel_0 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-0').text('Hueco Springs');
                var dataLabel_1 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-1').text('San Antonio Springs');
                var dataLabel_2 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-2').text('San Pedro Springs');
                var dataLabel_3 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-3').text('Leona Springs');
                // var dataLabel_4 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-4').text('Test4 Springs');
                // var dataLabel_5 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-5').text('Test5 Springs');
                var dataLabel_6 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-6').text('San Marcos Springs');
                var dataLabel_7 = legend.append('div').attr('class', 'div-absolute data-label-springs data-label-springs-7').text('Comal Springs');

                var dataValue_0 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-0').text('0236971');
                var dataValue_1 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-1').text('0236971');
                var dataValue_2 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-2').text('0236971');
                var dataValue_3 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-3').text('0236971');
                // var dataValue_4 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-4').text('0236971');
                // var dataValue_5 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-5').text('0236971');
                var dataValue_6 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-6').text('0236971');
                var dataValue_7 = legend.append('div').attr('class', 'div-absolute data-value-springs data-value-springs-7').text('0236971');

                var lineBreak = legend.append('svg').attr('width', '100%').attr('class', 'linebreak-hr').append('line').attr('x1', '0').attr('y1', '45').attr('x2', '100%').attr('y2', '45').attr('stroke', '#000').attr('stroke-width', '2');

                // NOTE.
                var notes = viz.append('div').attr('class', 'graph-notes')
                    .append('text')
                    .text('Note: Any gaps in the data lines represent gaps in the collected data for that time period.');

                defineInteractionRange();
            });
        };

        return directiveDefinitionObject;
    }]);
