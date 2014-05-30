'use strict';

describe('Controller: SpringsCtrl', function () {

  // load the controller's module
  beforeEach(module('aquiferiumApp'));

  var SpringsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpringsCtrl = $controller('SpringsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
