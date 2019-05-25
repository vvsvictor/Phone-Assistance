$(document).ready(function () {
  $('.dataTables_length').addClass('bs-select');
  showTable();
});

function showTable(){
  $.ajax({
    url: "../backend/selects/getCallHistory.php",
    type: "GET",
    cache: false,
    success: function(response) {
      console.log(response);
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

function showHistoCall(id, dni, name, date, state){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+date+"</td><td>"+state+"</td><td><button id='histoCall" + id + "' type='button' class='histoCall btn btn-info marginBtn'>Fitxa Completa</button><button type='button' id='deleteCallId" + id + "' class='deletecall btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecallmodal'>Eliminar</button></td></tr>";
  $("#histoCallsTable").append(html);
}
