angular.module('employee.service',[])
.factory('employeeService', ['$http', 'dashboardService', '$timeout', employeeService]);
  
function employeeService($http, dashboardService, $timeout) {
    var employee = {};
    var empList = [];
    
    // Fetch all employees records from inner service call as 'dashboardService':
    empList = dashboardService.getUserList();    

    employee.getEmployeeList = getEmployeeList;
    employee.getEmployee = getEmployee;
    employee.updateEmployee = updateEmployee;
    employee.deleteEmployee = deleteEmployee;
    employee.addEmployee = addEmployee;
    employee.isDuplicateEmail = isDuplicateEmail;
    employee.deleteMultipleEmployees = deleteMultipleEmployees;

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

    }


    // Delete employee record:
    function deleteEmployee(userId) {  

        if (!isNaN(userId) && typeof(userId) == "number") {

        for(var i=0; i< empList.userDetails.length; i++){   

            if(empList.userDetails[i].id == userId){
                empList.userDetails.splice(i, 1);
                break;
            }
               
        }
        
        return new Promise(function(resolve,reject) {
            resolve(empList);
        });

      }
      else 
      {  
        return false;
      } 

    }


    function deleteMultipleEmployees(userIdsArr) {

        console.log(userIdsArr[1]);

        return new Promise(function(resolve,reject) {

        for(var i = 0; i < userIdsArr.length; i++) {
            
            for(var j=0; j< empList.userDetails.length; j++){   

                if(empList.userDetails[j].id == userIdsArr[i]){
                    
                    //$timeout(function() {
                        empList.userDetails.splice(j, 1);
                        resolve(empList);
                    //}, 3000);
                }
            }
        }
           // $timeout(function() {
                reject("Ids not selected");
            //}, 3000);
        });
    }


    // Check is inputed email already exsist in localstorage array:
    function isDuplicateEmail(varemail) {   

        var currentEmpList = dashboardService.getUserList();

        for (var i in currentEmpList.userDetails) {
            
            if(currentEmpList.userDetails[i].email === varemail) {
                
                return true;
            }
        }

        return false;
    }

    return employee;

}