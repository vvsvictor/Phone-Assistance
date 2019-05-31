$(document).ready(function() {
		var $winwidth = $(window).width();
		$("img.source-image").attr({
			width: $winwidth
		});
		$(window).bind("resize", function(){
			var $winwidth = $(window).width();
			$(".img-fluid").attr({
				width: $winwidth
			});
		 });
	});
//Funcion que corrobora los datos introducidos y redirige a la pagina establecida siempre que todo este correcto.
function pdLogin() {
  $.ajax({
    url: "login.php",
    type: "GET",
    data: $('#formLg').serialize(),
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      if (!myJSON.error) {
        if (parseInt(myJSON.type) == 0) {
          location.href = 'admin.php';
        } else if (parseInt(myJSON.type) == 1) {
          location.href = 'user.php';
        }
      }else{
        $("#userInput").addClass("badLogin");
        $("#alertBadLogin").show();
        setTimeout(
            function() {
              $("#alertBadLogin").hide();
            }, 5000);

      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}

$("#alertBadLogin").hide();

$("#userInput").keyup(function() {
  if (event.keyCode === 13) {
    $("#loginInput").click();

  }
});

$("#passwordInput").keyup(function() {
  if (event.keyCode === 13) {
    $("#loginInput").click();
  }
});

$('#loginInput').click(function() {
  pdLogin();
});

$('#userInput').click(function() {
  $("#userInput").removeClass("badLogin");
});




$("#logButton").click(function(event) {
  event.preventDefault();
  $('form').fadeOut(500);
  $('.wrapper').addClass('form-success');
});
