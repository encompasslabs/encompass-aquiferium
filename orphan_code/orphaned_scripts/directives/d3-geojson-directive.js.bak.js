angular.module('aquiferiumApp')
	.directive('d3Geojson', function() {
		// Directive properties.
		var canvasWidth = 800,
	    canvasHeight = 600;
	    
	    //var dataSource = $scope.geojsonData;

		var directiveDefinitionObject = {
		    //We restrict its use to an element
		    restrict: 'E',
		    //we don't want to overwrite our directive declaration in the HTML mark-up
		    replace: false,
		    //our data source would be an array
		    //passed thru chart-data attribute
		    scope: {
		        // data: '=chartData'
		        data: '=geoData'
		    },
		    link: function(scope, element, attrs) {

		    	// Optmized ESRI GIS Data from EAA.
		    	var dataSource00 = './data/geojson/USA.geo.json';
		    	var dataSource01 = './data/geojson/TX.geo.json';
		    	var dataSource02 = './data/geojson/NEW_major_aquifers_dd_reduced100.geo.json';
		    	var dataSource03 = './data/geojson/AquiferZonesNew.geo.json';
		    	var dataSource04 = './data/geojson/eaa_boundary.geo.json';
		    	var dataSource05 = './data/geojson/713-H_HatchedArea.geo.json';
		    	var dataSource06 = './data/geojson/DirectorDistricts2014-optimized-EPSG4326.geo.json';

		    	// Setup Colors.
	            var color_frenchPass = 'rgba(186, 235, 255, 0.7)';
	            var color_vikingBlue = 'rgba(128, 191, 222, 0.7)';	            
	            var colorPrimary_eaaBlue = 'rgba(66,89,104,0.7)';
	            var colorPrimary_eaaGold = 'rgba(143,129,0,0.7)';
	            var colorPrimary_eaaOrange = 'rgba(171,101,13)';
	            var colorSupport_eaaTan = 'rgba(230,211,149,0.7)';
	            var colorSupport_eaaStone = 'rgba(142,140,122,0.7)';
	            var colorSupport_eaaLake = 'rgba(113,178,201,0.7)';
	            var colorAccent_eaaSky = 'rgba(66,152,181,0.7)';
	            var colorAccent_eaaAmber = 'rgba(198,147,10,0.7)';
	            var colorAccent_eaaOrange = 'rgba(201,91,5,0.7)';
	            var colorAccent_eaaBrown = 'rgba(109,79,71,0.7)';
	            var colorAccent_eaaMelon  = 'rgba(170,221,109,0.7)';
	            var colorAccent_eaaTeal = 'rgba(0,178,140,0.7)';

		    	// set up initial svg object
		        var canvas = d3.select('d3-geojson').append('svg').attr('width', canvasWidth).attr('height', canvasHeight);

		        // assign data source.
		        var dataSource = dataSource06;

		        //load the geojson data.
		        d3.json(dataSource, function(data) {

		        	// Assign colors.
		        	var fillColorA = colorAccent_eaaSky;
		        	var fillColorB = colorSupport_eaaLake;

		        	// center map solution by Jan van der Laan.
		            // create a first guess for the projection
		            var center = d3.geo.centroid(data)
		            var scale = 150;
		            var offset = [canvasWidth / 2, canvasHeight / 2];
		            var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);

		            // create the path
		            var path = d3.geo.path().projection(projection);

		            // using the path determine the bounds of the current map and use 
		            // these to determine better values for the scale and translation
		            var bounds = path.bounds(data);
		            var hscale = scale * canvasWidth / (bounds[1][0] - bounds[0][0]);
		            var vscale = scale * canvasHeight / (bounds[1][1] - bounds[0][1]);
		            var scale = (hscale < vscale) ? hscale : vscale;
		            var offset = [canvasWidth - (bounds[0][0] + bounds[1][0]) / 2, canvasHeight - (bounds[0][1] + bounds[1][1]) / 2];

		            // new projection
		            projection = d3.geo.mercator().center(center).scale(scale).translate(offset);
		            path = path.projection(projection);

		            // Draw updated map.
		            var group = canvas.selectAll('g').data(data.features).enter().append('g');
		            var areas = group.append('path').attr('d', path).attr('class', 'area') //.attr('fill', fillColorRGBA);
			            .attr('fill', function(d, i) {
			                return i % 2 ? fillColorA : fillColorB;
			            });
		        });
		    }
		};
		return directiveDefinitionObject;
	});