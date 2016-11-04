angular.module('employee.service',[])
.factory('employeeService', ['$http', 'dashboardService', employeeService]);
  
function employeeService($http, dashboardService) {
    var employee = {};
    var tempArr = [];
    var empList = [];
    var newEmpList = [];
    //var resEmpList = [];

    // Fetch all employees records from inner service call as 'dashboardService':
    empList = dashboardService.getUserList();    

    employee.getEmployeeList = getEmployeeList;
    employee.getEmployee = getEmployee;
    employee.updateEmployee = updateEmployee;
    employee.deleteEmployee = deleteEmployee;
    employee.addEmployee = addEmployee;

    // Temp Created:
    employee.getEmployeeListNew = getEmployeeListNew;
    employee.setNewEmployeeList = setNewEmployeeList;


    // Fetch All Employee Records:
    function getEmployeeList() {

        if(newEmpList.length > 0) {
            return newEmpList;
        }
        else 
        {
            return empList;
        }
    }

    function getEmployeeListNew(empNewList) {
        var resEmpList = [];


        //return empNewList.userDetails[0].id;

       for(var i=0; i < empNewList.userDetails.length; i++) {

            if(empNewList.userDetails[i].id !== null) {

                resEmpList.push(empNewList.userDetails[i]);
            }
        }

        return resEmpList; 
        //return empList;
    }


    function setNewEmployeeList(empNewList) {
        
        newEmpList.userDetails = empNewList;
        return true;
    }    


    // Fetch Individual Employee Record:
    function getEmployee(userId) {  

        if(!isNaN(userId) && typeof(userId) == "number" && userId > 0) {
            return empList.userDetails[userId - 1];
        }
    }

    // Add new employee information into local storage:
    
    function addEmployee(empDet) {  

        if (empDet != null) {
            
            empList.userDetails.push(empDet);

            return new Promise(function(resolve,reject) {
                resolve(empList);
            });
        }
    }


    // Update Individual Employee Record:
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


    // Delete employee record:
    function deleteEmployee(userId) {  

        if (!isNaN(userId) && typeof(userId) == "number" && userId > 0) {
            
            //console.log(empList.userDetails);

            //empList.userDetails[userId - 1].id = null;

            

            empList.userDetails.splice(0, 1);
            //resEmpList = getEmployeeListNew(); 
            //var resEmpList = getEmployeeListNew(empList); 
            
            return new Promise(function(resolve,reject) {
                resolve(empList);
                //resolve(resEmpList);
            }); 
        }

        return false;
        /* return new Promise(function(resolve,reject) {
            reject("Something Went Wrong");
        }); */
    }

    return employee;

}