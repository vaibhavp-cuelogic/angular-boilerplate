(function() {

    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', ['$scope', '$state', 'dashboardService', 'loginAuthService', 'localStorageServiceWrapper', '$location', 'employeeService', dashboardController]);

    function dashboardController($scope, $state, dashboardService, loginAuthService ,localStorageServiceWrapper, $location, employeeService) {   

         // It fetches the current login user details from services/utitility/localstorage/localstorage.js:
        var currentUserDetails = localStorageServiceWrapper.get('currentUser');
        //var credLen = Object.keys(currentUserDetails).length;

        if( currentUserDetails !== null ) {
        $scope.blackSpinner = 'resource/images/blackSpinner.gif';

        $scope.userList = function() { 
            //calling API and get user list
            //$scope.getUsers = dashboardService.getUserList().userDetails;
            $scope.getUsers = employeeService.getEmployeeList().userDetails;
            
            $scope.subTabMenus = [{
                'tabMenu': 'All',
                'action': 'dashboard'
            }, {
                'tabMenu': 'Proposals',
                'action': 'proposals'
            }]
        }
      }
      else 
      { 
        console.log('IIFE invalid credentials');
        (function() {
            $location.path('/login');
        })();
      }
    }

})();
