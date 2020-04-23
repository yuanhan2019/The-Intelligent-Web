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

                // in order to have the object printed by alert
                // we need to JSON stringify the object
                //window.location.href=encodeURI('/home?'+dataR[0].username);

            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });
}


function onSubmit(url) {
    alert("AJAX");
    var data={};
    data["userImage1"]=$("#image1").attr("src");
    data["userImage2"]=$("#image2").attr("src");
    data["userImage3"]=$("#image3").attr("src");
    //const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery(url, data);
    getAjaxQuery(url);
    event.preventDefault();
}

/**update story**/

function getAjaxQuery(url) {
    $.ajax({
        url: url ,
        async: true,
        dataType: 'json',
        type: 'GET',
        success:
            function (dataR) {
                // no need to JSON parse the result, as we are using
                // dataType:json, so JQuery knows it and unpacks the
                // object for us before returning it

                // in order to have the object printed by alert
                // we need to JSON stringify the object
                //window.location.href=encodeURI('/home?'+dataR[0].username);
                $(document).ready(function () {
                    $("#post1").attr("src",dataR[0].userImage);
                });

            },
        error: function (xhr, status, error) {
            //document.getElementById('results').innerHTML=error;
            //document.getElementById('results').innerHTML= xhr.responseText;
            //alert('Error: ' + error.message);
        }
    });
}





/**upload**/
$(document).ready(function () {
    $(function(){
        var delParent;
        var defaults = {
            fileType         : ["jpg","png","bmp","jpeg"],
            fileSize         : 1024 * 1024 * 10
        };
        $(".file").change(function(){
            var idFile = $(this).attr("id");
            var file = document.getElementById(idFile);
            var imgContainer = $(this).parents(".z_photo");
            var fileList = file.files;
            var input = $(this).parent();
            var numUp = imgContainer.find(".up-section").length;
            var totalNum = numUp + fileList.length;

            if(fileList.length > 3 || totalNum > 3 ){
                alert("The number of uploaded pictures cannot exceed 3, please choose again");
            }
            else if(numUp < 3){
                fileList = validateUp(fileList);
                for(var i = 0;i<fileList.length;i++){
                    var file = fileList[i];
                    var reader = new FileReader();
                    reader.onload = (function(file){
                        return function(ev){
                            var $section = $("<section class='up-section fl loading'>");
                            imgContainer.prepend($section);
                            var $span = $("<span class='up-span'>");
                            $span.appendTo($section);

                            var $img0 = $("<img class='close-upimg'>").on("click",function(event){
                                event.preventDefault();
                                event.stopPropagation();
                                $(".works-mask").show();
                                delParent = $(this).parent();
                            });
                            $img0.attr("src","../images/delete.png").appendTo($section);

                            if($("#image1").attr("src")==null){
                                var $img = $("<img id='image1' class='up-img up-opcity'>");
                            }else if($("#image2").attr("src")==null){
                                var $img = $("<img id='image2' class='up-img up-opcity'>");
                            }else if($("#image3").attr("src")==null) {
                                var $img = $("<img id='image3' class='up-img up-opcity'>");
                            }
                            $img.attr("src",ev.target.result);
                            $img.appendTo($section);

                            var $p = $("<p class='img-name-p'>");
                            $p.html(file.name).appendTo($section);
                            var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                            $input.appendTo($section);
                            var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                            $input2.appendTo($section);
                            $(".file").val('');

                        };
                    })(file);
                    reader.readAsDataURL(file);

                }

                if(fileList.length == 3) {
                    $('.z_file').css('display', 'none');
                }
            }
            setTimeout(function(){
                $(".up-section").removeClass("loading");
                $(".up-img").removeClass("up-opcity");
            },450);
            numUp = imgContainer.find(".up-section").length;
            if(numUp >= 3){
                $(this).parent().hide();
            }
        });

        $(".z_photo").delegate(".close-upimg","click",function(){
            $(".works-mask").show();
            delParent = $(this).parent();
        });

        $(".wsdel-ok").click(function(){
            $(".works-mask").hide();
            var numUp = delParent.siblings().length;
            if(numUp < 4){
                delParent.parent().find(".z_file").show();
            }
            delParent.remove();
        });

        $(".wsdel-no").click(function(){
            $(".works-mask").hide();
        });

        function validateUp(files){
            var arrFiles = [];
            for(var i = 0, file; file = files[i]; i++){
                var newStr = file.name.split("").reverse().join("");
                if(newStr.split(".")[0] != null){
                    var type = newStr.split(".")[0].split("").reverse().join("");
                    console.log(type+"===type===");
                    if(jQuery.inArray(type, defaults.fileType) > -1){
                        if (file.size >= defaults.fileSize) {
                            alert(file.size);
                            alert('Your file:"'+ file.name +'"size is too large');
                        } else {
                            arrFiles.push(file);
                        }
                    }else{
                        alert('Your file:"'+ file.name +'"Upload type does not match');
                    }
                }else{
                    alert('Your file:"'+ file.name +'"No type, unrecognized');
                }
            }
            return arrFiles;
        }
    });



});













