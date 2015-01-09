'use strict';

angular.module('aquiferiumApp')
  .controller('GeographyCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.pageClass = 'geography';

    $scope.rechargePanelVisible = false;
    $scope.wellsPanelVisible = false;
    $scope.springsPanelVisible = false;

    $scope.initialPosition = [49, -97];
    $scope.panOptionsInteractive = {
      'animate': true,
      'duration': 3,
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
      $scope.closeAllPanels();
    };

    $scope.displayRechargePanel = function () {
      $scope.closeAllPanels();
      if (!$scope.rechargePanelVisible) {
        $scope.togglePanel('#data-panel-recharge');
        $scope.rechargePanelVisible = true;
      }
    };

    $scope.displayWellsPanel = function () {
      $scope.closeAllPanels();
      if (!$scope.wellsPanelVisible) {
        $scope.togglePanel('#data-panel-wells');
        $scope.wellsPanelVisible = true;
      }
    };

    $scope.displaySpringsPanel = function () {
      $scope.closeAllPanels();
      if (!$scope.springsPanelVisible) {
        $scope.togglePanel('#data-panel-springs');
        $scope.springsPanelVisible = true;
      }
    };

  }]);