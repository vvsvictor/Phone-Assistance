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
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#histoCallsTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        //let dni = myJSON[i].name;
        //let name = myJSON[i].address;
        let date = myJSON[i].call_date;
        let state = myJSON[i].call_state;
        showHistoCall(id, dni, name, date, state);
      }
      $('#dtHistocalls').DataTable();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });
}


function showHistoCall(id, dni, name, date, state){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+name+"</td><td>"+date+"</td><td>"+state+"</td><td><button id='fitxaPersonal"+id+"' type='button' class='btn btn-info'>Fitxa Completa</button></td></tr>";
  $("#histoCallsTable").append(html);
}