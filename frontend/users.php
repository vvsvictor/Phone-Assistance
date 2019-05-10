<?php
  //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.
  session_start();
  if(isset($_SESSION['user'])){
     if($_SESSION['user']['usertype'] != 0){
         header("Location: index.php");
     }
  }elseif(!isset($_SESSION['user'])){
     header("Location: index.php");
  }
?>
<!doctype html>
<html lang="es">
  <head>
        <meta charset="utf-8">
        <meta content="text/html">
        <title>Users Page</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/themes/redmond/jquery-ui.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/css/ui.jqgrid.min.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/jquery.jqgrid.min.js"></script>


   </head>

  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Phone Assistence</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Inici <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Usuaris</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Fitxa personal</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">CAP - Mútues</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">STA - Responsables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Historial de trucades</a>
          </li>
          <li class="nav-item">
            <a href="exitLogin.php" class="btn btn-primary" role="button">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <table id="dtUsers" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">Usuari</th>
            <th class="th-sm">Cognom</th>
          </tr>
        </thead>
        <tbody id="fitxaPersonalTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Usuari</th>
            <th>Cognom</th>
          </tr>
        </tfoot>
      </table>
    </div>

  </body>
</html>
