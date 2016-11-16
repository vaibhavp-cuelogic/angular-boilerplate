(function() {

	'use strict';

	angular.module('test')
	
	.controller('testController',['$scope','$state', '$location', 'dashboardService', testController])

	// [USING DPENDANCE INJECTION] :: Both firstApp and secondApp defined in index file which use to differenciate 
	// the controller with respect to module:
	firstApp.controller('FirstController',['$scope','$state', '$location', FirstController])
	secondApp.controller('SecondController',['$scope','$state', '$location', SecondController])

	/*.directive('myCustomer', function() {
			
		return {

			template: 'Name: {{ customer.name }} Age: {{ customer.age }}'	
		}	
	});*/

	function testController($scope, $state, $location, dashboardService) {
		
		$scope.customer = {

			name: "Vaibhav Pathak",
			age: '28'
		};

		$scope.fullName = "Vaibhav";
	$scope.employees = dashboardService.getUserList().userDetails;

		console.log($scope.employees);
	}


	function FirstController($scope, $state, $location) {

		$scope.desc = "First App";		
	}

	function SecondController($scope, $state, $location) {

		$scope.desc = "Second App";
	}

	
})();
