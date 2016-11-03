'use strict';
(function() {

    angular
        .module('user')
        .controller('editUserController', ['$scope', '$stateParams', 'employeeService', '$location', '$timeout', editUserController])

        .directive('ngConfirmClick',[
        function(){
            return {
                restrict: 'A',
                scope: 
                {
                    slheats: "=",
                    confirmedClick: "&"
                },
                controller: 'editUserController',
                link: function (scope, element, attr) { 

                    //console.log(attr);

                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    
                    console.log(clickAction);

                    element.bind('click',function (event) {
                        if (window.confirm(msg)) { 
                          scope.$apply(attr.confirmedClick);
                        }
                    });
                }
            };
    }])

    function editUserController($scope,$stateParams, employeeService, $location, $timeout) {	

        
        $scope.sayHi = function(uid) {
            alert(uid);
        }
        

        $scope.setTitle = 'Edit User';
        

        // Get unique id for each record pass through url:
        var postUid = parseInt($stateParams.uid);
            
        // Call employeeService service for fetching individual passed id employe record.
        $scope.getUseDetails = employeeService.getEmployee(postUid);


        // Function for update user/employee details:
        $scope.UpdateUser = function(userInfo) {

            var empId = userInfo.id;

            employeeService.updateEmployee(empId, userInfo).then(function(res) {

                $timeout(function() {
                  $location.path('/dashboard');
                }, 1500); 
            
            }).catch(function(msg){

                alert(msg);
            });
            
        }

    }

})();
