var socket_io = require('socket.io');

var socketio = {};


socketio.getSocketio = function(server){ // http(s) server
    var io = socket_io.listen(server,{pingTimeout:10000});

    io.sockets.on('connection', function (socket) {

        socket.on('event02', function (data) {
            socket.emit('event01', { hello: 'world' });
        });
        
    })

};
module.exports = socketio;
