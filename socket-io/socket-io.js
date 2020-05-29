var socket_io = require('socket.io');

var socketio = {};


socketio.getSocketio = function(server){ // http(s) server
    var io = socket_io.listen(server,{pingTimeout:10000});

    io.sockets.on('connection', function (socket) {

        console.log('a user connected');
        socket.on('button1', function (data) {
            console.log("button1" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton1', { data: data.my });
        });
    })

};
module.exports = socketio;
