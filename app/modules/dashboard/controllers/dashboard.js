(function() {

    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', ['$scope', '$state', 'dashboardService', 'loginAuthService', 'localStorageServiceWrapper', '$location', 'employeeService', dashboardController]);

    function dashboardController($scope, $state, dashboardService, loginAuthService ,localStorageServiceWrapper, $location, employeeService) {   


        var gender_order = {
            F: 1,
            M: 2
        };
    
        $scope.order = {
            field: 'name',
            reverse: false
        };

        $scope.reverseOrder = false;
    
        $scope.dynamicOrder = function(user) {
            var order = 0;
            switch ($scope.order.field) {
                case 'gender':
                    order = gender_order[user.gender];
                    break;
                default:
                    order = user[$scope.order.field];
            }

            return order;
        }


         // It fetches the current login user details from services/utitility/localstorage/localstorage.js:
        var currentUserDetails = localStorageServiceWrapper.get('currentUser');
        //var credLen = Object.keys(currentUserDetails).length;

        if( currentUserDetails !== null ) {
        $scope.blackSpinner = 'resource/images/blackSpinner.gif';

        $scope.userList = function() { 
            //calling API and get user list
            $scope.getUsers = employeeService.getEmployeeList().userDetails;

            //console.log($scope.getUsers);

            //$scope.getUsers = employeeService.getEmployeeList();
            //$scope.getUsers = employeeService.getEmployeeListNew();
            
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
