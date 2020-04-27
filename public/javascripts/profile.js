function initprofile(){
    document.getElementById('username').innerHTML= JSON.parse(localStorage.user).username;

    document.getElementById("bio").value = JSON.parse(localStorage.user).bio;
}


function sendAjaxQuery() {

    
    $.ajax({
        url: '/user/update/'+JSON.parse(localStorage.user)._id ,
        data: {
            bio : document.getElementById("bio").value
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
                document.getElementById('results').show;
                document.getElementById('results').innerHTML= "Done Update";

                var user = JSON.parse(localStorage.user);
                user.bio = document.getElementById("bio").value;
                localStorage.user = JSON.stringify(user);          

            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });
}


function logout() {
    delete localStorage.user;
}
