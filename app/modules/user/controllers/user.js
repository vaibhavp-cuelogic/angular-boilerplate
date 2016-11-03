'use strict';
(function() {

    angular
        .module('user')
        .controller('userController', ['$scope', userController]);

    function userController($scope) {	

    	$scope.setTitle = 'Add user';

    	$scope.editUser = function() {
			alert('Here');
			$scope.setTitle = 'Edit User';    		
    	}
	}

})();
