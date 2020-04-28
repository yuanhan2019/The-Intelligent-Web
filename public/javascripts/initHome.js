function init( ){

    $.ajax({
        url: '/initHome',
        async: true,
        dataType: 'json',
        type: 'GET',
        success:
            function (dataR) {
                // no need to JSON parse the result, as we are using
                // dataType:json, so JQuery knows it and unpacks the
                // object for us before returning it

                // in order to have the object printed by alert
                // we need to JSON stringify the object
                //window.location.href=encodeURI('/home?'+dataR[0].username);
                $(document).ready(function () {
                    $("#post1").attr("src",dataR[0].userImage1);
                    $("#post2").attr("src",dataR[0].userImage2);
                    $("#post3").attr("src",dataR[0].userImage3);
                });

            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            //document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });




    /****socket parts*****/
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

    var url = decodeURI(window.location.href);
    var arr_para = url.split('?')[1].split('&');
    var result = '';
    for(var i = 0; i < arr_para.length; i++) {
        result += arr_para[i] + '<br>';
    }
    document.getElementById('username').innerHTML= result;

}






$(document).ready(function() {
    // endless scrolling
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $("#wall").append("  <div class=\"card p-4 mb-4\">\n" +
                "                            <p class=\"mb-3\">\n" +
                "                                <strong>username</strong>\n" +
                "                                <span class=\"pl-3\">22/2/2020 08:20 pm</span>\n" +
                "                            </p>\n" +
                "\n" +
                "                            <p class=\"lead mb-3\">\n" +
                "                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem\n" +
                "                                Ipsum has been the industry's standard dummy text ever since the 1500s\n" +
                "                            </p>\n" +
                "\n" +
                "                            <div class=\"row justify-content-center mb-3\">\n" +
                "                                <div class=\"col-sm-12 col-md-4 center mb-2\">\n" +
                "                                    <img class=\"img-post\" src=\"/images/post1.jpg\">\n" +
                "                                </div>\n" +
                "\n" +
                "                                <div class=\"col-sm-12 col-md-4 center mb-2\">\n" +
                "                                    <img class=\"img-post\" src=\"/images/post2.jpg\">\n" +
                "                                </div>\n" +
                "\n" +
                "\n" +
                "                                <div class=\"col-sm-12 col-md-4 center mb-2\">\n" +
                "                                    <img class=\"img-post\" src=\"/images/post3.jpg\">\n" +
                "                                </div>\n" +
                "                            </div> <div class=\"row justify-content-between\">\n" +
                "                                <div class=\"col-2\">\n" +
                "                                    <i class=\"fas fa-trash\"></i>\n" +
                "                                </div>\n" +
                "\n" +
                "                                <div class=\"col-6\">\n" +
                "                                    <i class=\"fas fa-heart text-danger\"></i> (10)\n" +
                "                                    <i class=\"far fa-grin-squint text-warning\"></i> (15)\n" +
                "                                    <i class=\"far fa-sad-tear text-warning\"></i> (12)\n" +
                "\n" +
                "                                    <i class=\"far fa-angry text-warning\"></i> (11)\n" +
                "\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "\n" +
                "                        </div>");
        }
    });
});
