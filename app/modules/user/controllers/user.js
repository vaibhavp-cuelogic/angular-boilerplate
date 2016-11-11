'use strict';
(function() {

    angular
        .module('user')
        .controller('userController', ['$scope', 'employeeService', '$location', '$timeout','APIInterseptor', userController]);

    function userController($scope, employeeService, $location, $timeout, APIInterseptor) {	

    	// Initialized radio button with default value set as 'Male' i.e. M:
    	$scope.addUseDetails = {"gender": 'M'};


    	$scope.setTitle = 'Add user';

    	$scope.buttonValue = 'Submit';

    	$scope.AddUser = function() {	

    		var empNewId = parseInt(employeeService.getEmployeeList().userDetails.length) + 1; 

    		var userInfo = $scope.addUseDetails;

    		empInfo = {
				'id': empNewId,
				'name': userInfo.name,
				'lname': userInfo.lname,
				'email': userInfo.email,
				'department': userInfo.department,
				'salary': userInfo.salary,
				'gender': userInfo.gender,
			};


    		// Store employee information into localstorage
    		employeeService.addEmployee(empInfo).then(function(res) {

                $timeout(function() {
                  $location.path('/dashboard');
                }, 3000); 
            
            }).catch(function(msg){

                alert('somthing went wrong');
            });

    	}


    	    $scope.chkEmailDuplicate = function () {

            	//console.log($scope.addUseDetails.email);

                if(employeeService.isDuplicateEmail($scope.addUseDetails.email)) {
                    // editUserFrm is form name:
                    $scope.AddUserFrm.email.$setValidity('isDuplicateEmail', false);	
                    return $scope.AddUserFrm.email;
                }
                else 
                {   
                	// editUserFrm is form name:
                    $scope.AddUserFrm.email.$setValidity('isDuplicateEmail', true);
                    return $scope.AddUserFrm.email;
                }
			}

		}

})();
