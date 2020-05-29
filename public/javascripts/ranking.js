function sendRankingAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success:
            function (dataR) {
                // no need to JSON parse the result, as we are using
                // dataType:json, so JQuery knows it and unpacks the
                // object for us before returning it
                var ret = dataR;
                var stories={};
                stories['storyId']=dataR[0].story;
                initstoriesdatas(dataR);
                document.getElementById('ranking_results').innerHTML= "10 recommendations has been displayed below!";
            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            //document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });
}


function onRankingSubmit(url) {
    var data={};
    data["ranking_name"]= $("#ranking_name").val();
    //const data = JSON.stringify($(this).serializeArray());
    sendRankingAjaxQuery(url, data);
    event.preventDefault();
}
/**upload ranking file**/
$(document).ready(function () {
    $(function(){
        $(".ranking_file").change(function(){
            var selectedFile =this.files[0];
            var reader = new FileReader();
            reader.readAsText(selectedFile);

            reader.onload = function(){
                //console.log("results：", this.result['users']);

                console.log("JSON：");
                let json = JSON.parse(this.result);
                //console.log(json);
                var data={};
                var data1={};
                data['users']=json['users'];
                data['stories']=json['stories'];
                sendRankingAjaxQuery('/ranking',data);

            };
        });


    });
});


//Creat N Stories
function initstoriesdatas(dataR){
    $(document).ready(function() {
        $("#stories").empty();
        var str='';
        var userid='';
        var storyid='';
        var scoreid='';
        var createatid='';
        var textid='';
        var imagepostid='';
        var deleteid='';
        var likesid='';



        for(var i=0;i<dataR.length;i++){

            str='<div class="card p-4 mb-4">';
            str+='<p class="mb-3">';
            storyid="allstoryid"+i;
            str+=' <strong id="'+storyid+'"></strong>';
            userid="alluserid"+i;
            str+=' <strong id="'+userid+'"></strong>';
            createatid="allcreateatid"+i;
            str+='<span id="'+createatid+'" class="pl-3"></span>';
            str+='</p>';
            textid="alltextid"+i;
            str+='<p id="'+textid+'"class="lead mb-3">';
            str+='</p>';
            str+='<div class="row justify-content-center mb-3">';
            str+='<div class="col-sm-12 col-md-4 center mb-2">';
            imagepostid="allimagepostid"+i;
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
            scoreid="allscoreid"+i;
            str+=' <strong>Score: </strong>';
            str+='<span id="'+scoreid+'" class="pl-3"></span>';
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

            $("#stories").append(str);
            $("#"+userid+"").append(dataR[i].username);
            $("#"+storyid+"").append(dataR[i].storyId);
            $("#"+scoreid+"").append(dataR[i].score);
            $("#"+createatid+"").append(dataR[i].createAt);
            $("#"+textid+"").append(dataR[i].text);
            $("#"+imagepostid+"1").attr("src",dataR[i].userImage1);
            $("#"+imagepostid+"2").attr("src",dataR[i].userImage2);
            $("#"+imagepostid+"3").attr("src",dataR[i].userImage3);
        }

//init socket parts

        // var allsocket = io.connect();
        // allsocket.on('event01', function (data) {
        //     allsocket.emit('event02', { my: 'data client' });
        //
        // });
        // $(document).ready(function(){
        //     $("#button1").click(function(){
        //         var temp= parseInt($("#socketEvent1").text());
        //         temp+=1;
        //         alert("socketIO");
        //         $("#socketEvent1").text(temp);
        //         socket.emit('event03', { my: temp});
        //
        //     });
        //
        //     $(".tab-pane").on('click',function(event){
        //         var clickedButtonDOM=event.target;
        //         var id = clickedButtonDOM.getAttribute('id');
        //         var rateButton;
        //         var buttonIdx;
        //         var rateIdx;
        //         var data={};
        //         if(id.length>12) {
        //             rateButton = id.substring(0,12);
        //             if(rateButton=="ratingSubmit"){
        //                 buttonIdx=id.substring(12,id.length);
        //                 rateIdx="rating"+buttonIdx;
        //                 if($("#"+rateIdx).val().length==0){
        //                     alert("The rate cannot be empty!");
        //                 }else if($("#"+rateIdx).val()!='') {
        //                     data["username"] = $("#username").text();
        //                     data["story"] = $("#username").text();
        //                     data["rating"] = $("#"+rateIdx).val();
        //                     onRatingSubmit(data);
        //                 }
        //             }
        //         }
        //     });
        // });
        //
        //
        //
        // socket.on('event04', function (data) {
        //     $(document).ready(function(){
        //         $("#socketEvent1").text(data.data);
        //     });
        // });
    });
}
