require.config({
    paths: {
        "d3": "../common/js/d3/d3.min"
    }
});

require(['d3'], function (d3) {
    console.log(d3);
    var data = [2, 3, 1, 4];

    var sum = function (data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i];
        }
        return sum;
    };
    var dataSum = sum(data);


    var width = 840,
        barHeight = 20;

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, width - 50]);

    var chart = d3.select(".bar-chart-svg")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * barHeight + ")";
        });

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function (d) {
            return x(d);
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) {
            return d;
        });
});