'use strict';

angular.module('aquiferiumApp')
  .controller('CavesKarstsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass = 'caves-karsts';

    /* START PARALLAX CODE */
    //initialise Stellar.js
    $(window).stellar();

    //Cache some variables
    var links = $('.navigation').find('li');
    var slide = $('.slide');
    var button = $('.button-scroll');
    var mywindow = $(window);
    // var mywindow = $scope.$window;
    var htmlbody = $('html,body');
    var dataslide = {};

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. 
    // The Jquery easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top - 50
        }, 2000, 'easeInOutQuint');
    }

    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function(e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });    
    /* END PARALLAX CODE */
    
  });
