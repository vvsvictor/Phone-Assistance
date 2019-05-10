$(document).ready(function () {

  $('.dataTables_length').addClass('bs-select');
  showTable();
});


function showTable(){
  $.ajax({
    url: "../backend/selects/getUsers.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#fitxaPersonalTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let surname = myJSON[i].surname;
        let usertpe = myJSON[i].usertpe;
        showFitxaPersonal(id, name, surname,dninie, province);
      }
      $('#dtUsers').DataTable();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showFitxaPersonal(id, name, surname,dninie, province){
  let html="<tr><td>"+id+"</td><td>"+name+"</td><td>"+surname+"</td><td>"+dninie+"</td><td>"+province+"</td><td><button id='fitxaPersonal"+id+"' type='button' class='btn btn-info'>Fitxa Completa</button></td></tr>";
  $("#fitxaPersonalTable").append(html);
}
