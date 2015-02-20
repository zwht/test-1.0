var http=require("http"),
    url=require("url"),
    util=require("util");

//start server
http.createServer(function(request,respons){
    console.log("request go to!");
    var params=url.parse(request.url,true);
    console.log("parse finish!");
    //console.log(util.inspect(params));
    console.log("emitter data to client");
    console.log(request.url);
    respons.end(params.query.name);

}).listen(3000);
//client request
var request=http.get({
    host:"localhost",
    path:"/user?name=zw&age=25",
    port:3000},function(response){
    response.setEncoding("utf-8");
    response.on("data",function(data){
        console.log("server back data="+data);
    });

});

console.log("server is listen at port 3000 and host localhost");
