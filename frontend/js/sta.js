$(document).ready(function () {

  $('.dataTables_length').addClass('bs-select');
  showTable();
});


function showTable(){
  $.ajax({
    url: "../backend/selects/getSta.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#staTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let actual_situation = myJSON[i].actual_situation;
        let hiring_date = myJSON[i].hiring_date;
        let tf_service = myJSON[i].tf_service;
        let tcr_service = myJSON[i].tcr_service;
        let cc_service = myJSON[i].cc_service;
        let tm_service = myJSON[i].tm_service;
        let tam_service = myJSON[i].tam_service;
        let gps_service = myJSON[i].gps_service;
        let umt_service = myJSON[i].umt_service;

        showCap(id, name, address,phone, schedule);
      }
      $('#dtSta').DataTable();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showCap(id, name, address,phone, schedule){
  let html="<tr><td>"+id+"</td><td>"+actual_situation+"</td><td>"+hiring_date+"</td><td>"+tf_service+"</td><td>"+tcr_service+"</td><td>"+cc_service+"</td><td>"+tm_service+"</td><td>"+tam_service+"</td><td>"+gps_service+"</td><td>"+umt_service+"</td><td><button id='fitxaPersonal"+id+"' type='button' class='btn btn-info'>Fitxa Completa</button></td></tr>";
  $("#staTable").append(html);
}
