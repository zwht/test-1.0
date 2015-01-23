require.config({
    paths: {
        zQuery: '../../common/js/my/zQuery'
    }
});

require(['zQuery'], function (zQ) {
    var oDiv = document.getElementsByTagName('div')[0];
    var width = zQ.css(oDiv, 'width');


    zQ.css(oDiv, 'width', '500px');


    for (var i = 0; i < zQ.getByClass('div').length; i++) {
        zQ.css(zQ.getByClass('div')[i], 'background', 'red')

    }

    function aa() {
        alert(111)
    }

    zQ.startMove(oDiv, {width: '1200', opacity: '0'}, aa);

});