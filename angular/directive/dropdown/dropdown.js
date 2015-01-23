var ngZw = angular.module('ngZw', []);

ngZw.directive('zwDropdown', function () {
    return{
        restrict: 'ECAM',
        replace: false,
        templateUrl: "tempile.html",
        scope: {
            zwDropdown: "=",
            value: "="
        },
        compile: function (element, attrs) {
            function postLink(scope, element, attrs) {
                scope.key=false;
                scope.liClick = function (data) {
                    scope.value = data;
                    scope.key=false;
                };
                scope.showUl = function () {
                    scope.key=!scope.key;
                };
                scope.stopPropagation=function(e){
                    if(e&&e.stopPropagation){
                        e.stopPropagation();
                    }else{
                        window.event.cancelBubble = true;
                    }
                };
                document.onclick = function () {
                    scope.$apply(function(){
                        scope.key=false;
                    });
                }

            }
            return{
                post: postLink
            }
        }
    }
});

ngZw.controller('select2Ctr', ['$scope', function ($scope) {
    $scope.data = [
        {name: 'zw', id: 12344},
        {name: '32434', id: 234},
        {name: 'sfds', id: 33},
        {name: '6FDFV', id: 5423},
        {name: 'sadfCVBVCVB', id: 546435}
    ];
    $scope.value = $scope.data[0];
    $scope.$watch("value", function (v) {
        console.log(v);
    })
}]);
