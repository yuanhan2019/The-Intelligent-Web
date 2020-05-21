function updateRatingAjax(data) {
    $.ajax({
        url: 'insertRating',
        data: data,
        dataType: 'json',
        type: 'POST',
        success:
            function (dataR) {
                // no need to JSON parse the result, as we are using
                // dataType:json, so JQuery knows it and unpacks the
                // object for us before returning it

                // in order to have the object printed by alert
                // we need to JSON stringify the object
                //window.location.href=encodeURI('/home?'+dataR[0].username);


            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            //document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: in AJAX' + error.message);
        }
    });
}
function onRatingSubmit(data) {
    updateRatingAjax(data);
    window.location.href='/home';
    event.preventDefault();
}
