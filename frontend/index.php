<html lang="es" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Phone Assistence</title>
  <link rel="stylesheet/less" type="text/css" href="index2.less"/>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="css/login.css">
  <script src="./js/jquery-1.12.4.js"></script>
  <script src="./js/jquery-ui.js"></script>

</head>
<body>
  <div class="wrapper row">
    <div class="annex-container col-xl-6 col-md-4 col-sm-2 text-center">
        <img src="images/PA-Logo.png" class="logo"></img>
    </div>
  	<div class="container col-xl-6 col-md-8 col-sm-10 rounded-left">
  		<h1>BENVINGUT</h1>
  		<form class="form" id="formLg">
  			<input type="text" name="userInput" id="userInput" placeholder="Usuari">
  			<input type="password" name="passwordInput" id="passwordInput" placeholder="Contrasenya">
  			<div id="loginInput" class="button">Connectar-se</div>
  		</form>
  	</div>
  </div>
  <script src="./js/index.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
<?php
//Abro sesión y mando la sesión del usuario ya logueado a la pagina establecida en el codigo.
session_start();

if(isset($_SESSION['user'])){
  if($_SESSION['user']['usertype'] == 0){
    header('Location: admin.php');
  }elseif($_SESSION['user']['usertype'] == 1){
    header('Location: user.php');
    }
  }

  if(isset($_SESSION['user'])){
    if($_SESSION['user']['usertype'] == 0){
      header('Location: users.php');
    }
  }
?>

</html>
