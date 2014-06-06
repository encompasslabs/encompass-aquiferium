angular.module('aquiferiumApp')
	// Directive names will be denormalized as follows:
	// 1) strip off preceding 'x-', 'data-', or 'ng-'.
	// 2) convert '-', '_', or ':'' into camelCase.
	// 3) map to directive, ex. <test-directive> becomes testDirective.
	// Attributes should be prefixed with 'ng-attr-' to avoid DOM restrictions. 
	// You can then bind to these attributes., ex. ng-attr-cx="{{cx}}".
	.directive('testDirectiveA', function() {
		return {
			// We restrict its use to an A - attribute (default), C - class, E - element.
			// Restrictions can be combined. Ex. 'AC', AE', 'CE', or 'ACE'.
			// Use E when creating a component that is in control of the template.
			// The common case for this is when you are creating a Domain-Specific Language for parts of your template.
			// Use A when you are decorating an existing element with new functionality. 
			restrict: 'E',
			// We don't want to overwrite our directive declaration in the HTML mark-up.
			replace: false,
			// Allow directive resue by creating an isolate scope in the directive using the 'scope' option.
			// This will separate the scope inside a directive from the scope outside.
			// Then map the outer scope to a directive's inner scope.
			// The isolate scope of the directive isolates everything except models that you've explicitly added to the scope: {} hash object. 
			// This is helpful when building reusable components because it prevents a component from changing your model state 
			// except for the models that you explicitly pass in.
			// Normally, a scope prototypically inherits from its parent. An isolated scope does not.
		    scope: {
		    	// customerInfo: '=info'
		        // Note: If the attribute name is the same as the value you want to bind to inside the directive's scope,
		        // you can use this shorthand syntax:
		    	info: '='
		    },
		    templateUrl: '../views/partials/my-customer-iso.html'
		}
	});