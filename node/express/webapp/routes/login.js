var express=require("express"),
    router=express.Router();

router.get("/",function(request,response,next){
    response.render("login",{title:"user login",userName:'zw'})
});

module.exports=router;