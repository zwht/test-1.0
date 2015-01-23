var ngZw = angular.module('ngZw', []);

ngZw.directive('zwSelect2', function () {
    return{
        restrict: 'ECAM',
        replace: false,
        templateUrl:"template.html",
        scope: {
            myData1:"=",
            myData2:"="
        },
        compile: function (element, attrs) {

            function postLink(scope, element, attrs) {
                var _this = angular.element(element);
                var select=_this.find('.zw-elect-top');
                var input=select.find('input');
                var ul=_this.find('.zw-elect-bto');
                //var li=ul.find('li');

                select.click(function(){
                    input.focus();
                    if(scope.myData1.length>0){
                        select.find('input').show();
                        ul.show().css({top:select.height()+2,width:select.width()});
                    }else{
                        select.find('input').hide();
                    }
                    return false;
                });
                select.delegate('i','click',function(){

                    var h=$(this).siblings('strong').html();
                    for(var i=0;i<scope.myData2.length;i++){
                        if(scope.myData2[i].name==h){
                            scope.$apply(function() {
                                scope.myData1.push(scope.myData2[i]);
                                scope.myData2.splice(i, 1);
                            });
                            console.log(h);
                        }

                    }
                });
                ul.delegate('li','click',function(){
                    var v=$(this).html();
                    for(var i=0;i< scope.myData1.length;i++){
                        if(scope.myData1[i].name==v){
                            scope.$apply(function(){

                                scope.myData2.push(scope.myData1[i]);
                                scope.myData1.splice(i,1);

                            });
                        }
                    }
                    ul.hide();
                    input.focus();
                });
                document.onclick = function () {
                    ul.hide();
                }

            }
            return{
                post: postLink
            }
        }
    }
});

ngZw.controller('select2Ctr', ['$scope', function ($scope) {
    $scope.data1=[
        {name:'zw',id:12344},
        {name:'32434',id:234},
        {name:'sfds',id:33},
        {name:'6FDFV',id:5423},
        {name:'sadfCVBVCVB',id:546435}
    ];
    $scope.data2=[];
    //console.log($scope.data);
}]);
