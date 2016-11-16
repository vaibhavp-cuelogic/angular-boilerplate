describe('Test controller cases', function() {

    beforeEach(module('ui.router', 'test'));

    var $controller, testController;
    var $scope = {};

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
        testController = $controller('testController', { $scope: $scope });
    }));

    describe('Test Controller', function() {
        it('should exists', function() {
            expect(testController).toBeDefined();
        });
    });

});
