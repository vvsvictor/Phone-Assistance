$(document).ready(function () {
  $('#addCap').hide();
  $('.dataTables_length').addClass('bs-select');
  showTable();
/*
  $( "#showFormBtn" ).click(function() {
    $("#username").val('')
    $("#password").val('');
    $("input[name=usertype][value=0]").attr('checked', 'checked');
    $( "#usersList" ).hide();
    $('#addUser').show();
  */
  });
/*
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

*/
function showTable(){
  $.ajax({
    url: "../backend/selects/getCap.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#capTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let name = myJSON[i].name;
        let address = myJSON[i].address;
        let phone = myJSON[i].phone;
        let schedule = myJSON[i].schedule;
        showCap(id, name, address, phone, schedule);
      }
      $('#dtCap').DataTable();
      eliminarUsuariListener();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showCap(id, name, address, phone, schedule){
  let html;
    html="<tr><td>"+id+"</td><td>"+username+"</td><td>Alumne</td><td>"+address+"</td><td>Adreça</td><td><td>"+phone+"</td><td>Telèfon</td><td><td>"+schedule+"</td><td>Horari</td><td><button type='button' id='deleteCapId"+id+"' class='deleteuser btn btn-danger' data-toggle='modal' data-target='#deletecapmodal'>Eliminar</button></td></tr>";
  $("#capTable").append(html);
}


function eliminarCapListener() {
  let idCap;
  $(".deletecap").click(function(event) {
    idCap = this.id;
    idCap = idCap.replace("deleteCapId", "");
    $("#deleteCapDef").click(function(event) {
      deleteUser(idCap);
    });
  });
}


function deleteUser(idUser){
  $.ajax({
    url: "../backend/delete/deleteCap.php",
    data: {
      id: idCap
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
