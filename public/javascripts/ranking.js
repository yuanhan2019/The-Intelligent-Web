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
                initdatas(dataR);
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

