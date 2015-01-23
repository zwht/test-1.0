var ngZw = angular.module('ngZw', []);

ngZw.directive('checkBox', function () {
    return{
        restrict: 'ECAM',
        replace: false,
        templateUrl: "template.html",
        scope: {
            checkData: "=",
            callBack: "="
        },
        compile: function (scope, element, attrs) {
            console.log(element);
            function postLink(scope, element, attrs) {
                element.delegate('li', 'click', function () {
                    var classArray = $(this).attr('class').split(' ');
                    var isDisabled = $.inArray("disabled", classArray);
                    if (isDisabled == -1) {
                        $(this).toggleClass('active');
                        scope.callBack($(this));
                    }
                })
            }

            return{
                post: postLink
            }
        }
    }
});

ngZw.controller('controller', ['$scope', function ($scope) {
    $scope.data = [
        {name: '全选', checked: 1},
        {name: '一班', checked: 1},
        {name: '二班', checked: 1},
        {name: '三班', checked: 1},
        {name: '四班', checked: 1}
    ];
    $scope.callBack = function (_this) {
        //console.log(_this.index());
        if (_this.index() == 0) {
            if (_this.hasClass('active')) {
                _this.siblings().addClass('active');
            } else {
                _this.siblings().removeClass('active');
            }

            console.log(_this.hasClass('active'));
        } else {
            _this.siblings().first().removeClass('active');
        }
    }
}]);
