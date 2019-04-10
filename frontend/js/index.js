function pdLogin(){
  $.ajax({
    url: "login.php",
    type: "GET",
    data: $('#formLg').serialize(),
    cache: false,
    success: function(response){
      if (!response.error) {
        var myJSON = JSON.parse(response);
        if (parseInt(myJSON.tipo) == 0) {
                location.href = 'admin.php';
             } else if (parseInt(myJSON.tipo) == 1) {
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
