define([], function () {

    /**
     * 获取或者设置节点样式方法css方法
     * */
    var getStyle = function (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    };
    var css = function (obj, attr, value) {
        if (arguments.length == 2) {
            //获取样式
            return getStyle(obj, attr);
        } else if (arguments.length == 3) {
            //获取样式
            obj.style[attr] = value;
        }
    };
    var getByClass = function () {
        var aResult = [];
        var aEle = [];
        var cls = '';
        if (arguments.length == 1) {
            aEle = document.getElementsByTagName('*');
            cls = arguments[0];

        } else {
            aEle = arguments[0].getElementsByTagName('*');
            cls = arguments[1];
        }
        for (var i = 0; i < aEle.length; i++) {
            if (aEle[i].className == cls) {
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    };
    var startMove = function (obj, json, fn) {

        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var bStop = true;
            for (var attr in json) {
                //1、取当前的值
                var iCur = 0;
                if (attr == 'opacity') {
                    iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    iCur = parseInt(getStyle(obj, attr));
                }
                //2、算速度
                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                //3、检查停止
                if (iCur != json[attr]) {
                    bStop = false;
                }
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }

            //关闭定时器
            if (bStop) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 30);
    };

    /**
     * zQ返回接口
     * */
    return{
        css: css,//2个参数是获取，3个参数是设置
        getByClass: getByClass,//可以只传className，也可以传父节点和className
        startMove: startMove//参数1对象，参数2json，参数3回调函数
    };
});

