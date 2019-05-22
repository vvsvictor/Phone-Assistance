$(document).ready(function() {
  $('.dataTables_length').addClass('bs-select');
  showTable();
});


function showTable() {
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
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}

function showCap(id, name, address, phone, schedule) {
  let html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + phone + "</td><td>" + schedule + "</td><td><button id='fitxaPersonal" + id + "' type='button' class='btn btn-info'>Fitxa Completa</button></td></tr>";
  $("#capTable").append(html);
}
