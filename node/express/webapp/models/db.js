var settings=require("../settings"),
    Connection=require("mongodb").Connection;

console.log("mongodb part:"+Connection.DEFAULT_PORT);

var mongodb =require('mongodb');
var server = new mongodb.Server(settings.host, Connection.DEFAULT_PORT, {auto_reconnect:true});
module.exports= new mongodb.Db(settings.db, server, {safe:true});
