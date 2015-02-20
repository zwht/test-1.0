var http=require("http"),
    querystring=require("querystring"),
    util=require("util");
http.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});

    var post="";
    //注册data监听函数，当得到请求体时触发回调函数
    request.on('data',function(chunk){
        post+=chunk;
    });
    request.on("end",function(){
        //把请求内容解析为json字符串类型
        post=querystring.parse(post);

        //把post解析为json对象形式输出
        response.end(util.inspect(post))
    });



}).listen(8888);