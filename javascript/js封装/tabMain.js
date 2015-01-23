require.config({
    paths: {
        zQ: '../../common/js/my/zQuery'
    }
});
require(['zQ'], function (zQ) {

    var oLi = zQ.getByClass('li');
    var oTop = zQ.getByClass('top');

    console.log(oLi.length + '-----' + oTop[0]);

    for (var i = 0; i < oTop.length; i++) {
        oTop[i].index = i;
        oTop[i].onclick = function () {

            for (var j = 0; j < oTop.length; j++) {
                zQ.css(oTop[j], 'background', '');
                zQ.css(oLi[j], 'display', 'none');
            }
            zQ.css(this, 'background', 'red');
            zQ.css(oLi[this.index], 'display', 'block');
        }
    }
});