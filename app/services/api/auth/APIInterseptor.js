'use strict';

angular.module('APIInterseptor.service', [])

    .factory('APIInterseptor', function($rootScope, localStorageServiceWrapper) {

        var service = {};

        service.request = function(config) { 

            var currentEmpUser = localStorageServiceWrapper.get('currentUser');

            access_token = currentEmpUser?currentEmpUser.id:null;

            if(access_token){

                config.headers.authorization = access_token;
                $rootScope.$broadcast('authorized');
            }
            
            //console.log(config);

            return config;
        }

        /*service.response = function(response) { 
            
            response.status = 401;
            
            //service.responseError (response);
            
            return response;
        }*/

        service.responseError = function(response) { 

            //console.log(response.status);
            //alert('i am in responseError');

            if(response.status === 401){

               $rootScope.$broadcast('unauthorized'); 
            }

            return response;
        }

        return service;

    });