(function() {
    'use strict';

    angular
        .module('dashboard')
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])

    function stateProvider($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('base.dashboard', {
                url: '/dashboard',
                authenticate: true,
                views: {
                    'content': {
                        templateUrl: 'app/modules/dashboard/views/dashboard.html',
                        controller: 'dashboardController'
                    }
                }
            });
    }

})();
