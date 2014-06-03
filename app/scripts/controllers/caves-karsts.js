'use strict';

angular.module('aquiferiumApp')
  .controller('CavesKarstsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass = 'caves-karsts';

    // START PARALLAX CODE //
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
        console.log('slide: ' + dataslide);
            htmlbody.animate({
                scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
            }, 2000, 'easeInOutQuint');
        /*
        if(dataslide == 7) {
            console.log('slide 7');
            htmlbody.animate({
                scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top - 300
            }, 2000, 'easeInOutQuint');
        } else if(dataslide == 0) {
            console.log('slide 0');
            htmlbody.animate({
                scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top - 50
            }, 2000, 'easeInOutQuint');
        } else {
            console.log('slide 1-6');
            htmlbody.animate({
                scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
            }, 2000, 'easeInOutQuint');
        } */       
    }

    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function(e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });    
    // END PARALLAX CODE //

    // Create scrollabel content with no visible scrollbar.
    // Scrollbar Size
    jQuery.getScrollBarSize = function() {
       var inner = $('<p></p>').css({
          'width':'100%',
          'height':'100%'
       });
       var outer = $('<div></div>').css({
          'position':'absolute',
          'width':'100px',
          'height':'50px',
          'top':'0',
          'left':'0',
          'visibility':'hidden',
          'overflow':'hidden'
       }).append(inner);

       $(document.body).append(outer);

       var w1 = inner.width(), h1 = inner.height();
       outer.css('overflow','scroll');
       var w2 = inner.width(), h2 = inner.height();
       if (w1 == w2 && outer[0].clientWidth) {
          w2 = outer[0].clientWidth;
       }
       if (h1 == h2 && outer[0].clientHeight) {
          h2 = outer[0].clientHeight;
       }

       outer.detach();

       var scrollerWidth = (w1 - w2);
       var scrollerHeight = (h1 - h2)
       var results = [];
       results.push(w1,w2,h1,h2,scrollerWidth,scrollerHeight);
       return results;
    };

    // alert( $.getScrollBarSize() ); // in Chrome = [15,15] in FF = [16,16]

    var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var innerWidth = (screenWidth - $.getScrollBarSize()[4]);
    var outerStyle = {'overflow':'hidden','width':screenWidth};
    var innerStyle = {'overflow':'scroll','width':innerWidth};

    var outerwrapper = document.querySelector("#parallaxwrapper");
    // outerwrapper.style.outerStyle;
    var innerwrapper = document.querySelector("#parallaxcontent");
    // innerwrapper.style.innerStyle;
  });
