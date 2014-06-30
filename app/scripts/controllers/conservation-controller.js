'use strict';

angular.module('aquiferiumApp')
  .controller('ConservationCtrl', function ($scope, $location, $anchorScroll) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pageClass = 'conservation';

    $scope.resetView = function () {
      $location.hash('.conservation');
      $anchorScroll();
    };

    $scope.resetView();

    $scope.goToByScroll = function (slidenumber) {
      // console.log('slide: ' + slidenumber);
      var navbarHeight = $('#navbar').innerHeight();
      var htmlBody = angular.element(document).find('body').css('class', '.conservation');
      htmlBody.animate({
        scrollTop: $('.slide[data-slide="' + slidenumber + '"]').offset().top - navbarHeight
      }, 2000, 'easeInOutQuint');
    };

    $scope.buttonClick = function (e) {
      // console.log('firing click event from controller $scope with e == ' + e.valueOf());
      e.preventDefault();
      var dataslide = angular.element(e.target).attr("data-slide");
      // console.log(dataslide);
      $scope.goToByScroll(dataslide);
    };

    $scope.randomColor = function () {
      var newColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
      return newColor;
    };

    $scope.lastClickTarget = {};
    $scope.newSelection = {};
    $scope.oldSelection = {};

    $scope.moveToFront = function (target) {
      console.log('moveToFront: ', target);
      return target.each(function () {
        target.parentNode.appendChild(target);
      });
    };

    $scope.moveToBack = function (target) {
      console.log('moveToBack: ', target);
      return target.each(function () {
        var firstChild = target.parentNode.firstChild;
        if (firstChild) {
          target.parentNode.insertBefore(target, firstChild);
        }
      });
    };

    $scope.onTargetClick = function (target) {
      console.log(target);
      newSelection = d3.select(this);
      console.log(newSelection);
      if (tooltip.style('visibility') === 'hidden') {
        // console.log('tooltip is now visible.');
        moveToFront(newSelection);
        newSelection.transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
        // newSelection.moveToFront().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
        lastClickTarget = target;
        oldSelection = newSelection;
        return tooltip.style('visibility', 'visible').html('<h2>' + target.Location + '</h2><br/>' + '<img src="' + target.img + '" alt="" /><br/>' + '<a href="../">Explore</a>');
      } else if (tooltip.style('visibility') === 'visible' && target !== lastClickTarget) {
        // console.log('you clicked another object.');
        // oldSelection.moveToBack().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
        moveToBack(oldSelection);
        oldSelection.transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
        // newSelection.moveToFront().transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
        moveToFront(newSelection);
        newSelection.transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadiusSelected).style('stroke-width', '3px').style('stroke', '#ff0');
        lastClickTarget = target;
        oldSelection = newSelection;
        return tooltip.style('visibility', 'visible').html('<h2>' + target.Location + '</h2><br/>' + '<img src="' + target.img + '" alt="" /><br/>' + '<a href="../">Explore</a>');
      }
      // console.log('tooltip is now hidden.');
      newSelection.transition().duration(markerStrokeAnimationSpeed).attr('r', markerRadius).style('stroke-width', '1px').style('stroke', '#000');
      lastClickTarget = {};
      oldSelection = {};
      newSelection = {};
      return tooltip.style('visibility', 'hidden');
    };
    
  });
