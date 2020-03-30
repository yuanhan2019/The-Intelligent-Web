function init(){
    var url = decodeURI(window.location.href);
    var arr_para = url.split('?')[1].split('&');
    var result = '';
    for(var i = 0; i < arr_para.length; i++) {
        result += arr_para[i] + '<br>';
    }
    document.getElementById('username').innerHTML= result;
}