var http=require("http"),
    url=require("url"),
    querystring=require("querystring");
//start server
http.createServer(function(request,response){

    console.log("client request got to!");
    //parse POST request
    var post="";
    request.on("data",function(chunk){
        post+=chunk;
    });
    request.on("end",function(){
        //post=querystring.parse(post);
        //parse finish
        console.log("service parse finish!");
        response.end(post);
    });

}).listen(3000);

//client request string set(name=zw&age=25&address=chengduo)
var contents=querystring.stringify({
    name:"zw",
    age:25,
    address:"chengduo"
});
//statement request argument
var options={
    host:"localhost",
    path:"/",
    port:3000,
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-from-urlencoded",
        "Content-Length":contents.length
    }
};
//emitter request
var request=http.request(options,function(response){

    response.setEncoding("utf-8");
    response.on("data",function(data){
        console.log("service back data!");
        data=querystring.parse(data);
        console.log(data)
    })

});
request.write(contents);
//must code
request.end();

console.log("server is listen at port 3000 and host localhost");
