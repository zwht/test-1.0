var mongodb=require("./db");
function User(user){
    this.name=user.name;
    this.password=user.password;
}
User.find=function(username,callback){
    mongodb.open(function(err,db){

        if(err){
            return callback(err);
        }

        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            //查询name属性为usename的文档
            collection.findOne({name:username},function(err,doc){
                mongodb.close();
                if(doc){
                    //封装文档为User对象
                    var user=new User(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
            })
        })
    })
};
//将User类给予接口
module.exports=User;
/**
 * 使用原型增加保存方法
 * @param callback
 * */
User.prototype.save=function save(callback){
    //存入mongodb文档
    var user={
        name:this.name,
        password:this.password
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取users机会
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //为name属性增加索引
            collection.ensureIndex("name",{unique:true});
            //写入User文档
            collection.insert(user,{safe:true},function(err){
                console.log("创建成功！");
                mongodb.close();
            })
        });
    })
};