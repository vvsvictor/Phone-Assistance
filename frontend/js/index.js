// jQuery(document).on('#submit', '#formLogin', function(event) {
//   event.preventDefault();
//   jQuery.ajax({
//       url: 'login.php',
//       type: 'GET',
//       dataType: 'json',
//       data: $(this).serialize(),
//       beforeSend: function() {}
//     })
//     .done(function(respuesta) {
//       console.log(respuesta);
//       if (!respuesta.error) {
//         if (respuesta.tipo == 0) {
//           location.href = 'admin.php';
//         } else if (respuesta.tipo == 1) {
//           location.href = 'user.php';
//         }
//
//       } else {
//         $('.error').slideDown('slow');
//         setTimeout(function() {
//           $('.error').slideUp('slow');
//         }, 3000);
//       }
//     })
//     .fail(function(resp) {
//       console.log(resp.responseText);
//     })
//     .always(function() {
//       console.log("complete");
//     });
// });

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
             } else if ((parseInt(myJSON.tipo) == 1) {
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
