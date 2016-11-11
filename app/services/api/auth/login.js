angular.module('login.service',[])
.factory('loginAuthService', function($http,dashboardService, localStorageServiceWrapper) {

	// Emtpy Object Declaration:
	var authService = {};
	var userList = dashboardService.getUserList().userDetails;

	authService.loginUser = function(credentials) {

		return new Promise(function(resolve,reject) {

		for(var i = 0; i < userList.length; i++) {
            var dt = userList[i] ;
            var credLen = Object.keys(credentials).length;

            if(credLen > 0 && dt.email == credentials.email && dt.password == credentials.password)
            {	
                // Use Promise here for validate user:
                resolve(dt);			
			}
		}

			reject("Credentails not match. Please try with valid credentials.");

		});

    };


	authService.isAuthenticated = function() { 

	 if(localStorageServiceWrapper.get('currentUser') == null) {

	 	return false;
	 }	
	 else 
	 {
	 	return true;
	 }

	}    

	return authService;
}) 

