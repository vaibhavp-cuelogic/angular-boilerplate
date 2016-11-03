angular.module('employee.service',[])
.factory('employeeService', ['$http', 'dashboardService', employeeService]);
  
function employeeService($http, dashboardService) {
    var employee = {};

    // Fetch all employees records from inner service call as 'dashboardService':
    empList = dashboardService.getUserList();    

    employee.getEmployeeList = getEmployeeList;
    employee.getEmployee = getEmployee;
    employee.updateEmployee = updateEmployee;


    // Fetch All Employee Records:
    function getEmployeeList() {

        return empList;
    }

    // Fetch Individual Employee Record:
    function getEmployee(userId) {  

        if(!isNaN(userId) && typeof(userId) == "number" && userId > 0) {
            return empList.userDetails[userId - 1];
        }
    }


    function updateEmployee(userId, userDet) {

        if(!isNaN(userId) && typeof(userId) == "number" && userId > 0) {
            empList.userDetails.splice(userId - 1, 1, userDet);
            return new Promise(function(resolve,reject) {
                resolve(empList);
            });
        }

            
       /* return new Promise(function(resolve,reject) {
            reject("Something Went Wrong");
        });*/
    }

    return employee;

}