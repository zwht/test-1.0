angular.module("index",[])
    .factory("indexService",function($http){
        var data={};
        data.getData=function(callBack){
            $http({
                method:"GET",
                url:"/test"
            }).success(function(data,status,headers,config){
                callBack(data);
            })
        };
        return data;
    });