'use strict';

angular.module('aquiferiumApp')
  .controller('SpringsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass = 'springs';

    $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
    $scope.igor = { name: 'Igor', address: '123 Somewhere' };
    $scope.vojta = { name: 'Vojta', address: '3456 Somewhere Else' };
    $scope.timeformat = 'M/d/yy h:mm:ss a';
    
  });
