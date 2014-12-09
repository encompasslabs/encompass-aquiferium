var app = angular.module('app', ['angularModalService']);

app.controller('Controller', function($scope, ModalService) {
    
    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
    
});
