var ngZw = angular.module('ngZw', []);

ngZw.directive('zwTree', function () {
    return{
        restrict: 'ECAM',
        replace: false,
        scope: {
            zwTree: "=",
            firstHide: "@"
        },
        compile: function (element, attrs) {


            function creatDom(data, ul) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var li = $("<li>").appendTo(ul),
                            title = $("<div>").appendTo(li).addClass("tree-li-title"),
                            icon = $("<span>").appendTo(title),
                            icon2 = $("<span>").appendTo(icon),
                            a = $("<a>").appendTo(title).html(data[i].name + "  (<i>" + data[i].d1 + "</i>/" + data[i].d2 + "/" + parseInt(100 * data[i].d1 / data[i].d2) + "%)"),
                            bar = $("<div>").appendTo(li).addClass("tree-li-bar"),
                            bar1 = $("<div>").appendTo(bar).css({width: (10 * data[i].d2)}),
                            bar2 = $("<div>").appendTo(bar1).css({width: (10 * data[i].d1)});


                        if (i === data.length - 1) {
                            li.addClass("tree-li-last");
                        } else if (i === 0) {
                            li.addClass("tree-li-first");
                        }


                        if (data[i].data.length > 0) {
                            li.addClass("has-children");
                            icon2.addClass("btn");
                            var ulC = $("<ul/>").appendTo(li);
                            creatDom(data[i].data, ulC);
                        } else {
                            icon.addClass("tree-btn-last");
                        }
                    }
                }


            }

            function postLink(scope, element, attrs) {
                console.log(scope.zwTree);
                var e = angular.element(element);
                var data = scope.zwTree;
                var ul = $('<ul class="zw-tree"></ul>').appendTo(e);

                if (scope.firstHide == "true") {
                    ul.addClass("first-hide");
                }
                function dbClick() {
                    var p = $(this).parent().parent().parent();
                    if (p.hasClass("minus")) {
                        p.children("ul").slideUp("fast", function () {
                            p.removeClass("minus");
                        });
                    } else {
                        p.addClass("minus").children("ul").slideDown("fast", function () {
                        });
                    }
                }

                function hover(event) {
                    $(this).parents(".hover").removeClass("hover");
                    if (event.type == 'mouseover') {
                        if ($(this).hasClass("hover")) {
                        } else {
                            $(this).addClass("hover");
                        }

                    } else {
                        $(this).removeClass("hover");
                    }
                    return false;
                }

                e.delegate(".btn", "click", dbClick);
                e.delegate("li", "mouseover mouseleave", hover);
                creatDom(data, ul);

            }


            return{
                post: postLink
            }
        }
    }
});

ngZw.controller('treeCtrl', ['$scope', function ($scope) {
    $scope.data = [
        {
            data: [
                {
                    data: [
                        {
                            data: [
                                {
                                    data: [],
                                    name: "解决",
                                    d1: 8,
                                    d2: 30
                                },
                                {
                                    data: [],
                                    name: "但覅偶像",
                                    d1: 4,
                                    d2: 10},
                                {
                                    data: [],
                                    name: "染发剂",
                                    d1: 9,
                                    d2: 40}
                            ],
                            name: "但是建设的经费",
                            d1: 19,
                            d2: 40
                        }
                    ],
                    name: "交费单",
                    d1: 4,
                    d2: 20
                },

                {
                    data: [],
                    name: "第三空间",
                    d1: 10,
                    d2: 50
                }
            ],
            name: "静静的思考",
            d1: 10,
            d2: 20
        },

        {
            data: [
                {
                    data: [
                        {
                            data: [
                                {
                                    data: [],
                                    name: "都发局",
                                    d1: 8,
                                    d2: 30
                                },
                                {
                                    data: [],
                                    name: "y6r",
                                    d1: 4,
                                    d2: 10},
                                {
                                    data: [],
                                    name: "是的撒是的",
                                    d1: 9,
                                    d2: 40}
                            ],
                            name: "非常VV下",
                            d1: 6,
                            d2: 20
                        }
                    ],
                    name: "交费单",
                    d1: 4,
                    d2: 20
                },

                {
                    data: [
                        {
                            data: [],
                            name: "收到就好",
                            d1: 6,
                            d2: 14
                        },
                        {
                            data: [],
                            name: "圣诞节",
                            d1: 23,
                            d2: 50},
                        {
                            data: [],
                            name: "6已经",
                            d1: 13,
                            d2: 40}
                    ],
                    name: "阿是的",
                    d1: 12,
                    d2: 20
                }
            ],
            name: "有理数",
            d1: 10,
            d2: 20
        },
        {
            data: [
                {
                    data: [
                        {
                            data: [],
                            name: "都发局",
                            d1: 8,
                            d2: 30
                        },
                        {
                            data: [],
                            name: "y6r",
                            d1: 4,
                            d2: 10},
                        {
                            data: [],
                            name: "是的撒是的",
                            d1: 9,
                            d2: 40}
                    ],
                    name: "非常VV下",
                    d1: 6,
                    d2: 20
                }
            ],
            name: "交费单",
            d1: 4,
            d2: 20
        },

        {
            data: [
                {
                    data: [
                        {
                            data: [],
                            name: "解决",
                            d1: 8,
                            d2: 30
                        },
                        {
                            data: [],
                            name: "但覅偶像",
                            d1: 4,
                            d2: 10},
                        {
                            data: [],
                            name: "染发剂",
                            d1: 9,
                            d2: 40}
                    ],
                    name: "但是建设的经费",
                    d1: 19,
                    d2: 40
                }
            ],
            name: "交费单",
            d1: 4,
            d2: 20
        },

        {
            data: [],
            name: "第三空间",
            d1: 10,
            d2: 50
        }
    ]
}]);
