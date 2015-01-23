var ngZw = angular.module('ngZw', []);

ngZw.directive('zwTreeChart', function () {
    return{
        restrict: 'ECAM',
        replace: false,
        scope: {
            zwTreeChart: "=",
            id: "@"
        },
        compile: function (element, attrs) {


            function donutChart(paper, cx, cy, r, rin, data, color, big) {


                var d = setData(data),
                    dcolors = color,
                    values = d.values,
                    labels = d.labels,
                    stroke = dcolors,
                    datas = d.data,
                    rad = Math.PI / 180,
                    chart = paper.set(),
                    allP = paper.set(),
                    minP = paper.set();

                minP.push(paper.text(845, 205, "")).attr({"font-size": 14});
                minP.push(paper.text(845, 235, "")).attr({"font-size": 14});
                paper.text(665, 240, "").attr({"font-size": 18, "fill": "#98b57a"});
                paper.text(665, 215, "").attr({"font-size": 30, "fill": "#98b57a"});
                paper.path("");
                paper.path("M418,257c0,58.5-47.5,106-106,106c-45.5,0-84.4-28.7-99.4-69c-4.3-11.5-32.6-37-32.6-37s28.4-25.7,32.7-37.3c15.1-40.2,53.8-68.7,99.3-68.7C370.5,151,418,198.5,418,257z")
                    .transform("T410 -30s1.9")
                    .attr({"stroke-width":6,"stroke":"#eeeeee"})
                    .hide();

                function sector(cx, cy, r, startAngle, endAngle, value, label, params, j) {
                    var endAngle1 = startAngle + endAngle;
                    var endAngle2 = startAngle + endAngle / 2;
                    var cc = paper.set();

                    var x1 = cx + r * Math.cos(-startAngle * rad),
                        x2 = cx + r * Math.cos(-endAngle1 * rad),
                        x3 = (r + 20) * Math.cos(-endAngle2 * rad),
                        y1 = cy + r * Math.sin(-startAngle * rad),
                        y2 = cy + r * Math.sin(-endAngle1 * rad),
                        y3 = (r + 20) * Math.sin(-endAngle2 * rad),
                        xx1 = cx + rin * Math.cos(-startAngle * rad),
                        xx2 = cx + rin * Math.cos(-endAngle1 * rad),
                        yy1 = cy + rin * Math.sin(-startAngle * rad),
                        yy2 = cy + rin * Math.sin(-endAngle1 * rad);


                    var c = paper.path([
                        "M", xx1, yy1,
                        "L", x1, y1,
                        "A", r, r, 0, +(endAngle1 - startAngle > 180), 0, x2, y2,
                        "L", xx2, yy2,
                        "A", rin, rin, 0, +(endAngle1 - startAngle > 180), 1, xx1, yy1, "z"
                    ])
                        .attr(params)
                        .data({"d1": parseInt(endAngle2), "d2": parseInt(endAngle2), "index": j, "label": label, "value": Math.round(value), "params": params})
                        .attr({"title": (label + "→" + Math.round(value) + "%")});

                    var t=0;
                    if(big){
                         t = paper.text(cx, cy, (Math.round(value) + "%")).attr(params).attr({"font-size": "0"})
                            .animate({transform: "T" + x3 + "," + y3, "font-size": "20px"}, 400, "backOut");
                    }else{
                         t = paper.text(cx, cy, (Math.round(value) + "%")).attr(params).attr({"font-size": "0"})
                            .animate({transform: "T" + x3 + "," + y3, "font-size": "14px"}, 400, "backOut");
                    }
                    cc.push(c);
                    cc.push(t);
                    return cc;

                }

                var angle = 0,
                    total = 0,
                    start = 0,
                    process = function (j) {
                        var value = values[j],
                            label = labels[j],
                            angleplus = 360 * value / total,
                            popangle = angle + (angleplus / 2),
                            color = Raphael.hsb(start, 1, 1),
                            ms = 200,
                            delta = 25,

                            bcolor = stroke[j % stroke.length];
                        var p = sector(cx, cy, r, angle, angleplus, value, label, {fill: bcolor, stroke: stroke, "stroke-width": 3, "font-size": 18}, j);

                        // ************* //
                        angle += angleplus;
                        chart.push(p);
                        start += .1;
                    };

                for (var s = 0, ss = values.length; s < ss; s++) {
                    total += values[s];
                }
                for (i = 0; i < ss; i++) {
                    process(i);
                }

                var d1colors = ['#bdb47f', '#bd9c7f', '#77b18b'];
                if (big) {
                    for (var i = 0; i < chart.length; i++) {
                        chart[i][0].attr({"stroke-width":2,"stroke":"#FFF"}).click(function () {
                            allP.remove();
                            allP.clear();

                            paper.getById(2).attr({"text": this.data("label"),"fill":this.attrs.fill});
                            paper.getById(3).attr({"text": (this.data("value") + "%"),"fill":this.attrs.fill});
                            paper.getById(5).show();


                            var _thisTitle = this.data("d1");
                            var _thisStrokeOpacity = this.data("d2");


                            for (var k = 0; k < chart.length; k++) {
                                if(this.data("index")==k){
                                    chart[k][0].data({"active":_thisTitle});
                                }else{
                                    chart[k][0].data({"active":1000})
                                }
                                chart[k][1].remove();
                                chart[k].splice(1, 1);
                            }

                            for (var j = 0; j < chart.length; j++) {

                                chart[j][0].animate({transform: "r" + _thisTitle + ", 315, 225"}, 0, "backOut", function () {

                                    var t = this.data("d2") - _thisStrokeOpacity;
                                    t = t < 0 ? t + 360 : t;
                                    this.data({"d2": t});
                                    var x2 = (r + 20) * Math.cos(-this.data("d2") * rad),
                                        y2 = (r + 20) * Math.sin(-this.data("d2") * rad);

                                    if(this.data("active")!==1000){
                                        this.transform("R"+this.data("active")+", 315, 225T35 0");
                                        chart[this.data("index")].push(paper.text(325, 225, "")
                                                .attr(this.data("params"))
                                                .animate({transform: "T" + x2 + "," + y2, "font-size": "20px"}, 400, "backOut")
                                        );

                                    }else{
                                        chart[this.data("index")].push(paper.text(315, 225, (this.data("value") + "%"))
                                                .attr(this.data("params"))
                                                .animate({transform: "T" + x2 + "," + y2, "font-size": "20px"}, 400, "backOut")
                                        );
                                    }




                                })

                            }


                            if (datas[this.data("index")].length > 0) {
                                minP.show();

                                var v = donutChart(paper, 665, 225, 100, 85, datas[this.data("index")], d1colors, false);

                                allP.push(v);
                            } else {
                                minP.hide();
                                var t = paper.text(725, 225, "没有数据！");
                                allP.push(t);
                            }

                        })
                    }

                }
                else {
                    for (var j = 0; j < chart.length; j++) {
                        chart[j][0].attr({"stroke-width":4,"stroke":"#FFF"}).click(function () {
                            console.log(j);
                            var _thisTitle1 = this.data("d1");
                            var _thisIndex1 = this.data("index");
                            var _thisStrokeOpacity1 = this.data("d2");
                            paper.getById(0).attr({"text": chart[_thisIndex1][0].data("label"),"fill":this.attrs.fill});
                            paper.getById(1).attr({"text": (chart[_thisIndex1][0].data("value") + "%"),"fill":this.attrs.fill});

                            for (var k = 0; k < chart.length; k++) {
                                chart[k][1].remove();
                                chart[k].splice(1, 1);
                            }
                            chart.animate({transform: "r" + _thisTitle1 + ", 665, 225"}, 1500, "backOut", function () {



                                for (var z = 0; z < chart.length; z++) {

                                    var t = chart[z][0].data("d2") - _thisStrokeOpacity1;
                                    //t = t < 0 ? t + 360 : t;
                                    chart[z][0].data({"d2": t});

                                    var x2 = (r + 20) * Math.cos((-t) * rad),
                                        y2 = (r + 20) * Math.sin((-t) * rad);

                                    if (_thisIndex1 !== z) {
                                        chart[z].push(paper.text(cx, cy, (chart[z][0].data("value") + "%"))
                                                .attr(chart[z][0].data("params"))
                                                .animate({transform: "T" + x2 + "," + y2, "font-size": "14px"}, 400, "backOut")
                                        );
                                    } else {
                                        chart[z].push(paper.text(cx, cy, "").attr(chart[z][0].data("params")));
                                    }

                                }
                            });

                        })

                    }
                    chart[0][1].hide();
                    paper.getById(0).attr({"text": chart[0][0].data("label"),"fill":chart[0][0].attrs.fill});
                    paper.getById(1).attr({"text": (chart[0][0].data("value") + "%"),"fill":chart[0][0].attrs.fill});
                    paper.getById(4).attr({"path": "M773 225L910 225","stroke":chart[0][0].attrs.fill});

                    var e = document.createEvent("MouseEvents");
                    e.initEvent("click", true, true);
                    //chart[0][0].dispatchEvent(e);

                    //chart[0][0].click();

                    //console.log(chart[0][0].id);
                    //console.log(document.getElementById(chart[0][0].id))
                }




                return chart;
            }

            function setData(d, paper) {
                var j = {
                    values: [],
                    labels: [],
                    tims: [],
                    timeAll: 0,
                    data: []
                };
                $.each(d, function (i, val) {
                    j.timeAll += val.d1;
                });
                $.each(d, function (i, val) {
                    j.values.push(val.d1 / j.timeAll * 100);
                    j.tims.push(val.d1);
                    j.labels.push(val.name);
                    j.data.push(val.data);
                });
                return j;
            }

            function postLink(scope, element, attrs) {

                var paper = Raphael(scope.id, 1200, 450);
                var color = ['#7a9eb5', '#ff9d9d', '#b59a7a', '#adc493'];
                var data = scope.zwTreeChart;
                var big = donutChart(paper, 315, 225, 110, 0, data, color, true);


            }

            return{
                post: postLink
            }
        }
    }
});

