angular.module("index")
    .controller("indexCtrl",["$scope","globalServer","$location",'indexService',function($scope,globalServer,$location,indexService){
        globalServer.setTitle("index");

        $scope.buttonClick=function(){
            $location.url('/test');
            indexService.getData(function(data){
                console.log(data);
            });
        };
    }]);
