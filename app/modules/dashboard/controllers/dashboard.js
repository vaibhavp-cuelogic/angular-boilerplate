(function() {

    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', ['$scope', '$rootScope', '$state', 'dashboardService', 'loginAuthService', 'localStorageServiceWrapper', '$location', 'employeeService', '$timeout', dashboardController])

        .directive('deleteButton', function(){
        return {
            restrict: 'E',
            scope: {
                buttonValue: '=',
                disabledButton : '=',
                deleteMultipleEmp: '&'
            },
            template: '<input type="text" value="{{buttonValue}}" \
                        class="btn btn-primary radius expand" ng-disabled="disabledButton" ng-click="deleteMultipleEmp()">',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    // For dynamic Edit Submit Button:
                    //scope.$apply(attr.ngClick);

                });
            }
        };
    }); 


    function dashboardController($scope, $rootScope, $state, dashboardService, loginAuthService ,localStorageServiceWrapper, $location, employeeService, $timeout) {   

            $scope.buttonValue = 'Delete';


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
            var currentEmpDetails = localStorageServiceWrapper.get('currentUser');
            

            $scope.blackSpinner = 'resource/images/blackSpinner.gif';

            $scope.userList = function() { 
                
                //calling API and get user list
                $scope.getUsers = employeeService.getEmployeeList().userDetails;

                $scope.subTabMenus = [{
                    'tabMenu': 'All',
                    'action': 'dashboard'
                }, {
                    'tabMenu': 'Proposals',
                    'action': 'proposals'
                }]
            }

            $scope.deletedUsers = [];

            $scope.selectRow = function( userId ) {

            var indexOfUserId = $scope.deletedUsers.indexOf( userId );

            if ( -1 == indexOfUserId ) {
                $scope.deletedUsers.push( userId );
            } else {
                $scope.deletedUsers.splice( indexOfUserId, 1 );
            }

        }


        $scope.deleteMultipleEmp = function() {

            
                $scope.disabledButton = true; 
                $scope.buttonValue = 'Deleting...';

                    $timeout(function() {
                        employeeService.deleteMultipleEmployees($scope.deletedUsers).then(function(res) {

                        }).catch(function(msg){

                            alert(msg);
                        });

                        $scope.disabledButton = false; 
                        $scope.buttonValue = 'Delete';

                    }, 3000);

            

               

            

        }


    } /*END*/

})();
