'use strict';

angular.module('aquiferiumApp')
  .directive('viewReset', function () { // $animate
    console.log('viewreset directive called.');
    // return function (scope, element, attrs) {
    //   scope.$watch(attrs.resetTop, function (newVal) {
    //     if (newVal) {
    //       $animate.addClass(element, 'resetTop');
    //     }
    //   });
    // };
  })
  // .animation('.resetTop', function () {
  //   return {
  //     addClass: function (element, className) {
  //       TweenMax.to(element, 1, {top: 0});
  //     }
  //   };
  // })
  .animation('some-animation', function () {
    console.log('SOME-ANIMATION CALLED.');
  });