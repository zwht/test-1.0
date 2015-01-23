angular.module('myApp', [])

    .factory('anchorScroll', function () {
        function toView(element, top, height) {
            var winHeight = $(window).height();

            element = $(element);
            height = height > 0 ? height : winHeight / 10;
            $('html, body').animate(
                {
                    scrollTop: top ? (element.offset().top - height) : (element.offset().top + element.outerHeight() + height - winHeight)
                },
                {
                    duration: 200,
                    easing: 'linear',
                    complete: function () {
                        if (!inView(element)) {
                            element[0].scrollIntoView(!!top);
                        }
                    }
                });

        }

        function inView(element) {
            element = $(element);

            var win = $(window),
                winHeight = win.height(),
                eleTop = element.offset().top,
                eleHeight = element.outerHeight(),
                viewTop = win.scrollTop(),
                viewBottom = viewTop + winHeight;

            function isInView(middle) {
                return middle > viewTop && middle < viewBottom;
            }

            if (isInView(eleTop + (eleHeight > winHeight ? winHeight : eleHeight) / 2)) {
                return true;
            } else if (eleHeight > winHeight) {
                return isInView(eleTop + eleHeight - winHeight / 2);
            } else {
                return false;
            }
        }

        return {
            toView: toView,
            inView: inView
        };
    })
    .controller('myCtrl', ['$scope', 'anchorScroll','$location', function ($scope, anchorScroll,$location) {
        $scope.data = [
            {
                "id": "1"
            },
            {
                "id": "2"
            },
            {
                "id": "3"
            },
            {
                "id": "4"
            },
            {
                "id": "5"
            },
            {
                "id": "6"
            },
            {
                "id": "7"
            }
        ];
        $scope.demo = function (target, id) {

            var clickThis = angular.element(target);


            clickThis.addClass('active').siblings().removeClass('active');
            anchorScroll.toView('#' + id, 50, 0);//参数1：对应ID，参数2：滚动距离到顶部高，参数3：height
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);

        };

        $(window).scroll(function () {

            var leftLi = $('.left').find('li');
            var scrollTop = parseInt($(document).scrollTop());

            //$('.left').find('li').eq(leftLi.length-1).height($(document).height());

            var leftLiTop = 0;
            var leftLiHeight = 0;
            var i = 0;
            for (i; i < leftLi.length; i++) {
                leftLiTop = leftLi.eq(i).offset().top;
                leftLiHeight = leftLi.eq(i).height();
                //console.log(leftLiTop);


                if (leftLiTop > scrollTop - 50 && leftLiTop < scrollTop + leftLiHeight - 50) {
                    $('.right').find('li').eq(i).addClass('active').siblings().removeClass('active');
                }


            }


        });
    }]);
