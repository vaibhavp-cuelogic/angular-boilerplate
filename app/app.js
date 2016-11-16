'use strict';

(function() {

    // Declare app level module
    angular
        .module('angularClientApp', [
            'ui.router',
            'ngAnimate',
            'angularLazyImg',
            'ui.bootstrap',
            'localStorage.service',
            'config',
            'auth',
            'base',
            'dashboard',
            'test',
            'user'
            
        ])

        /* 
            IMP: Below code is checked for autheticate urls. If the url required login authentication but try to access,
            without authentication then it redirects user to login page. For that we write below common code to handle 
            authentication paramter. For the route urls for which we set authenticate = ture need authenticaton for access,
            but for authenticate = false, not needed we manage this situation by below code.
        */
        .run(function ($rootScope, $state, loginAuthService) {    

            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                
                if(toState.authenticate && !loginAuthService.isAuthenticated())
                { 
                    $state.transitionTo("login");
                    event.preventDefault(); 
                }

                // For accessing login url directly after user already in login sate.
                if(toState.chkAuthenticat && loginAuthService.isAuthenticated())
                { 
                    $state.transitionTo("base.dashboard");
                    event.preventDefault(); 
                }

            });  
        })

        .config(['$urlRouterProvider', '$locationProvider', '$httpProvider', initializeConfigurationPhase]);

    function initializeConfigurationPhase($urlRouterProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        /*
           [IMP NOTE ]: For otherwise or default route, we checked as per conditon we redirect user,
           i.e. if user is login and put unknown url, then redirect user on his dashboard page, and if
           user is not login and try to put unknown url, then redirect it on login page. 
        */

        $urlRouterProvider.otherwise(function($injector, $location , loginAuthService, $state) {

            // Inject the custome lgoin authentication service which we need to check for authetication.
            var loginAuthService = $injector.get("loginAuthService");

            // Inject $state object, which we need to redirect purpose.
            var state = $injector.get('$state');

            if(loginAuthService.isAuthenticated()){

                state.go("base.dashboard");
            }
            else {

                state.go("login");
            }

        });

        

        $httpProvider.interceptors.push('APIInterseptor');
    }

})();
