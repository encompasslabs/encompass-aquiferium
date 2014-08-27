'use strict';

angular.module('aquiferiumApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'angular-carousel',
  'angular-parallax',
  'videosharing-embed',
  'eaa.directives.skrollr',
  'eaa.directives.d3.maps',
  'eaa.directives.d3.interactive.recharge',
  'eaa.directives.d3.interactive.wells',
  'eaa.directives.d3.interactive.springs'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl'
      })
      .when('/caves-karsts', {
        templateUrl: 'views/caves-karsts.html',
        controller: 'CavesKarstsCtrl'
      })
      .when('/conservation', {
        templateUrl: 'views/conservation.html',
        controller: 'ConservationCtrl'
      })
      .when('/springs', {
        templateUrl: 'views/springs.html',
        controller: 'SpringsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
