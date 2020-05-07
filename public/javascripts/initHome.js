var socket = io.connect();

function init() {
  document.getElementById('username').innerHTML = JSON.parse(
    localStorage.user,
  ).username;
  document.getElementById('bio').innerHTML = JSON.parse(localStorage.user).bio;
  //init stories parts

  getData();
}

//Creat N Stories
function getData() {
  $.ajax({
    url: 'initHome',
    dataType: 'json',
    type: 'GET',
    success: function (dataR) {
      var str = '';
      dataR.forEach((element) => {
        str += `<div class="card p-4 mb-4">
                              <p class="mb-3">
                                  <strong>${element.username}</strong>
                                  <span class="pl-3">${element.createAt}</span>
                              </p>
                              <p class="lead mb-3">
                                  ${element.text}
                              </p>
  
                              <div class="row justify-content-center mb-3">
                                  
                                  ${
                                    element.userImage1
                                      ? `<div class="col-sm-12 col-md-4 center mb-2">
                                      <img id="post1" class="img-post" src="${element.userImage1}">
                                  </div>`
                                      : ''
                                  }
                                  
                                  ${
                                    element.userImage2
                                      ? `<div class="col-sm-12 col-md-4 center mb-2">
                                      <img id="post2" class="img-post" src="${element.userImage2}">
                                  </div>`
                                      : ''
                                  }
                                  
                                  ${
                                    element.userImage3
                                      ? `<div class="col-sm-12 col-md-4 center mb-2">
                                      <img id="post3" class="img-post" src="${element.userImage3}">
                                  </div>`
                                      : ''
                                  }
                              </div>
  
                              <div class="row justify-content-between">
                                  <div class="col-2">
                                  
                                  </div>
                                  <div class="col-2">
                                  
                                  <!-- Button trigger modal -->
                                  <button type="button" class="btn btn-primary"
                                   data-toggle="modal" data-target="#exampleModal${
                                    element._id
                                  }">
                                    Commant
                                  </button>
                                  
                                  <!-- Modal -->
                                  <div class="modal fade" id="exampleModal${
                                    element._id
                                  }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <form onSubmit="addCommants()">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">Commants</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                        <ul class="list-group list-group-flush">
                                        ${
                                          getCommant(element.commants)
                                        }
                                      </ul>
                                      <input type="hidden" value="${element._id}" >
                                      <textarea class="form-control" name="commant" id="validationTextarea${element._id}" placeholder="Add Commant"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                          <button type="submit" class="btn btn-primary" > add</button>
                                        </div>
                                      </div>
                                    </form>
                                    </div>
                                  </div>


                                  </div>
                                  <div class="col-6">
                                  <div class="accordion" id="accordionExample">
                                    
                                  
                                    
                                      <div class="card-header" id="headingOne">
                                        <h2 class="mb-0">
                                          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne${
                                            element._id
                                          }"
                                           aria-expanded="true" aria-controls="collapseOne${
                                             element._id
                                           }">
                                          <i class="fas fa-heart text-danger"></i>
                                          </button>
                                        </h2>
                                      </div>

                                      <div id="collapseOne${
                                        element._id
                                      }" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                          <div class="card-body">
                                            <i class="fas fa-heart text-danger" onclick="addlike(${
                                              element._id
                                            })"></i> (10)
                                            <i class="far fa-grin-squint text-warning" onclick="addlike(${
                                              element._id
                                            },2)"></i> (15)
                                            <i class="far fa-sad-tear text-warning" onclick="addlike(${
                                              element._id
                                            },3)"></i> (12)

                                            <i class="far fa-angry text-warning" onclick="addlike(${
                                              element._id
                                            },4)"></i> (11)
                                          </div>
                                      </div>
                                     
                                        
                                    
                                  </div>
                                    
  
                                  </div>
                              </div>
  
                          </div>
          `;

      });
      document.getElementById('wall').innerHTML = str;
    },
    error: function (xhr, status, error) {
      //document.getElementById('results').innerHTML=error;
      //   document.getElementById('results').innerHTML = xhr.responseText;
      alert('Error: ' + error.message);
    },
  });
}


