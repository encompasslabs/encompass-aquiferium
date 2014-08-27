'use strict';

angular.module('eaa.directives.skrollr', [])
  .directive('skrollr', function() {
    var directiveDefinitionObject = {
      link: function() {
        // skrollr.init();
        s = skrollr.init(
          {
            render: function(data) {
              // document.getElementById('scroll-status').innerHTML = 'scrollPos: ' + data.curTop;
              if (document.getElementById('scroll-status')) {
                console.log('skrollr position element found. populating.');
                document.getElementById('scroll-status').innerHTML = 'scrollPos: ' + data.curTop;
                return;
              } else {
                console.log('skrollr position element not found.');
              }
              
              console.log('scrollPos: ' + data.curTop);
            }
          }
        );
        
        // Init Skrollr Menu.
        skrollr.menu.init(s, {
          smoothScrolling: true,
          smoothScrollingDuration: 250,
          constants: {},
          scale: scrollScale,
          forceHeight: true,
          // mobileCheck: function() { // will overwrite default function. },
          mobileDeceleration: 0.004,
          edgeStrategy: 'ease', // set*, ease, reset.
          // beforerender: {},
          // render: {},
          // keyframe: function(element, name, direction) { // name will be one of data500, dataTopBottom, data_offsetCenter },
          easing: 'linear', // 'swing*', 'outCubic', 'quadratic', 'linear', 'cubic', 'sqrt', 'bounce'.        
          duration: function(currentTop, targetTop) { return Math.abs(currentTop - targetTop) * scrollRateModifier; }, // return 500;
          //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
          handleLink: function(link) {
            console.log(link.getAttribute( "data-menu-top" ));
            return link.getAttribute( "data-menu-top" );
          }
        });
      }
    };

    return directiveDefinitionObject;
  });