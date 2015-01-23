var http=require("http")
    url=require("url");

function start(){

    function onRequset(requset,response){
        var pathName=url.parse(requset.url).pathname;
        console.log('requset for'+pathName+' received');
        response.writeHead(200,{'content-Type':'text/html'});
        response.write('<meta charset="utf-8"/>');
        response.write('<p>my first node project ! 00000000</p>');
        response.end();
    }
    http.createServer(onRequset).listen(8888);
    console.log('server started');
};

exports.start=start;