function ser(){
  const text=document.getElementById('ser').value;
  $.ajax({
    url: '/ser',
    dataType: 'json',
    data:{
      text
    },
    type: 'POST',
    success: function (dataR) {
      var str = '';
      dataR.forEach((element) => {
        str += `<div class="card p-4 mb-4">
                              <p class="mb-3">
                                  <strong>${element.username}</strong>
                                  <span class="pl-3">${element.createAt}</span>
                              </p>
                              <p class="lead mb-3">
                                  ${element.text}
                              </p>
  
                              <div class="row justify-content-center mb-3">
                                  
                                  ${
                                    element.userImage1
                                      ? `<div class="col-sm-12 col-md-4 center mb-2">
                                      <img id="post1" class="img-post" src="${element.userImage1}">
                                  </div>`
                                      : ''
                                  }
                                  
                                  ${
                                    element.userImage2
                                      ? `<div class="col-sm-12 col-md-4 center mb-2">
                                      <img id="post2" class="img-post" src="${element.userImage2}">
                                  </div>`
                                      : ''
                                  }
                                  
                                  ${
                                    element.userImage3
                                      ? `<div class="col-sm-12 col-md-4 center mb-2">
                                      <img id="post3" class="img-post" src="${element.userImage3}">
                                  </div>`
                                      : ''
                                  }
                              </div>
  
                              <div class="row justify-content-between">
                                  <div class="col-2">
                                  
                                  </div>
                                  <div class="col-2">
                                  
                                  <!-- Button trigger modal -->
                                  <button type="button" class="btn btn-primary"
                                   data-toggle="modal" data-target="#exampleModal${
                                    element._id
                                  }">
                                    Commant
                                  </button>
                                  
                                  <!-- Modal -->
                                  <div class="modal fade" id="exampleModal${
                                    element._id
                                  }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <form onSubmit="addCommants()">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">Commants</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                        <ul class="list-group list-group-flush">
                                        ${
                                          getCommant(element.commants)
                                        }
                                      </ul>
                                      <input type="hidden" value="${element._id}" >
                                      <textarea class="form-control" name="commant" id="validationTextarea${element._id}" placeholder="Add Commant"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                          <button type="submit" class="btn btn-primary" > add</button>
                                        </div>
                                      </div>
                                    </form>
                                    </div>
                                  </div>


                                  </div>
                                  <div class="col-6">
                                  <div class="accordion" id="accordionExample">
                                    
                                  
                                    
                                      <div class="card-header" id="headingOne">
                                        <h2 class="mb-0">
                                          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne${
                                            element._id
                                          }"
                                           aria-expanded="true" aria-controls="collapseOne${
                                             element._id
                                           }">
                                          <i class="fas fa-heart text-danger"></i>
                                          </button>
                                        </h2>
                                      </div>

                                      <div id="collapseOne${
                                        element._id
                                      }" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                          <div class="card-body">
                                            <i class="fas fa-heart text-danger" onclick="addlike(${
                                              element._id
                                            })"></i> (10)
                                            <i class="far fa-grin-squint text-warning" onclick="addlike(${
                                              element._id
                                            },2)"></i> (15)
                                            <i class="far fa-sad-tear text-warning" onclick="addlike(${
                                              element._id
                                            },3)"></i> (12)

                                            <i class="far fa-angry text-warning" onclick="addlike(${
                                              element._id
                                            },4)"></i> (11)
                                          </div>
                                      </div>
                                     
                                        
                                    
                                  </div>
                                    
  
                                  </div>
                              </div>
  
                          </div>
          `;

      });
      document.getElementById('wall').innerHTML = str;
    },
    error: function (xhr, status, error) {
      //document.getElementById('results').innerHTML=error;
      //   document.getElementById('results').innerHTML = xhr.responseText;
      alert('Error: ' + error.message);
    },
  });
}

function addCommants() {
 
  event.preventDefault();
  var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    $.ajax({
      url: '/userStory/addCommant',
      data: {
        ...data,
        userId:JSON.parse(localStorage.user)._id
      },
      dataType: 'json',
      type: 'POST',
      success: function (dataR) {
        socket.emit('event02', { my: 'data client' });
        getData()
      },
      error: function (xhr, status, error) {
        //document.getElementById('results').innerHTML=error;
        // document.getElementById('results').innerHTML = xhr.responseText;
        alert('Error: ' + error.message);
      },
    });
}


function deletePost(id) {
  $.ajax({
    url: '/userStory/delete/' + id,
    dataType: 'json',
    type: 'DELETE',
    success: function (dataR) {
      socket.emit('event02', { my: 'data client' });
      getData();
    },
    error: function (xhr, status, error) {
      alert('Error: ' + error.message);

      //document.getElementById('results').innerHTML=error;
      // document.getElementById('results').innerHTML = xhr.responseText;
      //alert('Error: ' + error.message);
    },
  });
}


function getCommant(list) {
  if (!list) {
    list=[]
  }
  let d='';
  list.forEach(el=>{
    d=d+'<li class="list-group-item">'+el.commant+'</li>';
  });
  return d;
}

$(document).ready(function () {
  //init socket parts

  socket.on('event01', function (data) {
    // socket.emit('event02', { my: 'data client' });
    getData();
  });
  
});

/*














/*
$(document).ready(function() {
    // endless scrolling
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $("#wall").append("<div class='item'><img src='path/to/image' width='140' height='100' /></div>");
        }
    });
});*/