ngZw.controller('treeChartCtrl', ['$scope', function ($scope) {
    $scope.data = [
        {
            data: [
                {
                    data: [],
                    name: "基本概论错误",
                    d1: 20
                },
                {
                    data: [],
                    name: "公式错误",
                    d1: 30
                },
                {
                    data: [],
                    name: "定理，准则错误",
                    d1: 50
                }
            ],
            name: "结论错误",
            d1: 59
        },
        {
            data: [
                {
                    data: [],
                    name: "的股份规范规定",
                    d1: 23
                },
                {
                    data: [],
                    name: "公式错误",
                    d1: 467
                },
                {
                    data: [],
                    name: "定理，但官方公告",
                    d1: 45
                }
            ],
            name: "马虎错误",
            d1: 31
        },
        {
            data: [
                {
                    data: [],
                    name: "的方式发送",
                    d1: 290
                },
                {
                    data: [],
                    name: "滚动",
                    d1: 23
                },
                {
                    data: [],
                    name: "更多的",
                    d1: 45
                }
            ],
            name: "解方程（组）错误",
            d1: 22
        },
        {
            data: [
                {
                    data: [],
                    name: "dsdfssdf",
                    d1: 21
                },
                {
                    data: [],
                    name: "对方感受到的风格",
                    d1: 80
                },
                {
                    data: [],
                    name: "定理，动感时尚风格撒点粉",
                    d1: 34
                }
            ],
            name: "大错特错",
            d1: 47
        }
    ];
}]);
