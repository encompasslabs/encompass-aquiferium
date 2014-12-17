'use strict';

angular.module('aquiferiumApp')
  .controller('GeographyCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'geography';

    // $scope.dataPanelVisible = false;
    // $scope.rechargeVisible = false;
    // $scope.wellsVisible = false;
    // $scope.springsVisible = false;

    $scope.rechargePanelVisible = false;
    $scope.wellsPanelVisible = false;
    $scope.springsPanelVisible = false;

    $scope.initialPosition = [49, -97];
    $scope.panOptionsInteractive = {
      'animate': true,
      'duration': 2,
      'easeLinearity': 0.25,
      'noMoveStart': 'false'
    };

    $scope.resetView = function () {
      $location.hash('.geography');
      $anchorScroll();
    };

    $scope.togglePanel = function (target) {
      $(target).toggleClass('open-panel');
    };

    $scope.toggleSlide = function (target) {
      $(target).toggleClass('open');
    };

    $scope.closeAllPanels = function () {
      if ($scope.rechargePanelVisible) {
        $scope.togglePanel('#data-panel-recharge');
        $scope.rechargePanelVisible = false;
      }
      if ($scope.wellsPanelVisible) {
        $scope.togglePanel('#data-panel-wells');
        $scope.wellsPanelVisible = false;
      }
      if ($scope.springsPanelVisible) {
        $scope.togglePanel('#data-panel-springs');
        $scope.springsPanelVisible = false;
      }
    };

    $scope.closePanel = function (event) {
      // console.log('you wanna close this?');
      // console.log(this);
      // console.log(event);
      // console.log(event.target);
      // console.log(event.target.parentElement);
      // console.log(event.target.parentElement.parentElement);
      // console.log(event.target.parentElement.parentElement.parentElement);
      // console.log(event.target.parentElement.parentElement.parentElement.parentElement);
      // console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement);

      console.log(event.target.parentElement.parentElement.parentElement.parentElement.getElementById('map'));

      // angular.element(map).panTo($scope.initialPosition, $scope.panOptionsInteractive);
    };

    $scope.displayRechargePanel = function () {
      console.log('$scope.displayRechargePanel() called.');
      $scope.closeAllPanels();
      if (!$scope.rechargePanelVisible) {
        $scope.togglePanel('#data-panel-recharge');
        $scope.rechargePanelVisible = true;
      }
    };

    $scope.displayWellsPanel = function () {
      console.log('$scope.displayWellsPanel() called.');
      $scope.closeAllPanels();
      if (!$scope.wellsPanelVisible) {
        $scope.togglePanel('#data-panel-wells');
        $scope.wellsPanelVisible = true;
      }
    };

    $scope.displaySpringsPanel = function () {
      console.log('$scope.displaySpringsPanel() called.');
      $scope.closeAllPanels();
      if (!$scope.springsPanelVisible) {
        $scope.togglePanel('#data-panel-springs');
        $scope.springsPanelVisible = true;
      }
    };





    // $scope.displayPanel = function() {
    //   if ($scope.dataPanelVisible) {
    //     $scope.selectSlide('close');
    //     $scope.togglePanel('#data-panel');
    //     $scope.dataPanelVisible = false;
    //     document.getElementById('toggle-data-panel').innerHTML = 'Show Data';
    //   } else {
    //     $scope.togglePanel('#data-panel');
    //     $scope.dataPanelVisible = true;
    //     document.getElementById('toggle-data-panel').innerHTML = 'Hide Data';
    //   }
    // };

    // $scope.selectSlide = function(target) {
    //   if (target === 'recharge') {
    //     // console.log('recharge');
    //     if($scope.wellsVisible) {
    //       $scope.toggleSlide('#wells-backdrop');
    //       $scope.wellsVisible = false;
    //     }
    //     if($scope.springsVisible) {
    //       $scope.toggleSlide('#springs-backdrop');
    //       $scope.springsVisible = false;
    //     }        
    //     if($scope.rechargeVisible) {
    //       $scope.toggleSlide('#recharge-backdrop');
    //       $scope.rechargeVisible = false;
    //     } else {
    //       $scope.toggleSlide('#recharge-backdrop');
    //       $scope.rechargeVisible = true;
    //     }
    //   } else if (target === 'wells') {
    //     // console.log('wells');
    //     if($scope.rechargeVisible) {
    //       $scope.toggleSlide('#recharge-backdrop');
    //       $scope.rechargeVisible = false;
    //     }
    //     if($scope.springsVisible) {
    //       $scope.toggleSlide('#springs-backdrop');
    //       $scope.springsVisible = false;
    //     }        
    //     if($scope.wellsVisible) {
    //       $scope.toggleSlide('#wells-backdrop');
    //       $scope.wellsVisible = false;
    //     } else {
    //       $scope.toggleSlide('#wells-backdrop');
    //       $scope.wellsVisible = true;
    //     }
    //   } else if (target === 'springs') {
    //     // console.log('springs');
    //     if($scope.rechargeVisible) {
    //       $scope.toggleSlide('#recharge-backdrop');
    //       $scope.rechargeVisible = false;
    //     }
    //     if($scope.wellsVisible) {
    //       $scope.toggleSlide('#wells-backdrop');
    //       $scope.wellsVisible = false;
    //     }        
    //     if($scope.springsVisible) {
    //       $scope.toggleSlide('#springs-backdrop');
    //       $scope.springsVisible = false;
    //     } else {
    //       $scope.toggleSlide('#springs-backdrop');
    //       $scope.springsVisible = true;
    //     }
    //   } else if (target === 'close') {
    //     // console.log('close');
    //     if($scope.rechargeVisible) {
    //       $scope.toggleSlide('#recharge-backdrop');
    //       $scope.rechargeVisible = false;
    //     }
    //     if($scope.wellsVisible) {
    //       $scope.toggleSlide('#wells-backdrop');
    //       $scope.wellsVisible = false;
    //     }        
    //     if($scope.springsVisible) {
    //       $scope.toggleSlide('#springs-backdrop');
    //       $scope.springsVisible = false;
    //     }
    //   }
    // };

    // $('#toggle-data-panel').on('click', function(){
    //   $scope.displayPanel();
    // });

    // $('#toggle-recharge-data').on('click', function(){
    //   $scope.selectSlide('recharge');
    // });

    // $('#toggle-wells-data').on('click', function(){
    //   $scope.selectSlide('wells');
    // });

    // $('#toggle-springs-data').on('click', function(){
    //   $scope.selectSlide('springs');
    // });

    // $scope.resetView();
    // $scope.animateTo(10000, 15000, linear);
    // console.log($skrollr.data.curTop);
  }]);