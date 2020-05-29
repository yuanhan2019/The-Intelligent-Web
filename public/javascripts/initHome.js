/**
 * @init
 * This function is used to initialize the home page.
 *
 */

function init(){
    initDatabase();
    document.getElementById('username').innerHTML= JSON.parse(localStorage.user).username;
    document.getElementById('bio').innerHTML= JSON.parse(localStorage.user).bio;
//init stories parts
    $.ajax({
        url: '/initHome' ,
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

                initdatas(dataR);
                clearstoriesData();
               for(var i=0;i<dataR.length;i++){
                // //alert(dataR._id);
                userstoriesstoreCachedData(dataR[i]);
              }

                if (document.getElementById('offline_div')!=null)
                    document.getElementById('offline_div').style.display='none';
            },
        error: function (xhr, status, error) {
            showOfflineWarning();
            getCachedData();
            const dvv= document.getElementById('offline_div');
            if (dvv!=null)
                dvv.style.display='block';
        }
    });


}

/**
 * @initdatas
 * This function is used to initialize the 10 stories in the home page.
 * Assign each story with different unique ID.
 * The stories is read from database.
 *
 */
//Creat N Stories
function initdatas(dataR){
$(document).ready(function() {
    $("#wall").empty();
    var str='';
    var userid='';
    var storyid='';
    var scoreid='';
    var createatid='';
    var textid='';
    var imagepostid='';
    var deleteid='';
    var likesid='';
    var buttonid='';
    var socketEventid='';

    for(var i=0;i<dataR.length;i++){

        str='<div class="card p-4 mb-4">';
        str+='<p class="mb-3">';
        storyid="storyid"+i;
        str+=' <strong id="'+storyid+'"></strong>';
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
        str+='<div class="col-6">';
        scoreid="scoreid"+i;
        str+=' <strong>Score: </strong>';
        str+='<span id="'+scoreid+'" class="pl-3"></span>';
        str+='</div>';
        str+='<div class="col-6">';
        buttonid="button"+i;
        str+='<button id="'+buttonid+'" class="fas fa-heart text-danger"></button>';
        socketEventid="socketEvent"+i;
        str+='<i id="'+socketEventid+'">10</i>';
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
        $("#"+storyid+"").append(dataR[i].storyId);
        $("#"+scoreid+"").append(dataR[i].score);
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
    $(document).ready(function(){
         // If click on the tab-pane with specific component ID, the corresponding function will be enabled

        $(".tab-pane").on('click',function(event){
            var clickedButtonDOM=event.target;
            var id = clickedButtonDOM.getAttribute('id');
            var rateButton;
            var socketButton;
            var buttonIdx;
            var rateIdx;
            var socketIdx;
            var socketEvent;
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
            if(id.length>6){
                socketButton=id.substring(0,6);
                if(socketButton=="button"){
                    buttonIdx=id.substring(6,id.length);
                    socketIdx="button"+buttonIdx;
                    socketEvent="socketEvent"+buttonIdx;
                    var temp= parseInt($("#"+socketEvent).text());
                    temp+=1;
                    $("#"+socketEvent).text(temp);
                    console.log("Button: ", socketIdx);
                    socket.emit(socketIdx, { my: temp});
                }

            }
        });
    });
    // Socket oi receive from server to sycn the data.
    socket.on('sendToButton0', function (data) {
        $(document).ready(function(){
            $("#socketEvent0").text(data.data);
        });
    });
    socket.on('sendToButton1', function (data) {
        $(document).ready(function(){
            $("#socketEvent1").text(data.data);
        });
    });
    socket.on('sendToButton2', function (data) {
        $(document).ready(function(){
            $("#socketEvent2").text(data.data);
        });
    });
    socket.on('sendToButton3', function (data) {
        $(document).ready(function(){
            $("#socketEvent3").text(data.data);
        });
    });
    socket.on('sendToButton4', function (data) {
        $(document).ready(function(){
            $("#socketEvent4").text(data.data);
        });
    });
    socket.on('sendToButton5', function (data) {
        $(document).ready(function(){
            $("#socketEvent5").text(data.data);
        });
    });
    socket.on('sendToButton6', function (data) {
        $(document).ready(function(){
            $("#socketEvent6").text(data.data);
        });
    });
    socket.on('sendToButton7', function (data) {
        $(document).ready(function(){
            $("#socketEvent7").text(data.data);
        });
    });
    socket.on('sendToButton8', function (data) {
        $(document).ready(function(){
            $("#socketEvent8").text(data.data);
        });
    });
    socket.on('sendToButton9', function (data) {
        $(document).ready(function(){
            $("#socketEvent9").text(data.data);
        });
    });
});
}


/**
 * When the client gets off-line, it shows an off line warning to the user
 * so that it is clear that the data is stale
 */
window.addEventListener('offline', function(e) {
    // Queue up events for server.
    console.log("You are offline");
    showOfflineWarning();
}, false);

/**
 * When the client gets online, it hides the off line warning
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    console.log("You are online");
    hideOfflineWarning();
    //initdatas(dataR);
}, false);


function showOfflineWarning(){
    if (document.getElementById('offline_div')!=null)
        document.getElementById('offline_div').style.display='block';
}

function hideOfflineWarning(){
    if (document.getElementById('offline_div')!=null)
        document.getElementById('offline_div').style.display='none';
}













/*
$(document).ready(function() {
    // endless scrolling
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $("#wall").append("<div class='item'><img src='path/to/image' width='140' height='100' /></div>");
        }
    });
});*/
