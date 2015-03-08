angular.module("index")
.controller("testCtrl",["$scope","globalServer",function($scope,globalServer){
        globalServer.setTitle("test");


    }]);