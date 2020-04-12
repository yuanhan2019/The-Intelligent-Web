var socket_io = require('socket.io');

var socketio = {};


socketio.getSocketio = function(server){ // http(s) server
    var io = socket_io.listen(server,{pingTimeout:10000});

    io.sockets.on('connection', function (socket) {

        console.log('a user connected');
        socket.emit('event01', { hello: 'world' });
        socket.on('event02', function (data) {
            console.log("event02" + JSON.stringify(data));
        });
        socket.on('event03', function (data) {
            console.log("event03" +JSON.stringify(data));
            socket.broadcast.emit('event04', { data: data.my });
        });
    })

};
module.exports = socketio;
