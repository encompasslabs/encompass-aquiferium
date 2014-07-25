angular.module('embedVideo',[])
	// Directive names will be denormalized as follows:
	// 1) strip off preceding 'x-', 'data-', or 'ng-'.
	// 2) convert '-', '_', or ':'' into camelCase.
	// 3) map to directive, ex. <test-directive> becomes testDirective.
	// Attributes should be prefixed with 'ng-attr-' to avoid DOM restrictions. 
	// You can then bind to these attributes., ex. ng-attr-cx="{{cx}}".
	.directive('embedYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
      console.log('here');
      scope.$watch('code', function (newVal) {
        if (newVal) {
          scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
        }
      });
    }
  };
});