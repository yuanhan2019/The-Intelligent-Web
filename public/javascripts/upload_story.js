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
                            var $img = $("<img class='up-img up-opcity'>");
                            $img.attr("src",ev.target.result);
                            alert(ev.target.result);
                            $img.appendTo($section);

                            var $p = $("<p class='img-name-p'>");
                            $p.html(file.name).appendTo($section);
                            var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                            $input.appendTo($section);
                            var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                            $input2.appendTo($section);
                            $(".file").val( '');

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












