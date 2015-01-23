var ngZw = angular.module('ngZw', []);

ngZw.directive('zwLoading', function () {
    return{
        restrict: 'ECAM',
        replace: false,
        scope: {
            key: '=key',
            r1: '=r1',
            r2: '=r2',
            count: '=count',
            width: '=strokeWidth'
        },
        compile: function (element, attrs) {

            var _this = angular.element(element);

            function postLink(scope, element, attrs) {
                var sectorsCount = scope.count || 12,
                    color = attrs.strokeColour || "#000",
                    width = scope.width || 5,
                    r1 = Math.min(scope.r1, scope.r2) || 10,
                    r2 = Math.max(scope.r1, scope.r2) || 20,
                    cx = r2 + width,
                    cy = r2 + width,
                    sectors = [],
                    opacity = [],
                    beta = 2 * Math.PI / sectorsCount,
                    pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"},
                    wh = r2 * 2 + width * 2,
                    parentTop =parseInt(_this.parent().height() / 2 - wh / 2),
                    parentLeft =parseInt(_this.parent().width() / 2 - wh / 2);
                if (attrs.zwLoading) {
                    parentTop = parseInt(attrs.zwLoading);
                    console.log(1)
                }
                var tick;
                var r = Raphael(attrs.id, r2 * 2 + width * 2, r2 * 2 + width * 2);
                Raphael.getColor.reset();
                for (var i = 0; i < sectorsCount; i++) {
                    var alpha = beta * i - Math.PI / 2,
                        cos = Math.cos(alpha),
                        sin = Math.sin(alpha);
                    opacity[i] = 1 / sectorsCount * i;
                    sectors[i] = r.path([
                        ["M", cx + r1 * cos, cy + r1 * sin],
                        ["L", cx + r2 * cos, cy + r2 * sin]
                    ]).attr(pathParams);
                    if (color == "rainbow") {
                        sectors[i].attr("stroke", Raphael.getColor());
                    }
                }
                (function ticker() {
                    opacity.unshift(opacity.pop());
                    for (var i = 0; i < sectorsCount; i++) {
                        sectors[i].attr("opacity", opacity[i]);
                    }
                    r.safari();
                    tick = setTimeout(ticker, 1000 / sectorsCount);
                })();
                _this.css({height: ( wh + 'px'), width: (wh + 'px'), top: parentTop+'px', left: parentLeft+'px',position: 'absolute'});
                scope.$watch('key', function () {
                    if (!scope.key) {
                        _this.show().parent().css({position: 'relative'});

                    } else {
                        _this.hide().parent().css({position: ''});
                    }
                });
            }
            return{
                post: postLink
            }
        }
    }
});

ngZw.controller('loadingCtr', ['$scope', function ($scope) {
    $scope.key = false;
    $scope.changKey = function () {
        $scope.key = !$scope.key;
    }
}]);
