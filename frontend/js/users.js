$(document).ready(function () {
  $('#addUser').hide();
  $('.dataTables_length').addClass('bs-select');
  showTable();
  $( "#showFormBtn" ).click(function() {
    $("#username").val('')
    $("#password").val('');
    $("input[name=usertype][value=0]").attr('checked', 'checked');
    $( "#usersList" ).hide();
    $('#addUser').show();
  });

  $( "#showListBtn" ).click(function() {
    $('#addUser').hide();
    $( "#usersList" ).show();
  });


  $( "#addUserBtn" ).click(function() {
    $.ajax({
      url: "../backend/inserts/insertUsuari.php",
      data: {
        sUsername: $("#username").val(),
        sPassword: $("#password").val(),
        iUserType: $('input[name=usertype]:checked', '#formUser').val()
      },
      type: "GET",
      cache: false,
      success: function(response) {
        var myJSON = JSON.parse(response);
        showTable();
        $('#addUser').hide();
        $( "#usersList" ).show();

        if (parseInt(myJSON.codigoError) != 0) {
          console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
      },
      error: function() {
        alert("Error en la consulta");
      }
    });
  });


});


function showTable(){
  $.ajax({
    url: "../backend/selects/getUsers.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#usuarisTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let username = myJSON[i].username;
        let usertype = myJSON[i].usertype;
        showUser(id, username,usertype);
      }
      $('#dtUsuaris').DataTable();
      eliminarUsuariListener();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showUser(id, username,usertype){
  let html;
  if (usertype!=0){
    html="<tr><td>"+id+"</td><td>"+username+"</td><td>Alumne</td><td><button type='button' id='deleteUserId"+id+"' class='deleteuser btn btn-danger' data-toggle='modal' data-target='#deleteproductmodal'>Eliminar</button></td></tr>";
  }else{
    html="<tr><td>"+id+"</td><td>"+username+"</td><td>Professor</td><td><button type='button' class='btn btn-danger' disabled>Eliminar</button></td></tr>";
  }

  $("#usuarisTable").append(html);
}


function eliminarUsuariListener() {
  let idUser;
  $(".deleteuser").click(function(event) {
    idUser = this.id;
    idUser = idUser.replace("deleteUserId", "");
    $("#deleteUserDef").click(function(event) {
      deleteUser(idUser);
    });
  });
}


function deleteUser(idUser){
  $.ajax({
    url: "../backend/delete/deleteUsers.php",
    data: {
      id: idUser
    },
    type: "GET",
    cache: false,
    success: function(response) {
      var myJSON = JSON.parse(response);
      if (parseInt(myJSON.codigoError) != 0) {
        showTable();
      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}
