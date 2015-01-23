require.config({
    paths: {
        "d3": "../common/js/d3/d3"
    }
});

require(['d3'], function (d3) {

    //数据
    var data = Array.apply(0, Array(31)).map(function (item, i) {
        // 产生31条数据
        i++;
        return {date: (i < 10 ? '0' + i : i), pv: parseInt(Math.random() * 100)}
    });

    console.log(data);
    //创建SVG容器
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 1000,
        height = 500 - margin.top - margin.bottom;

    var container = d3.select('#lineChartSVG')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    var svg = container.append('g')
        .attr('class', 'content')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    //然后定义坐标轴的一些参数
    var x = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
            return d.date;
        }))
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function (d) {
            return d.pv;
        })])
        .range([height, 0]);

    //然后使用d3的axis定制坐标轴
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('top')
        .innerTickSize(height)
        .tickPadding(-height - 20)
        .outerTickSize(1)
        .ticks(30);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('right')
        .innerTickSize(width)
        .tickPadding(-width - 20)
        .outerTickSize(1)
        .ticks(10);

    // 横坐标
    svg.append('g')
        .attr('class', 'xAxisTicks')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        // 增加坐标值说明
        .append('text')
        .text('日期')
        .attr('transform', 'translate(' + width + ', 0)');
    // 纵坐标
    svg.append('g')
        .attr('class', 'yAxisTicks')
        .call(yAxis)
        .append('text')
        .text('次/天');

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.date)
        })
        .y(function (d) {
            return y(d.pv)
        })
        .interpolate('cardinal');

    var path = svg.append('path')
        .attr('class', 'line')
        .attr('d', line(data));


    var area = d3.svg.area()
        .x(function (d) {
            return x(d.date)
        })
        .y0(height)
        .y1(function (d) {
            return y(d.pv)
        })
        .interpolate('cardinal');

    var pathArea = svg.append('path')
        .attr('class', 'pathArea')
        .attr('d', area(data));


    var g = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('g')
        .append('circle')
        .attr('class', 'linecircle')
        .attr('cx', line.x())
        .attr('cy', line.y())
        .attr('r', 5)
        .on('mouseover', function () {
            d3.select(this).transition().duration(500).attr('r', 10);
        })
        .on('mouseout', function () {
            d3.select(this).transition().duration(500).attr('r', 5);
        });

    var tips = svg.append('g').attr('class', 'tips');

    tips.append('rect')
        .attr('class', 'tips-border')
        .attr('width', 200)
        .attr('height', 50)
        .attr('rx', 10)
        .attr('ry', 10);

    var wording1 = tips.append('text')
        .attr('class', 'tips-text')
        .attr('x', 10)
        .attr('y', 20)
        .text('');

    var wording2 = tips.append('text')
        .attr('class', 'tips-text')
        .attr('x', 10)
        .attr('y', 40)
        .text('');

    var conMusEvent = function () {
        container.on('mousemove', function () {
            var m = d3.mouse(this),
                cx = m[0] - margin.left;

            var x0 = x.invert(cx);
            var i = (d3.bisector(function (d) {
                return d.date;
            }).left)(data, x0, 1);

            var d0 = data[i - 1],
                d1 = data[i] || {},
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            function formatWording(d) {
                return '日期：' + (d.date);
            }

            wording1.text(formatWording(d));
            wording2.text('PV：' + d.pv);

            var x1 = x(d.date),
                y1 = y(d.pv);

            // 处理超出边界的情况
            var dx = x1 > width ? x1 - width + 200 : x1 + 200 > width ? 200 : 0;

            var dy = y1 > height ? y1 - height + 50 : y1 + 50 > height ? 50 : 0;

            x1 -= dx;
            y1 -= dy;

            d3.select('.tips')
                .attr('transform', 'translate(' + x1 + ',' + y1 + ')');

            d3.select('.tips').style('display', 'block');
        })
            .on('mouseout', function () {
                d3.select('.tips')
                    .style('display', 'none');
            });
    };
    conMusEvent();

    tips
        .on('mouseover', function () {
            tips.style('display', 'block');
            container.on('mousemove', null);

        })
        .on('mouseout', function () {
            conMusEvent();
        });

});

