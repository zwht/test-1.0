var http=require("http"),
    url=require("url"),
    util=require("util");
http.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});

    response.end(util.inspect(url.parse(request.url,true)));
}).listen(8888,'localhost');