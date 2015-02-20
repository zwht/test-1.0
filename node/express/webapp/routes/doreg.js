var express=require("express"),
    router=express(),
    crypto=require("crypto"),
    User=require("../models/User");
/**
 * 注册操作
 * @param request
 * @param response
 * @return {*}
 * */
router.post("/",function(request,response){
    //检验用户两次输入的密码是否一致
    console.log(11111);
    if(request.body['password-repeat']!==request.body['password']){
        req.session.error="两次输入密码不一致";
        return response.redirect("/reg");
    }
    //生成密码的散列值，我们使用md5加密
    var md5=crypto.createHash('md5');
    var password=md5.update(request.body.password).digest("base64");
    //声明需要添加的用户
    var newUser=new User({
        name:request.body.username,
        password:password
    });
    User.find(newUser.name,function(err,user){
        //如果用户已经存在
        if(user){
            request.session.error="该用户已经存在";
            return response.redirect("/reg");
        }
        //如果不存在则添加用户
        newUser.save(function(err){
            if(err){
                request.session.error=err;
                return response.redirect("/reg");
            }
            request.session.user=newUser;
            request.session.success="注册成功";
            response.locals.user=newUser;
            response.redirect('/');
        })
    })
});


module.exports=router;