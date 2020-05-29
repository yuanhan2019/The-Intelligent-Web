var socket_io = require('socket.io');

var socketio = {};

/**
 * @getSocketio
 * This functionality is to define the server part of sockoi, which will receive the 'likes' from clients.
 * Then broadcast to all of the client to achieve synchronize
 *
 *
 */
socketio.getSocketio = function(server){ // http(s) server
    var io = socket_io.listen(server,{pingTimeout:10000});

    io.sockets.on('connection', function (socket) {

        console.log('a user connected');
        socket.on('button0', function (data) {
            console.log("button0" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton0', { data: data.my });
        });
        socket.on('button1', function (data) {
            console.log("button1" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton1', { data: data.my });
        });
        socket.on('button2', function (data) {
            console.log("button2" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton2', { data: data.my });
        });
        socket.on('button3', function (data) {
            console.log("button3" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton3', { data: data.my });
        });
        socket.on('button4', function (data) {
            console.log("button4" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton4', { data: data.my });
        });
        socket.on('button5', function (data) {
            console.log("button5" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton5', { data: data.my });
        });
        socket.on('button6', function (data) {
            console.log("button6" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton6', { data: data.my });
        });
        socket.on('button7', function (data) {
            console.log("button7" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton7', { data: data.my });
        });
        socket.on('button8', function (data) {
            console.log("button8" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton8', { data: data.my });
        });
        socket.on('button9', function (data) {
            console.log("button9" +JSON.stringify(data));
            socket.broadcast.emit('sendToButton9', { data: data.my });
        });
    })

};
module.exports = socketio;
