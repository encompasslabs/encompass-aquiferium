angular.module('aquiferiumApp')
	.directive('testDirective', function() {
		return {
			restrict: 'E',
			template: '<p>test-directive</p><p>No, really, I put this here with the directive.</p>'
		}
	});