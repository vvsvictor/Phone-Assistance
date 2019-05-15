$(document).ready(function () {
  $('#addUser').hide();
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
      $("#usuarisTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let username = myJSON[i].username;
        let usertype = myJSON[i].usertype;
        showUser(id, username,usertype);
      }
      $('#dtUsuaris').DataTable();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showUser(id, username,usertype){
  let html;
  if (usertype==0){
    html="<tr><td>"+id+"</td><td>"+username+"</td><td>Professor</td></tr>";
  }else{
    html="<tr><td>"+id+"</td><td>"+username+"</td><td>Alumne</td></tr>";
  }

  $("#usuarisTable").append(html);
}
