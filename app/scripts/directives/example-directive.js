'use strict';

var eaaBoundaryMapModule = angular.module('d3-visualizations', []);

eaaBoundaryMapModule.directive('eaaAquifersBoundaryMap', function factory(injectables) {
  var directiveDefinitionObject = {
    priority: 0,
    template: '<div></div>', // or // function(tElement, tAttrs) { ... },  // or // templateUrl: 'directive.html', // or // function(tElement, tAttrs) { ... },
    transclude: false,
        // The opposite of isolate scope, transclude makes the contents of a directive with this option have access to 
        // the scope outside of the directive rather than inside. Used when wrapping arbitrary content inside a directive.
    restrict: 'E',    // Constrains directive to attr, elem, or class (A, E or C). Can be combined (A, E, C, AE, AC, EC, AEC).
    replace: false,
    scope: false,
    // scope: {     // Isolate scope data binding.
    //  varInfo: '=info',            
          // Links the Controller var $scope.varOne = { name: 'var1', quantity: 1 };
          // with the template html 'Name: {{varInfo.name}} Quantity: {{varInfo.quantity}}' 
          // via the View attrs <my-data info="varOne"></my-data>
          // varAttr: '='   // The same as '=varAttr' (if the attr and isoalte scope var are the same).
    //  directiveMethod: '&onMethod'
          // Allow someone using the directive to bind their own behavior to the method 
          // Define method in the Controller $scope.myMethod = function () { ... };
          // link it in the View html <my-dialog on-method="myMethod()">
          // then call it in the template html <a href class="close" ng-click="directiveMethod()">×</a>
    // },
    controller: 'myDirectiveController',      // Could also define the controller in-line. Use controller (or controllerAs) when you want to expose an API to other directives. Otherwise use link.
    // controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    controllerAs: 'stringAlias',
    // require: '^anotherController',     // The ^ indictaes look for the Controller on the parent element. Otherwise it will look for the controller on its own element.
    require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
      // or
      // return function postLink( ... ) { ... }
    },
    // or
    // link: {
    //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
    //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
    // }
    // or
    // link: function postLink( ... ) { ... }
  };
  return directiveDefinitionObject;
});