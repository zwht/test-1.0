var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8888,'172.16.40.53');

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {

    socket.on('em', function (data) {
        console.log(data);
        socket.broadcast.emit('news', {hello: data,my:false});
        socket.emit('news', {hello: data,my:true});
    });
});