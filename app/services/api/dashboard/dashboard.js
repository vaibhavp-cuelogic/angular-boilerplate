angular.module('dashboard.service', [])
    .factory('dashboardService', ['$http', dashboardService]);



function dashboardService($http) {
    var service = {};

    service.getUserList = getUserList;

    return service;

    function getUserList() {
        var userList = {};

        return userList = {
            "userDetails": [{
                "id": 1,
                "name": "Prasanna",
                "lname": "Deshmukh",
                "gender": "M",
                "email": "prasanna@cuelogic.com",
                "password": "prasanna@123",
                "department": "Developer",
                "salary": 1000,
                "image": "http://cache4.asset-cache.net/fk/176794537.jpg?v=1&c=IWSAsset&k=1&f=2&d=4575EEE0F3AA8377CD9D0036C287379E479DFF9E20496F56146E8D247CE15381"
            },{
                "id": 2,
                "name": "Ayush",
                "lname": "Kumar",
                "gender": "M",
                "email": "ayush@cuelogic.com",
                "password": "ayush@123",
                "department": "I.T",
                "salary": 1000,
                "image": "resource/images/IMG_3050.JPG"
            }, {
                "id": 3,
                "name": "Bobo",
                "lname": "Jonson",
                "gender": "F",
                "email": "bobo.com",
                "password": "bobo@123",
                "department": "Project manager",
                "salary": 100000,
                "image": "resource/images/textures-selection-nice-high-resolution_2165080.jpg"
            }, {
                "id": 4,
                "name": "Baby",
                "lname": "Watson",
                "gender": "F",
                "email": "baby@cuelogic.com",
                "password": "baby@123",
                "department": "developer",
                "salary": 2000,
                "image": "resource/images/404.png"
            }, {
                "id": 5,
                "name": "Nilesh",
                "lname": "Jamdar",
                "gender": "M",
                "email": "nilesh@cuelogic.com",
                "password": "nilesh@123",
                "department": "Designer",
                "salary": 5500,
                "image": "resource/images/6309_1280x800.jpg"
            }, {
                "id": 6,
                "name": "amol",
                "lname": "Khamankar",
                "gender": "M",
                "email": "amol@cuelogic.com",
                "password": "amol@123",
                "department": "Manager",
                "salary": 100500,
                "image": "resource/images/brand-avatar.jpg"
            }, {
                "id": 7,
                "name": "ganesh",
                "lname": "Joshi",
                "gender": "M",
                "email": "ganesh@cuelogic.com",
                "password": "ganesh@123",
                "department": "Accountant",
                "salary": 1000,
                "image": "resource/images/ipgeo.png"
            }, {
                "id": 8,
                "name": "Vaibhav",
                "lname": "Pathak",
                "gender": "M",
                "email": "vaibhav.pathak@cuelogic.com",
                "password": "12345678",
                "department": "Frontend Developer",
                "salary": 2000,
                "image": "resource/images/ipgeo.png"
            }]
        }
    }
    //END
};
