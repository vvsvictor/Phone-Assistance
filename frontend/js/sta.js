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

        showSta(id, dni,actual_situation, hiring_date);
      }
      $('#dtSta').DataTable();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showSta(id, dni,situation, date){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+situation+"</td><td>"+date+"</td><td><button id='sta"+id+"' type='button' class='btn btn-info'>Fitxa Completa</button></td></tr>";
  $("#staTable").append(html);
}
