'use strict';

describe('Controller: ConservationCtrl', function () {

  // load the controller's module
  beforeEach(module('aquiferiumApp'));

  var ConservationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConservationCtrl = $controller('ConservationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
