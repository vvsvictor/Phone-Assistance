function pdLogin(){
  $.ajax({
    url: "login.php",
    type: "GET",
    data: $('#formLg').serialize(),
    cache: false,
    success: function(response){
      let myJSON = JSON.parse(response);
      if (!response.error) {
          if (parseInt(myJSON.type) == 0) {
                  location.href = 'admin.php';
          } else if (parseInt(myJSON.type) == 1) {
            location.href = 'user.php';
          }
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}

$( document ).ready(function() {

    $('#submit').click(function(){
        pdLogin();
    });
});
