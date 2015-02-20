var http=require("http");

var server=http.createServer(createServer);
function createServer(request,response){

    response.writeHead(200,{"Content-Type":"text/html"});

    response.write('<div>主体内容！</div>',['utf-8']);

    response.end("<div>响应结束！</div>",['utf-8']);
}

server.listen(8888,'localhost');
server.on("connection",function(){
    console.log("service connection!");

});
server.on("close",function(){
    console.log("server close!");
});

setTimeout(function(){
    //server.close();
},100);
console.log("http server is listen at port '8888'.");