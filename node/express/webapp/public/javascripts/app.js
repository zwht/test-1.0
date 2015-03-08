angular.module("myApp",['ngRoute','index'])
    .config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
        $routeProvider
            .when('/',{templateUrl:'views/index.html',controller:'indexCtrl'})
            .when('/test',{templateUrl:'views/test.html',controller:'testCtrl'})
    }])
    .run(["$rootScope","$location",function($rootScope,$location) {
        //$rootScope.title='webApp'
    }]);
    

