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

            var setDisplayData = function(targetIndex) {
                // console.log(targetIndex);
                var dataSet = ingestedData[targetIndex];
                var vals = Object.keys(dataSet).map(function(key) {
                    return dataSet[key];
                }); // console.log(key);
                // console.log(vals);
                var dataLabelArray = d3.select(el).select('.legend-box').selectAll('.legend-item-springs').selectAll('text');
                // console.log(dataLabelArray);

                // Need to populate each legend-item text value with the appropriate val index string (remember to skip 0 which is the Date value).
                for (var j = 0; j < dataLabelArray.length; j++) {

                    // console.log('------------------------');
                    // console.log(j); // 0-7.
                    // console.log(dataLabelArray[j]);
                    // console.log(dataLabelArray[j]['parentNode']['__data__']);
                    // console.log(dataLabelArray[j]['parentNode']['__data__']['name']);
                    // console.log(dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]);
                    // console.log(dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]['gindex']);
                    // console.log(' ');

                    var currentGaugeValue = dataLabelArray[j]['parentNode']['__data__']['values'][targetIndex]['gindex'];
                    // console.log('j: ' + j + ', value: ' + currentGaugeValue);

                    // setGaugeDisplay(currentGaugeValue, j, targetIndex, vals);

                    // var dataIndexOffset = j + 1;
                    // d3.select(dataLabelArray[j][1]).text( function() {
                    //   var thisValue = roundDecimals(vals[dataIndexOffset], 0);
                    //   if (isNaN(thisValue)) {
                    //     return 'No Data';
                    //   } else {
                    //     return thisValue.toString() + ' CFS';
                    //   }
                    // });

                    console.log('gaugeIndex: ' + j + ', currentGaugeValue: ' + currentGaugeValue + ', dataIndex: ' + targetIndex);
                    console.log(vals);

                    var targetItemPath = 'data-item-springs-' + j.toString();
                    var targetDataPath = 'data-value-springs-' + j.toString();

                    var thisTargetItem = d3.select(targetItemPath);
                    var thisTargetData = d3.select(targetDataPath);

                    thisTargetItem.text('item');

                    thisTargetData.text(function() {
                        if (isNaN(currentGaugeValue)) {
                            return 'No Data';
                        } else {
                            return roundDecimals(currentGaugeValue, 2).toString();
                        }
                    });
                }
            };

            var setGaugeDisplay = function(currentGaugeValue, gaugeIndex, dataIndex, vals) {
                // console.log('gaugeIndex: ' + gaugeIndex + ', currentGaugeValue: ' + currentGaugeValue + ', dataIndex: ' + dataIndex);
                // console.log(vals);

                // if (gaugeIndex === 0) {
                //     // do stuff.
                //   } else if (gaugeIndex === 1) {
                //     // do stuff.
                //   } else if (gaugeIndex === 2) {
                //     // do stuff.
                //   } else if (gaugeIndex === 3) {
                //     // do stuff.
                //   } else if (gaugeIndex === 4) {
                //     // do stuff.
                //   } else if (gaugeIndex === 5) {
                //     // do stuff.
                //   } else if (gaugeIndex === 6) {
                //     // do stuff.
                //   } else if (gaugeIndex === 7) {
                //     // do stuff.
                //   }

                // var targetItemPath = 'data-item-springs-' + gaugeIndex.toString();
                // var targetDataPath = 'data-value-springs-' + gaugeIndex.toString();

                // var thisTargetItem = d3.select(targetItemPath);
                // var thisTargetData = d3.select(targetDataPath);

                // thisTargetItem.text('item');

                // thisTargetData.text( function () {
                //    if (isNaN(currentGaugeValue)) {
                //       return 'No Data';
                //     } else {
                //       return roundDecimals(currentGaugeValue,2).toString();
                //     }          
                // });

                // var gaugeDataDisplay = d3.select('.map-marker-j17-wells');

                // var targetPathJ17 = newJ17Image[0][0];
                // var newJ17Stage = d3.select('.stage-j17-value');
                // var newj17Level = d3.select('.legend-j17-value');

                // if (isNaN(currentGaugeValue)) {
                //   newj17Level.text('No Data');
                // } else {
                //   newj17Level.text(roundDecimals(currentGaugeValue,2));
                // }

                // if (currentGaugeValue < 625) {
                //   // console.log('stage V');
                //   targetPathJ17.src = mapMarkerJ17_stage5Purple;
                //   newJ17Stage.style('background-color', '#6d2158');
                // } else if (currentGaugeValue >= 625 && currentGaugeValue < 630) {
                //   // console.log('stage IV');
                //   targetPathJ17.src = mapMarkerJ17_stage4Red;
                //   newJ17Stage.style('background-color', '#da1f28');
                // } else if (currentGaugeValue >= 630 && currentGaugeValue < 640) {
                //   // console.log('stageIII');
                //   targetPathJ17.src = mapMarkerJ17_stage3Orange;
                //   newJ17Stage.style('background-color', '#e08625');
                // } else if (currentGaugeValue >= 640 && currentGaugeValue < 650) {
                //   // console.log('stageII');
                //   targetPathJ17.src = mapMarkerJ17_stage2Yellow;
                //   newJ17Stage.style('background-color', '#e7b921');
                // } else if (currentGaugeValue >= 650) {
                //   // console.log('stage I');
                //   targetPathJ17.src = mapMarkerJ17_stage1Green;
                //   newJ17Stage.style('background-color', '#72a641');
                // }
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
                var legendItem = legend.selectAll('.svg').data(gauges).enter().append('svg').attr('class', 'legend-item-springs');

                var box = legendItem.append('rect')
                    // .attr('x', 0)
                    // .attr('y', function (d, i) { console.log(i * legendVertSpacingFactor);  return i * legendVertSpacingFactor; })
                    .attr('x', function (d, i) {
                      // console.log(d,i);
                      if (d.name === 'San Marcos Springs') {
                        return '0px';
                      } else if (d.name === 'Hueco Springs') {
                        return '0px';
                      } else if (d.name === 'San Antonio Springs') {
                        return '0px';
                      } else if (d.name === 'San Pedro Springs') {
                        return '0px';
                      }else if (d.name === 'Comal Springs') {
                        return '50%';
                      }  else if (d.name === 'Leona Springs') {
                        return '50%';
                      } else if (d.name === 'Las Moras Springs') {
                        // Out of bounds.
                      } else if (d.name === 'Barton Springs') {
                        // Out of bounds.
                      } 
                    })
                    .attr('y', function(d, i) {
                        // console.log(d,i);
                        if (d.name === 'San Marcos Springs') {
                            return 0; //'0px';
                        } else if (d.name === 'Hueco Springs') {
                            return 1; //'30px';
                        } else if (d.name === 'San Antonio Springs') {
                            return 2; //'60px';
                        } else if (d.name === 'San Pedro Springs') {
                            return 3; //'90px';
                        } else if (d.name === 'Comal Springs') {
                            return 4; //'0px';
                        } else if (d.name === 'Leona Springs') {
                            return 5; //'30px';
                        } else if (d.name === 'Las Moras Springs') {
                            return 6; // Out of bounds.
                        } else if (d.name === 'Barton Springs') {
                            return 7; // Out of bounds.
                        }
                    })
                    .attr('width', legendBoxDimensions)
                    .attr('height', legendBoxDimensions)
                    .attr('class', 'legend-box')
                    .style('fill', function(d) {
                        return color(d.name);
                    });

                var label = legendItem.append('text')
                    // .attr('x', '10%')
                    // .attr('y', function (d, i) { console.log((i * legendVertSpacingFactor) + legendVertOffset); return (i * legendVertSpacingFactor) + legendVertOffset; })
                    .attr('x', function (d, i) {
                      // console.log(d,i);
                      if (d.name === 'San Marcos Springs') {
                        return '0px';
                      } else if (d.name === 'Hueco Springs') {
                        return '0px';
                      } else if (d.name === 'San Antonio Springs') {
                        return '0px';
                      } else if (d.name === 'San Pedro Springs') {
                        return '0px';
                      }else if (d.name === 'Comal Springs') {
                        return '50%';
                      }  else if (d.name === 'Leona Springs') {
                        return '50%';
                      } else if (d.name === 'Las Moras Springs') {
                        // Out of bounds.
                      } else if (d.name === 'Barton Springs') {
                        // Out of bounds.
                      } 
                    })
                    .attr('y', function(d, i) {
                        // console.log(d,i);
                        if (d.name === 'San Marcos Springs') {
                            return 15.5; //'0px';
                        } else if (d.name === 'Hueco Springs') {
                            return 16.5; //'30px';
                        } else if (d.name === 'San Antonio Springs') {
                            return 17.5; //'60px';
                        } else if (d.name === 'San Pedro Springs') {
                            return 18.5; //'90px';
                        } else if (d.name === 'Comal Springs') {
                            return 19.5; //'0px';
                        } else if (d.name === 'Leona Springs') {
                            return 20.5; //'30px';
                        } else if (d.name === 'Las Moras Springs') {
                            return 21.5; // Out of bounds.
                        } else if (d.name === 'Barton Springs') {
                            return 22.5; // Out of bounds.
                        }
                    })
                    .text(function(d) {
                        return d.name;
                    })
                    .attr('class', function(d, i) {
                        return 'data-item-springs-' + i.toString();
                    });

                var dataValueText = legendItem.append('text')
                    // .attr('x', '65%')
                    // .attr('y', function (d, i) { console.log((i * legendVertSpacingFactor) + legendVertOffset); return (i * legendVertSpacingFactor) + legendVertOffset; })
                    .attr('x', function (d, i) {
                      // console.log(d,i);
                      if (d.name === 'San Marcos Springs') {
                        return '0px';
                      } else if (d.name === 'Hueco Springs') {
                        return '0px';
                      } else if (d.name === 'San Antonio Springs') {
                        return '0px';
                      } else if (d.name === 'San Pedro Springs') {
                        return '0px';
                      }else if (d.name === 'Comal Springs') {
                        return '50%';
                      }  else if (d.name === 'Leona Springs') {
                        return '50%';
                      } else if (d.name === 'Las Moras Springs') {
                        // Out of bounds.
                      } else if (d.name === 'Barton Springs') {
                        // Out of bounds.
                      } 
                    })
                    .attr('y', function(d, i) {
                        // console.log(d,i);
                        if (d.name === 'San Marcos Springs') {
                            return 15.5; //'0px';
                        } else if (d.name === 'Hueco Springs') {
                            return 16.5; //'30px';
                        } else if (d.name === 'San Antonio Springs') {
                            return 17.5; //'60px';
                        } else if (d.name === 'San Pedro Springs') {
                            return 18.5; //'90px';
                        } else if (d.name === 'Comal Springs') {
                            return 19.5; //'0px';
                        } else if (d.name === 'Leona Springs') {
                            return 20.5; //'30px';
                        } else if (d.name === 'Las Moras Springs') {
                            return 21.5; // Out of bounds.
                        } else if (d.name === 'Barton Springs') {
                            return 22.5; // Out of bounds.
                        }
                    })
                    .text('')
                    .attr('class', function(d, i) {
                        return 'data-value-springs-' + i.toString();
                    });

                // NOTE.
                var notes = viz.append('div').attr('class', 'graph-notes')
                    .append('text')
                    .text('Note: Any gaps in the data lines represent gaps in the collected data for that time period.');

                defineInteractionRange();
            });
        };

        return directiveDefinitionObject;
    }]);
