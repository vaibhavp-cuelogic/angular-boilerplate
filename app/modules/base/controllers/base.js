'use strict';
(function() {

    angular
        .module('base')
        .controller('baseController', ['$scope', '$rootScope', '$state', 'menuService', 'localStorageServiceWrapper', baseController]);

    function baseController($scope, $rootScope, $state, menuService, localStorageServiceWrapper) {

    	console.log("Inside Base controller");
        
        //calling API and get menus
        $scope.getMenus = menuService.getSidebarMenuList().userMenu;

        // It fetches the current login user details from services/utitility/localstorage/localstorage.js:
        

        $rootScope.$on('authorized', function() { 

            $scope.currentUserDetails = localStorageServiceWrapper.get('currentUser');
        });	

        $rootScope.$on('unauthorized', function() { 
            
            var currentUserDetails = localStorageServiceWrapper.set('currentUser',null);
            $state.go('login');

        });

    }

})();
