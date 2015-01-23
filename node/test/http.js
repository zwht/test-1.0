var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'content-Type':'text/html'});
    res.write('<h1>my first http server</h1>');
    res.end('<p>输出结1束HTTP服务</p>');
}).listen(3000,'172.16.1.69');