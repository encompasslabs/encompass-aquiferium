'use strict';

describe('Controller: LearnCtrl', function () {

  // load the controller's module
  beforeEach(module('aquiferiumApp'));

  var LearnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LearnCtrl = $controller('LearnCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
