angular.module('test', ['testDirective.directive','dashboard.service','firstApp','secondApp']);

// [USING DPENDANCE INJECTION] :: Nested app implemtation: Pass below created two seperate app into above, main root app's array [...];
var firstApp = angular.module('firstApp', []);
var secondApp = angular.module('secondApp', []);
