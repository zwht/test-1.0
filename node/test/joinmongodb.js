/*
 var mongodb = require('mongodb');

 var server = new mongodb.Server("172.16.1.69", 27017, {}); //本地27017端口

 new mongodb.Db('zw', server, {})
 .open(function (error, client) {//数据库：test//    if (error) throw error;

 var collection = new mongodb.Collection(client, 'blog'); //表：Messages
 collection.find(function (error, cursor) {
 //console.log(error);
 cursor.each(function (error, doc) {
 if (doc) {
 console.log(doc);
 }
 });
 });
 });*/

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://172.16.1.69:27017/zw', function (err, db) {
    if (err) throw err;

    var collection = db.collection('blog');
    collection.insert({a: 2},
        function (err, docs) {

            collection.count(function (err, count) {
                //console.log(format("count = %s", count));
            });

            // Locate all the entries using find
            collection.find().toArray(function (err, results) {
                console.dir(results);
                // Let's close the db
                db.close();
            });
        });
    /*collection.update({"name":"zw"},{$set:{"title":"fuck you!"}},function (err, docs) {

     collection.find().toArray(function (err, results) {
     console.dir(results);
     // Let's close the db
     db.close();
     });
     });*/
    /*collection.remove({a:2},function(err, docs) {

     collection.find().toArray(function (err, results) {
     console.dir(results);
     // Let's close the db
     db.close();
     });
     })*/
});


/*
var mongodb = require("mongodb");

var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});

var db = new mongodb.Db("test",server,{safe:false});

db.open(function(err,db){
    if(err){
        console.log(err);
        return false;
    }
    console.log("We are connected!");
    db.collection('test',{safe:true},function(err,collection){
        collection.find({unique:{"$exists":true}}).toArray(function(err,items){
            if(err){
                console.log(err);
                return false;
            }
            for(item in items) console.log(items[item]);
            process.exit();
        });
    });
});  */
