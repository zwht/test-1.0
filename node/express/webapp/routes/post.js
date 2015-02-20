var express=require("express"),
    router=express.router();
router.on("post",function(request,responce,text){
    request.send({});
});

module.exports=router;