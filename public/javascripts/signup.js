function sendAjaxQuery(url, data) {
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
                // var ret = dataR;
                // in order to have the object printed by alert
                // we need to JSON stringify the object
                window.location.href='/';

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
    sendAjaxQuery(url, data);
    event.preventDefault();
}

function validate() {
    var pwd1 = document.getElementById("password1").value;
    var pwd2 = document.getElementById("password2").value;
    if(pwd1 != pwd2) {
        signupForm.password2.focus();
        return false;
    }
    return true;
}