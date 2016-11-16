(function() {

    'use strict';

    angular
        .module('test')
        .config(['$stateProvider', stateProvider])

    function stateProvider($stateProvider) {

        $stateProvider
            .state('base.test', { //base.test, if want to add side bar and menubar rendering after login.

                url: '/test/directive',
                authenticate: false,
                views: {
                    'content': {
                        templateUrl: 'app/modules/test/views/testDirective.html',
                        controller: 'testController'
                    }
                }
            })

            .state('base.testapp', { //base.test, if want to add side bar and menubar rendering after login.

                url: '/test/ngapp',
                authenticate: false,
                views: {
                    'content': {
                        templateUrl: 'app/modules/test/views/testNgApp.html',
                        controller: 'testController'
                    }
                }
            });

        }
})();
