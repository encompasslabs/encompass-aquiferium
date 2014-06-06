/*angular.module('timeDirective', [])
    .controller('Controller', ['$scope',
        function($scope) {
            $scope.format = 'M/d/yy h:mm:ss a';
        }
    ])*/
angular.module('aquiferiumApp')
    .directive('tellTime', ['$interval', 'dateFilter',
        function($interval, dateFilter) {

            function link(scope, element, attrs) {
                var format; // = $scope.timeformat;
                var timeoutId;

                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                    // console.log(element);
                }

                scope.$watch(attrs.myCurrentTime, function(value) {
                    format = value;
                    updateTime();
                });

                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function() {
                    updateTime(); // update DOM
                }, 1000);
            };

            return {
				restrict: 'E',
				// replace: false,
			    link: link
			    // templateUrl: '../views/partials/tell-time-partial.html'
			};
		}	
	]);
