$(document).ready(function () {

  $('.dataTables_length').addClass('bs-select');
  showTable();
});


function showTable(){
  $.ajax({
    url: "../backend/selects/getFitxaPersonal.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#fitxaPersonalTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let name = myJSON[i].name;
        let surname = myJSON[i].surname;
        let dninie = myJSON[i].dninie;
        let province = myJSON[i].province;
        showFitxaPersonal(id, name, surname,dninie, province);
      }
    },
    error: function() {
      console.log('No hi han clients');
    }
  });
  $('#dtBasicExample').DataTable();
}


function showFitxaPersonal(id, name, surname,dninie, province){
  let html="<tr><td>"+id+"</td><td>"+name+"</td><td>"+surname+"</td><td>"+dninie+"</td><td>"+province+"</td><td>Button</td></tr>";
  $("#fitxaPersonalTable").append(html);
}
