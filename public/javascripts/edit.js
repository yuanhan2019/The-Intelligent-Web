function initedit(){
    document.getElementById('created').innerHTML= JSON.parse(localStorage.user).createAt;

    document.getElementById("username").value = JSON.parse(localStorage.user).username;
    document.getElementById("bio").value = JSON.parse(localStorage.user).bio;
    document.getElementById("email_address").value = JSON.parse(localStorage.user).email_address;
}





function sendAjaxQuery( data) {
    $.ajax({
        url: '/user/update/'+JSON.parse(localStorage.user)._id ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success:
            function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            // var ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            
            document.getElementById('results').show;
            document.getElementById('results').innerHTML= "Done Update";

        },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });
}


function onSubmit(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    //const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery(data);
    event.preventDefault();
}
