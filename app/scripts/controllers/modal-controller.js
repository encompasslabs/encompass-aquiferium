(function() {
    'use strict';

    angular
        .module('app')
        .controller('Controller', Controller);

    Controller.$inject = ['angularModalService'];

    function Controller($scope, ModalService) {
        $scope.show = function() {
            ModalService.showModal({
                templateUrl: 'modal.html',
                controller: 'ModalController'
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    $scope.message = 'You said ' + result;
                });
            });
        };

    }
})();
