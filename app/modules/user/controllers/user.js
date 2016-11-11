'use strict';
(function() {

    angular
        .module('user')
        .controller('userController', ['$scope', 'employeeService', '$location', '$timeout','APIInterseptor', userController]);

    function userController($scope, employeeService, $location, $timeout, APIInterseptor) {	

    	$scope.setTitle = 'Add user';

    	$scope.buttonValue = 'Submit';

    	$scope.AddUser = function(userInfo) {

    		var empNewId = parseInt(employeeService.getEmployeeList().userDetails.length) + 1; 

    		//console.log(empNewId);

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

	}

})();
