angular.module("myApp")
.factory("globalServer",["$rootScope",function($rootScope){


        var obj={};
        obj.setTitle=function(t){
            $rootScope.title=t;
        };

        return obj;
    }]);