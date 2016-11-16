
angular
.module('testDirective.directive', [])
.directive("myCustomer", myCustomer);

function myCustomer() {

    return {    
                restrict: "E",
                scope: {
                        "fetchUserDetail": "="
                     },
                templateUrl: "app/directives/test/views/test-customer.html",  
                
                controller: ['$scope', '$location', function($scope, $location) {  
                    return $scope.fetchUserDetail;
                }]   
           }; 
    }

