angular.module('login.service',[])
.factory('loginAuthService', function($http,dashboardService) {

	// Emtpy Object Declaration:
	var authService = {};
	var userList = dashboardService.getUserList().userDetails;

	authService.loginUser = function(credentials) {

		for(var i = 0; i < userList.length; i++) {
            var dt = userList[i] ;
            var credLen = Object.keys(credentials).length;

            if(credLen > 0 && dt.email == credentials.email && dt.password == credentials.password)
            {	
                // Use Promise here for validate user:
                return new Promise(function(resolve,reject){
					resolve(dt);
				});

			}
		}

        //return false;

        return new Promise(function(resolve,reject){
			reject("Credentails not match. Please try with valid credentials.");
		});

	};

	return authService;
}) 

