angular.module('aquiferiumApp')
    .directive('d3DirectiveTest', ['d3Service',
        function(d3Service) {
            return {
                link: function(scope, element, attrs) {
                    d3Service.d3().then(function(d3) {
                        // d3 is the raw d3 object
                    });
                }
            }
        }
    ]);
