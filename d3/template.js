require.config({
    paths: {
        "d3": "../common/js/d3/d3.min"
    }
});

require(['d3'], function (d3) {
    console.log(d3);
    var body = d3.select("body");
    var div = body.append("div");
    div.html("Hello, world!");
});