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

    $scope.resetView = function () {
      $location.hash('.geography');
      $anchorScroll();
    };

    $scope.togglePanel = function(target) {
      $(target).toggleClass('open-panel');
    };

    $scope.toggleSlide = function(target) {
      $(target).toggleClass('open');
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





    $scope.closePanels = function () {
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

    // $scope.closePanels = function (target) {
    //   switch (target) {
    //     case '#data-panel-recharge':
    //       $scope.togglePanel(target);
    //       $scope.rechargePanelVisible = false;
    //       break;
    //     case '#data-panel-wells':
    //       $scope.togglePanel(target);
    //       $scope.wellsPanelVisible = false;
    //       break;
    //     case '#data-panel-springs':
    //       $scope.togglePanel(target);
    //       $scope.springsPanelVisible = false;
    //       break;
    //   }
    // };

    $scope.displayRechargePanel = function() {
      console.log('$scope.displayRechargePanel() called.');
      $scope.closePanels();
      if ($scope.rechargePanelVisible) {
        // $scope.selectSlide('close');
        // $scope.togglePanel('#data-panel-recharge');
        // $scope.rechargePanelVisible = false;
        // $scope.closePanels();
        // $scope.closePanels('#data-panel-recharge');
      } else {
        $scope.togglePanel('#data-panel-recharge');
        $scope.rechargePanelVisible = true;
      }
    };

    $scope.displayWellsPanel = function() {
      console.log('$scope.displayWellsPanel() called.');
      $scope.closePanels();
      if ($scope.wellsPanelVisible) {
        // $scope.selectSlide('close');
        // $scope.togglePanel('#data-panel-wells');
        // $scope.wellsPanelVisible = false;
        // $scope.closePanels();
        // $scope.closePanels('#data-panel-wells');
      } else {
        $scope.togglePanel('#data-panel-wells');
        $scope.wellsPanelVisible = true;
      }
    };

    $scope.displaySpringsPanel = function() {
      console.log('$scope.displaySpringsPanel() called.');
      $scope.closePanels();
      if ($scope.springsPanelVisible) {
        // $scope.selectSlide('close');
        // $scope.togglePanel('#data-panel-springs');
        // $scope.springsPanelVisible = false;
        // $scope.closePanels();
        // $scope.closePanels('#data-panel-springs');
      } else {
        $scope.togglePanel('#data-panel-springs');
        $scope.springsPanelVisible = true;
      }
    };

    // $scope.resetView();
    // $scope.animateTo(10000, 15000, linear);
    // console.log($skrollr.data.curTop);
  }]);