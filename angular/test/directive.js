require.config({
    baseUrl: '../../common/js/',
    paths: {
<<<<<<< HEAD
        angular: 'angular/angular.min',
        angularRoute: 'angular/angular-route.min',
        resource: 'angular/angular-resource.min'
=======
        angular: 'angular/angular.min'
>>>>>>> 5d19131d9dcdf9b2912136871eb681d45a3645f6
    }
    /*shim:{
     'angular':{
     deps:[],
     exports:'_'
     }
     }*/
});
<<<<<<< HEAD
require(['angular', 'angularRoute', 'resource'], function () {

    var myApp = angular.module('myApp', ['ngRoute'],
        ['$compileProvider', '$routeProvider', '$locationProvider', '$provide', '$controllerProvider',
            function ($compileProvider, $routeProvider, $locationProvider, $provide, $controllerProvider) {

                console.log($routeProvider);
                console.log($locationProvider);

                console.log($provide);
                console.log($controllerProvider);

                $compileProvider.directive('directive', function () {
                    return{
                        restrict: "ECAM",
                        template: '<div>directive-test<span ng-transclude></span></div>',
                        replace: true,
                        controller: function ($scope) {
                            $scope.name = '赵伟';
                        },
                        scope: true,
                        transclude: true,
                        compile: function (tAttrs, a, b) {

=======
require(['angular'], function () {
    var myApp = angular.module('myApp', [], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('directive', function () {
            return{
                restrict: "ECAM",
                template: '<div>directive-test<span ng-transclude></span></div>',
                replace: true,
                controller: function ($scope) {
                    $scope.name = '赵伟';
                },
                scope: true,
                transclude: true,
                compile: function (tAttrs, a, b) {
>>>>>>> 5d19131d9dcdf9b2912136871eb681d45a3645f6

                            var preLink = function (scope) {
                                //console.log(b);
                            };
                            var postLink = function (cc) {
                                //console.log(cc);
                            };
                            return{
                                pre: preLink,
                                post: postLink
                            }
                        }
                    }
                })
            }]);
    myApp.run(function ($rootScope, $window, $location) {
        console.log($window);
    });

<<<<<<< HEAD
    myApp.controller('myController', ['$location','$rootScope', function ($location,$rootScope) {
        console.log($rootScope);
=======
                    var preLink = function (scope) {
                        console.log(b);
                    };
                    var postLink = function (cc) {
                        console.log(cc);
                    };
                    return{
                        pre: preLink,
                        post: postLink
                    }
                }
            }
        })
>>>>>>> 5d19131d9dcdf9b2912136871eb681d45a3645f6
    }])
});