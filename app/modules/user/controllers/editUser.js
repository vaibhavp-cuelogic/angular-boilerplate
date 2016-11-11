'use strict';
(function() {

    angular
        .module('user')
        // [IMP NOTE]: value and constant are same way to define constanct varaible, but by defining using value we can change it from anywhere while defining by constant not changable.
        .value('USER_OLD_EMAIL', 'dummy@test.com') 
        .controller('editUserController', ['$scope', '$stateParams', 'employeeService', '$location', '$timeout','USER_OLD_EMAIL', editUserController])
        // Alert confirmation custom derective:
        .directive('ngConfirmClick',[
        function(){
            return {
                restrict: 'A',
                scope: 
                {   
                    sayHi: "&"
                },
                controller: 'editUserController',
                link: function (scope, element, attr) { 

                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    
                    element.bind('click',function (event) {
                        if (window.confirm(msg)) { 
                          scope.$apply(attr.ngClick);
                        }
                    });
                }
            };
    }])


    .directive('saveButton', function(){
        return {
            require: '^form',
            restrict: 'E',
            scope: {
                buttonValue: '=',
                disabledButton : '='
            },
            template: '<input type="submit" value="{{buttonValue}}" \
                        class="btn btn-primary radius expand" ng-disabled="disabledButton" >',
            link: function(scope, element, attrs, ctrl) {
                element.bind('click', function() {
                    
                    // If condition to check is form completely validat or not:
                    if(ctrl.$valid) {

                        // For dynamic Edit Submit Button:
                        scope.disabledButton = true; 
                        scope.buttonValue = 'Saving...';
                    }
                });
            }
        };
    });    
     
    function editUserController($scope,$stateParams, employeeService, $location, $timeout, USER_OLD_EMAIL) {

        $scope.buttonValue = 'Submit'; 


       $scope.toggledbldisplay = function() {

        alert('Double clicked');
       }       



        $scope.deleteEmp = function(uid) {
            
            var UsrId = parseInt(uid);

            // Calling delete method from employeeService to delete record from local storage:
            employeeService.deleteEmployee(UsrId).then(function(res) {

               // console.log(res);

            }).catch(function(msg){

                alert(msg);
            });

        }
        
        //  Below function is used to check for duplicate email:
        var count = 0;

        $scope.chkEmailDuplicate = function () {

            //alert('oldValue = ' + $scope.oldValue);
            //alert('newValue = ' + $scope.getUseDetails.email);

            if(count == 0) {
              // Global constant value varaible define at top:
              USER_OLD_EMAIL = $scope.oldValue;
            }

            console.log('User Old Val==>'+USER_OLD_EMAIL);

            if(USER_OLD_EMAIL !== $scope.getUseDetails.email)
            {   
                count++;
                
                if(employeeService.isDuplicateEmail($scope.getUseDetails.email, $scope.oldValue)) {
                    
                    // editUserFrm is form name:
                    $scope.editUserFrm.email.$setValidity('isDuplicateEmail', false);
                    return $scope.editUserFrm.email;
                }
                else 
                {   
                    // editUserFrm is form name:
                    $scope.editUserFrm.email.$setValidity('isDuplicateEmail', true);
                    return $scope.editUserFrm.email;
                }

            }
            else 
            {   
                // editUserFrm is form name:
                $scope.editUserFrm.email.$setValidity('isDuplicateEmail', true);
                return $scope.editUserFrm.email; 
            }

        }

        
        $scope.setTitle = 'Edit User';
        

        // Get unique id for each record pass through url:
        var postUid = parseInt($stateParams.uid);
            
        // Call employeeService service for fetching individual passed id employe record.
        $scope.getUseDetails = employeeService.getEmployee(postUid);


        // Function for update user/employee details:
        $scope.UpdateUser = function(userInfo) {

            var empId = userInfo.id;
            employeeService.updateEmployee(empId, userInfo).then(function(res) {

                $timeout(function() {   
                  $location.path('/dashboard');
                }, 3000); 
            
            }).catch(function(msg){

                alert(msg);
            });
            
        }

    }

})();
