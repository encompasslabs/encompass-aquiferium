'use strict';

angular.module('aquiferiumApp')
  .controller('GeographyCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'geography';

    $scope.resetView = function () {
      $location.hash('.geography');
      $anchorScroll();
    };

    // $scope.resetView();

    // $scope.animateTo(10000, 15000, linear);
    // console.log($skrollr.data.curTop);

    $scope.dataPanelVisible = false;
    $scope.rechargeVisible = false;
    $scope.wellsVisible = false;
    $scope.springsVisible = false;

    $scope.togglePanel = function(target) {
      $(target).toggleClass('open-panel');
    };

    $scope.toggleSlide = function(target) {
      $(target).toggleClass('open');
    };

    $scope.displayPanel = function() {
      console.log('toggling panel');
      if ($scope.dataPanelVisible) {
        console.log('panel was open');
        $scope.selectSlide('close');
        $scope.togglePanel('#data-panel');
        $scope.dataPanelVisible = false;
        document.getElementById('toggle-data-panel').innerHTML = 'Show Data';
      } else {
        console.log('panel was closed');
        $scope.togglePanel('#data-panel');
        $scope.dataPanelVisible = true;
        document.getElementById('toggle-data-panel').innerHTML = 'Hide Data';
      }
    };

    $scope.selectSlide = function(target) {
      if (target === 'recharge') {
        console.log('recharge');
        if($scope.wellsVisible) {
          $scope.toggleSlide('#wells-backdrop');
          $scope.wellsVisible = false;
        }
        if($scope.springsVisible) {
          $scope.toggleSlide('#springs-backdrop');
          $scope.springsVisible = false;
        }        
        if($scope.rechargeVisible) {
          $scope.toggleSlide('#recharge-backdrop');
          $scope.rechargeVisible = false;
        } else {
          $scope.toggleSlide('#recharge-backdrop');
          $scope.rechargeVisible = true;
        }
      } else if (target === 'wells') {
        console.log('wells');
        if($scope.rechargeVisible) {
          $scope.toggleSlide('#recharge-backdrop');
          $scope.rechargeVisible = false;
        }
        if($scope.springsVisible) {
          $scope.toggleSlide('#springs-backdrop');
          $scope.springsVisible = false;
        }        
        if($scope.wellsVisible) {
          $scope.toggleSlide('#wells-backdrop');
          $scope.wellsVisible = false;
        } else {
          $scope.toggleSlide('#wells-backdrop');
          $scope.wellsVisible = true;
        }
      } else if (target === 'springs') {
        console.log('springs');
        if($scope.rechargeVisible) {
          $scope.toggleSlide('#recharge-backdrop');
          $scope.rechargeVisible = false;
        }
        if($scope.wellsVisible) {
          $scope.toggleSlide('#wells-backdrop');
          $scope.wellsVisible = false;
        }        
        if($scope.springsVisible) {
          $scope.toggleSlide('#springs-backdrop');
          $scope.springsVisible = false;
        } else {
          $scope.toggleSlide('#springs-backdrop');
          $scope.springsVisible = true;
        }
      } else if (target === 'close') {
        console.log('close');
        if($scope.rechargeVisible) {
          $scope.toggleSlide('#recharge-backdrop');
          $scope.rechargeVisible = false;
        }
        if($scope.wellsVisible) {
          $scope.toggleSlide('#wells-backdrop');
          $scope.wellsVisible = false;
        }        
        if($scope.springsVisible) {
          $scope.toggleSlide('#springs-backdrop');
          $scope.springsVisible = false;
        }
      }
      // console.log(dataPanelVisible, rechargeVisible, wellsVisible, springsVisible);
    };

    $('#toggle-data-panel').on('click', function(){
      $scope.displayPanel();
    });

    $('#toggle-recharge-data').on('click', function(){
      $scope.selectSlide('recharge');
    });

    $('#toggle-wells-data').on('click', function(){
      $scope.selectSlide('wells');
    });

    $('#toggle-springs-data').on('click', function(){
      $scope.selectSlide('springs');
    });
  }]);