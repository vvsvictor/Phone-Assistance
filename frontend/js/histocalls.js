$(document).ready(function () {
  $('.dataTables_length').addClass('bs-select');
  showTable();
  addCallListener();
});

function gotoModUser() {
  $('#modCallDiv').show();
  $('#addCall').hide();
  $("#callList").hide();
}

function addCallListener() {
  $("#showFormBtn").click(function() {
    $("#dni").val('');
    $("#data").val('');
    $("#type").val('');
    $("#state").val('');
    $("#callList").hide();
    $('#addCall').show();
    $("#showListBtn").click(function() {
      goToCallList();
    });
  });

  $("#addCallBtn").click(function() {
    $.ajax({
      url: "../backend/inserts/insertCallHistory.php",
      data: {
        sDni: $("#dni").val(),
        sData: $("#data").val(),
        iType: $("#type").val(),
        iState: $("#state").val()
      },
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        showTable();
        $('#addCall').hide();
        $("#callList").show();

        if (parseInt(myJSON.codigoError) != 0) {
          console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
      },
      error: function() {
        alert("Error en la consulta");
      }
    });
  });
}

function goToCallList(){
  $('#modCallDiv').hide();
  $('#addCall').hide();
  $("#callList").show();
}


function showTable(){
  $.ajax({
    url: "../backend/selects/getCallHistory.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#histoCallsTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let dni = myJSON[i].user_dninif;
        let date = myJSON[i].call_date;
        let state = myJSON[i].call_state;
        showHistoCall(id, dni, date, state);
      }
      $('#dtHistocalls').DataTable();
    },
    error: function() {
      console.log('No hi han trucades');
    }
  });
}

function showHistoCall(id, dni, date, state){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+date+"</td><td>"+state+"</td><td><button id='histoCall" + id + "' type='button' class='histoCall btn btn-info marginBtn'>Fitxa Completa</button><button type='button' id='deleteCallId" + id + "' class='deletecall btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecallmodal'>Eliminar</button></td></tr>";
  $("#histoCallsTable").append(html);
}


function eliminarCallListener() {
  let idCall;
  $(".deletecall").click(function(event) {
    idCall = this.id;
    idCall = idCall.replace("deleteCallId", "");
    console.log("The id call is: " + idCall);
    $("#deleteCallDef").click(function(event) {
      deleteCall(idCall);
    });
  });
}


function deleteCall(idCall) {
  console.log(idCall);
  $.ajax({
    url: "../backend/delete/deleteCallHistory.php",
    data: {
      id: idCall
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
