(function() {
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
            'leaflet-directive',
            'eaa.directives.skrollr',
            'eaa.directives.d3.interactive.recharge',
            'eaa.directives.d3.interactive.wells',
            'eaa.directives.d3.interactive.springs',
            'eaa.directives.maps.leaflet',
            'eaa.directives.utils.modal'
        ])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/geography.html',
                    controller: 'GeographyCtrl'
                })
                .when('/geography', {
                    templateUrl: 'views/geography.html',
                    controller: 'GeographyCtrl'
                })
                .when('/geology', {
                    templateUrl: 'views/geology.html',
                    controller: 'GeologyCtrl'
                })
                .when('/conservation', {
                    templateUrl: 'views/conservation.html',
                    controller: 'ConservationCtrl'
                })
                .when('/springs', {
                    templateUrl: 'views/springs.html',
                    controller: 'SpringsCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
