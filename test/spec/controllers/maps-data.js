'use strict';

describe('Controller: MapsDataCtrl', function () {

  // load the controller's module
  beforeEach(module('aquiferiumApp'));

  var MapsDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapsDataCtrl = $controller('MapsDataCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
