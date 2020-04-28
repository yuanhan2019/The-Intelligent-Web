function init(){
        var socket = io.connect();
        socket.on('event01', function (data) {
            socket.emit('event02', { my: 'data client' });

        });
    $(document).ready(function(){
        $("#button1").click(function(){
            var temp= parseInt($("#socketEvent1").text());
            temp+=1;
            $("#socketEvent1").text(temp);
            socket.emit('event03', { my: temp});

        });
    });

    socket.on('event04', function (data) {
            $(document).ready(function(){
                $("#socketEvent1").text(data.data);
            });
        });

    // var url = decodeURI(window.location.href);
    // var arr_para = url.split('?')[1].split('&');
    // var result = '';
    // for(var i = 0; i < arr_para.length; i++) {
    //     result += arr_para[i] + '<br>';
    // }

    document.getElementById('username').innerHTML= JSON.parse(localStorage.user).username;
}


$(document).ready(function() {
    // endless scrolling
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $("#wall").append("<div class='item'><img src='path/to/image' width='140' height='100' /></div>");
        }
    });
});
