'use strict';

angular.module('aquiferiumApp')
    .controller('MainCtrl', function($scope) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.pageClass = 'main';

        // $scope.myInterval = 1000;

	    /*$scope.slides = [
	    	{ image: '/images/maps/For-Doty1_940x714.png', label: 'Some stuff' },
	    	{ image: '/images/maps/Major%20Aquifers%20in%20Texas.jpg', label: 'Some other stuff' },
	    	{ image: '/images/maps/For-Doty1_940x714.png', label: 'Even moar stuff' },
	    	{ image: '/images/maps/Major%20Aquifers%20in%20Texas.jpg', label: 'Waaaay moar other stuff' }
	    ];*/
	    
	   /* $scope.addSlide = function() {
	        var newWidth = 1000 + slides.length;
	        slides.push({
	            image: 'http://placekitten.com/' + newWidth + '/600',
	            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	        });
	    };
	    for (var i = 0; i < 4; i++) {
	        $scope.addSlide();
	    }*/

	    // $("#carousel").carousel();
    });
