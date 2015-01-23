;
(function ($) {
    $.extend({
        'foucs': function (con) {
            var $container = $('#fullbanner')
                , $imgs = $container.find('li.plan')
                , $leftBtn = $container.find('a.prev')
                , $rightBtn = $container.find('a.next')
                , config = {
                    interval: con && con.interval || 5000,
                    animateTime: con && con.animateTime || 500,
                    direction: con && (con.direction === 'right'),
                    height: con && con.height || $container.parent().height(),
                    width: con && con.width || $container.parent().width(),
                    _imgLen: $imgs.length
                }
                , i = 0
                , getNextIndex = function (y) {
                    return i + y >= config._imgLen ? i + y - config._imgLen : i + y;
                }
                , getPrevIndex = function (y) {
                    return i - y < 0 ? config._imgLen + i - y : i - y;
                }
                , silde = function (d) {
                    $imgs.eq((d ? getPrevIndex(2) : getNextIndex(2))).css('left', (d ? -config.width * 2 + 'px' : config.width * 2 + 'px'));
                    $imgs.animate({
                        'left': (d ? '+' : '-') + '=' + config.width + 'px'
                    }, config.animateTime);
                    i = d ? getPrevIndex(1) : getNextIndex(1);
                }
                , s = setInterval(function () {
                    silde(config.direction);
                }, config.interval);


            $container.css({ width: config.width, height: config.height});
            $container.find('.plan').css({ width: config.width, height: config.height});
            $container.find('.mask-left').css({ width: config.width, height: config.height, left: config.width});
            $container.find('.mask-right').css({ width: config.width, height: config.height, left: -config.width});


            $container.mouseover(function () {
                $leftBtn.css({display: "block"});
                $rightBtn.css({display: "block"});
            });
            $container.mouseleave(function () {
                $leftBtn.css({display: "none"});
                $rightBtn.css({display: "none"});
            });
            $imgs.eq(i).css('left', 0).end().eq(i + 1).css('left', config.width + 'px').end().eq(i - 1).css('left', -config.width + 'px');
            $container.find('.wrappic').add($leftBtn).add($rightBtn).hover(function () {
                clearInterval(s);
            }, function () {
                s = setInterval(function () {
                    silde(config.direction);
                }, config.interval);
            });
            $leftBtn.click(function () {
                if ($(':animated').length === 0) {
                    silde(false);
                }
            });
            $rightBtn.click(function () {
                if ($(':animated').length === 0) {
                    silde(true);
                }
            });
        }
    });
}(jQuery));