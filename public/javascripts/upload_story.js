/**upload**/

$('#file').on('change',function() {
    window.alert(123);
    var objUrl = getObjectURL(this.files[0]) ;//获取文件信息
    if (objUrl) {
        $("#img0").attr("src", objUrl);
    }
});



function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}





var delParent;
var defaults = {
    fileType: ["jpg", "png", "bmp", "jpeg"],
    fileSize: 1024 * 1024 * 10 //10Mb
};
    function validateUp(files){
        var arrFiles = [];//替换的文件数组
        for(var i = 0, file; file = files[i]; i++){
            var newStr = file.name.split("").reverse().join("");
            if(newStr.split(".")[0] != null){
                var type = newStr.split(".")[0].split("").reverse().join("");
                if(jQuery.inArray(type, defaults.fileType) > -1){
                    if (file.size >= defaults.fileSize) {
                        alert(file.size);
                        alert('您这个"'+ file.name +'"文件大小过大');
                    } else {
                        // 在这里需要判断当前所有文件中
                        arrFiles.push(file);
                    }
                }else{
                    alert('您这个"'+ file.name +'"上传类型不符合');
                }
            }else{
                alert('您这个"'+ file.name +'"没有类型, 无法识别');
            }
        }
        return arrFiles;
    }