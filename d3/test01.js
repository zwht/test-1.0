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

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 500]);

    var body = d3.select("body");
    body.selectAll("div")
        .data(data)
        .enter().append("div")
        .style("width", function (d) {
            return x(d) + "px";
        })
        .html(function (d) {
            var per = ((d / dataSum) * 100).toFixed(2);
            return per + '%';
        })

});