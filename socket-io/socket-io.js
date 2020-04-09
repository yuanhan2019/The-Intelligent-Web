var socket_io = require('socket.io');

var socketio = {};


socketio.getSocketio = function(server){ // http(s) server
    var io = socket_io.listen(server);

    io.sockets.on('connection', function (socket) {

        console.log('a user connected');
        socket.emit('event01', { hello: 'world' });
        socket.on('event02', function (data) {

            console.log("event02" + data);

        });

    })

};
module.exports = socketio;
