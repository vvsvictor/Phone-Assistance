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
        let dni = myJSON[i].user_dninif;
        let date = myJSON[i].call_date;
        let state = myJSON[i].call_state;
        showHistoCall(id, dni, date, state);
      }
      $('#dtHistocalls').DataTable();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });
}

function showState() {
  $.ajax({
    url: "../backend/selects/getCallState.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      let provincias = [];
      for (var i = 0; i < myJSON.length; i++) {
        let province = myJSON[i].prov_name;
        let id = myJSON[i].id;
        provincias.push("(Id:" + id + ") " + province);
      }
      $("#divComarcas").hide();
      $("#divMunicipios").hide();
      $("#provincias").kendoAutoComplete({
        filter: "contains",
        dataSource: provincias,
        placeholder: "Selecciona una provincia...",
      });
    },
    error: function() {
      console.log('No hi han provincies');
    }
  });
}

function showLanguages(){
  $.ajax({
    url: "../backend/selects/getLanguages.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      html="";
      for (let i = 0; i < myJSON.length; i++) {
        html+='<option>(Id:'+myJSON[i].id+") "+myJSON[i].language_name+'</option>';
      }
      html+="<option>Altre</option>";
      $("#addIdioma").html(html);
      $("#addIdioma").kendoDropDownList();
      $("#addIdiomaAltre").hide();
    },
    error: function() {
      console.log('No hi han llenguatges');
    }
  });
}


function showHistoCall(id, dni, name, date, state){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+date+"</td><td>"+state+"</td><td><button id='histoCall" + id + "' type='button' class='histoCall btn btn-info marginBtn'>Fitxa Completa</button><button type='button' id='deleteCallId" + id + "' class='deletecall btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecallmodal'>Eliminar</button></td></tr>";
  $("#histoCallsTable").append(html);
}
