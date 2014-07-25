'use strict';

angular.module('aquiferiumApp')
  .controller('LearnCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass= 'learn';
  });
