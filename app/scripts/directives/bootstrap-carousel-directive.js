angular.module('aquiferiumApp')
    .directive('carousel', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                id: '@'
            },
            controller: function($scope, $element) {
                var items = $scope.items = [];
                $scope.selectedIndex = 0;

                $scope.select = function(index) {
                    /*if (index >= $scope.items.length || index < 0) {
                        return;
                    }*/

                    angular.forEach(items, function(item) {
                        item.selected = false;
                    });

                    $scope.items[index].selected = true;
                    $scope.selectedIndex = index;
                }

                this.addItem = function(item) {
                    items.push(item);

                    if (items.length == 1)
                        $scope.select(0);
                }
            },
            template: '<div class="carousel slide">' 
	            + '<ol class="carousel-indicators">' 
	            + '<li ng-repeat="item in items" data-target="#{{id}}" ' 
	            + 'data-slide-to="{{$index}}" ng-click="select($index)"' 
	            + 'ng-class="{active:item.selected}"></li>' 
	            + '</ol>' 
	            + '<div class="carousel-inner" ng-transclude>' 
	            + '</div>' 
	            + '<a class="carousel-control left" ' 
	            + 'href="#{{id}}" ng-click="select(selectedIndex-1)">&lsaquo;</a>' 
	            + '<a class="carousel-control right" ' 
	            + 'href="#{{id}}" ng-click="select(selectedIndex+1)" >&rsaquo;</a>' 
	            + '</div>',
            replace: true
        };
    })
    .directive('carouselItem', function() {
        return {
            require: '^carousel',
            restrict: 'E',
            transclude: true,
            scope: {},
            link: function(scope, element, attrs, carouselCtrl) {
                carouselCtrl.addItem(scope);
            },
            template: '<div class="item" ng-class="{active: selected}" ng-transclude>' + '</div>',
            replace: true
        };
    });
