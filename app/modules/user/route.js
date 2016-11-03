(function() {
    'use strict';

    angular
        .module('user')
        .config(['$stateProvider', stateProvider])

    function stateProvider($stateProvider) {

        $stateProvider
            .state('base.user', {
                url: '/add/user',
                views: {
                    'content': {
                        templateUrl: 'app/modules/user/views/add_user.html',
                        controller: 'userController'
                    }
                }
            })

            .state('base.edit-user', {
                url: '/edit/user/:uid',
                views: {
                    'content': {
                        templateUrl: 'app/modules/user/views/edit_user.html',
                        controller: 'editUserController'
                    }
                }
            });
    }

})();
