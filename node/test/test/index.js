var MongoClient = require('mongodb').MongoClient,
    http = require('http'),
    format = require('util').format;


http.createServer(function (req, res) {
    res.writeHead(200, {'content-Type': 'text/html'});
    var data=MongoClient.connect('mongodb://172.16.1.69:27017/zw', function (err, db) {
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

                    return results;
                    db.close();
                });
            });
    });
    //res.write(data);
    res.end('<p>end</p>');
}).listen(3000, '172.16.1.69');


