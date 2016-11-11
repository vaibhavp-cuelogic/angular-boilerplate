'use strict';

(function() {

    angular
        .module('auth')
        .controller('loginController', ['$scope', '$rootScope', '$state', 'loginAuthService', '$location', 'localStorageServiceWrapper', '$timeout', loginController]);

    function loginController($scope, $rootScope, $state, loginAuthService, $location, localStorageServiceWrapper, $timeout) {
        //console.log("Inside login controller");
		
		$scope.loginUser = function(credentials) {

          if( credentials !== null ) {   
            
		// Use Promise here for checking validated user:
		loginAuthService.loginUser(credentials).then(function(user) { 

            localStorageServiceWrapper.set('currentUser',user);

            	$timeout(function() {

                  $location.path('/dashboard');

                }, 1500); 

    	}).catch(function(msg){    
            $scope.email = null;
            alert(msg);
            console.log(msg);
		});
      }
      else 
      {
        //console.log('IIFE invalid credentials');
        (function() {   
            $location.path('/login');
        })();
      }
    }



    $scope.logoutUser = function(credentials) {

        loginAuthService.loginUser(credentials).then(function(user) {

            localStorageServiceWrapper.clearAll('currentUser');
            // Calling IIFE for redirecting route on login page.
            (function() {    

                $location.path('/login');
            })();
        }).catch(function(msg){

            console.log("credentials not found");
        });   
    } 
 }

})();
