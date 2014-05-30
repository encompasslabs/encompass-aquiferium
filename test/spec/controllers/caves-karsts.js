'use strict';

describe('Controller: CavesKarstsCtrl', function () {

  // load the controller's module
  beforeEach(module('aquiferiumApp'));

  var CavesKarstsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CavesKarstsCtrl = $controller('CavesKarstsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
