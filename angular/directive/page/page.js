angular.module('myModule', ['ui.bootstrap'])
.controller('paperCtr',['$scope',function($scope){
        $scope.maxSize=100;
        $scope.bigCurrentPage=10;
        $scope.bigTotalItems=5;
        $scope.numPages=100;

        console.log(111111111)


    }]);