var express=require('express'),
    path=require('path'),
    favicon=require('serve-favicon'),
    logger=require('morgan'),
    cookieParser=require('cookie-parser'),
    session=require("express-session"),
    MongoStore = require('connect-mongo')(session),
    settings = require('./settings'),
    bodyParser=require('body-parser'),
    app=express();
var routes=require('./routes/index'),
    users=require('./routes/users'),
    login=require('./routes/login'),
    //post=require('./routes/post'),
    //logout=require('./routes/logout'),
    reg=require('./routes/reg');





// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
//会话中间件，存放在mongodb中
app.use(session({
    secret:settings.cookieSecret,
    store:new MongoStore({
        db:settings.db
    })
}));
//使用中间件来返回成功和失败的信息
app.use(function(req, res, next){
    //声明变量
    var err = req.session.error
        , msg = req.session.success;
    //删除会话中原有属性
    delete req.session.error;
    delete req.session.success;
    //将错误和正确信息存放到动态试图助手变量中。
    res.locals.message = '';
    if (err) res.locals.message =  err;
    if (msg) res.locals.message =  msg;
    next();
});

app.use('/',routes);
app.use('/users',users);
app.use('/login',login);
app.use('/reg',reg);
//app.use('/post',post);
//app.use('/logout',logout);

// catch 404 and forward to error handler
app.use(function(req,res,next){
    var err=new Error('Not Found');
    err.status=404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if(app.get('env')==='development'){
    app.use(function(err,req,res,next){
        res.status(err.status||500);
        res.render('error',{
            message:err.message,
            error:err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err,req,res,next){
    res.status(err.status||500);
    res.render('error',{
        message:err.message,
        error:{}
    });
});
module.exports=app;
