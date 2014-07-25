'use strict';

angular.module('aquiferiumApp')
  .controller('DiscoverCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass= 'discover';
  });
