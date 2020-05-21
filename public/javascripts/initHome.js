function init(){
    // var url = decodeURI(window.location.href);
    // var arr_para = url.split('?')[1].split('&');
    // var result = '';
    // for(var i = 0; i < arr_para.length; i++) {
    //     result += arr_para[i] + '<br>';
    // }
    //init end front
    document.getElementById('username').innerHTML= JSON.parse(localStorage.user).username;
    document.getElementById('bio').innerHTML= JSON.parse(localStorage.user).bio;
//init stories parts
    $.ajax({
        url: 'initHome' ,
        data: {
            username:JSON.parse(localStorage.user).username
        },
        dataType: 'json',
        type: 'POST',
        success:
            function (dataR) {
                // no need to JSON parse the result, as we are using
                // dataType:json, so JQuery knows it and unpacks the
                // object for us before returning it

                // in order to have the object printed by alert
                // we need to JSON stringify the object
                initdatas(dataR);
            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });


}


//Creat N Stories
function initdatas(dataR){
$(document).ready(function() {
    $("#wall").empty();
    var str='';
    var userid='';
    var createatid='';
    var textid='';
    var imagepostid='';
    var deleteid='';
    var likesid='';



    for(var i=0;i<dataR.length;i++){

        str='<div class="card p-4 mb-4">';
        str+='<p class="mb-3">';
        userid="userid"+i;
        str+=' <strong id="'+userid+'"></strong>';
        createatid="createatid"+i;
        str+='<span id="'+createatid+'" class="pl-3"></span>';
        str+='</p>';
        textid="textid"+i;
        str+='<p id="'+textid+'"class="lead mb-3">';
        str+='</p>';
        str+='<div class="row justify-content-center mb-3">';
        str+='<div class="col-sm-12 col-md-4 center mb-2">';
        imagepostid="imagepostid"+i;
        str+=' <img id="'+imagepostid+'1" class="img-post" src="">';
        str+='</div>';
        str+=' <div class="col-sm-12 col-md-4 center mb-2">';
        str+=' <img id="'+imagepostid+'2" class="img-post" src="">';
        str+='</div>';
        str+='<div class="col-sm-12 col-md-4 center mb-2">';
        str+='<img id="'+imagepostid+'3" class="img-post" src="">';
        str+='</div>';
        str+='</div>';
        str+=' <div class="row justify-content-between">';
        str+='<div class="col-2">';
        str+=' <i class="fas fa-trash"></i>';
        str+='</div>';
        str+='<div class="col-6">';
        str+='<button id="button1" class="fas fa-heart text-danger"></button>';
        str+='<i id="socketEvent1">10</i>';
        str+='<input type="text" id="rating'+i+'" list="ratingList">';
        str+='<datalist id="ratingList">';
        str+='<option value="1"> 1';
        str+='<option value="2"> 2';
        str+='<option value="3"> 3';
        str+='<option value="4"> 4';
        str+='<option value="5"> 5';
        str+='</datalist>';
        str+='<button id="ratingSubmit'+i+'">Rate</button>';
        str+='</div>';
        str+='</div>';
        str+='</div>';

        $("#wall").append(str);
        $("#"+userid+"").append(dataR[i].username);
        $("#"+createatid+"").append(dataR[i].createAt);
        $("#"+textid+"").append(dataR[i].text);
        $("#"+imagepostid+"1").attr("src",dataR[i].userImage1);
        $("#"+imagepostid+"2").attr("src",dataR[i].userImage2);
        $("#"+imagepostid+"3").attr("src",dataR[i].userImage3);
    }
    var stradd='';
    stradd+='<div class="mt-3">';
    stradd+='<button class="btn " data-toggle="modal" data-target="#exampleModal">';
    stradd+='<i class="fas fa-plus-circle" style="color: #1d2124;"></i>';
    stradd+='add new story';
    stradd+='</button>';
    stradd+='</div>';
    $("#wall").append(stradd);

//init socket parts

    var socket = io.connect();
    socket.on('event01', function (data) {
        socket.emit('event02', { my: 'data client' });

    });
    $(document).ready(function(){
        $("#button1").click(function(){
            var temp= parseInt($("#socketEvent1").text());
            temp+=1;
            alert("socketIO");
            $("#socketEvent1").text(temp);
            socket.emit('event03', { my: temp});

        });

        $(".tab-pane").on('click',function(event){
            var clickedButtonDOM=event.target;
            var id = clickedButtonDOM.getAttribute('id');
            var rateButton;
            var buttonIdx;
            var rateIdx;
            var data={};
            if(id.length>12) {
                rateButton = id.substring(0,12);
                if(rateButton=="ratingSubmit"){
                    buttonIdx=id.substring(12,id.length);
                    rateIdx="rating"+buttonIdx;
                    if($("#"+rateIdx).val().length==0){
                        alert("The rate cannot be empty!");
                    }else if($("#"+rateIdx).val()!='') {
                        data["username"] = $("#username").text();
                        data["story"] = $("#username").text();
                        data["rating"] = $("#"+rateIdx).val();
                        onRatingSubmit(data);
                    }
                }
            }

            //alert(id);
        });
    });



    socket.on('event04', function (data) {
        $(document).ready(function(){
            $("#socketEvent1").text(data.data);
        });
    });
});
}
/*














/*
$(document).ready(function() {
    // endless scrolling
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $("#wall").append("<div class='item'><img src='path/to/image' width='140' height='100' /></div>");
        }
    });
});*/
