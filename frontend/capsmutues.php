<!DOCTYPE html>
<?php
        include '..\backend\include.php';
        //include '..\backend\includeAll.php';
        //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.

        ?>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Phone Assistence</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/css/mdb.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"> -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
    <link rel="stylesheet" href="css/dataTable.css">
  </head>
  <body class="addFont">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #11999E;">
      <a class="navbar-brand" href="#"><img src="images/PA-Mini.png"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.php" style="color: #40514e;">Inici </a>
          </li>
          <?php
          if ($_SESSION['user']['usertype'] == 0) {
            echo '<li class="nav-item">
              <a class="nav-link" href="users.php" style="color: #40514e;">Usuaris</a>
            </li>';
          }
           ?>

          <li class="nav-item">
            <a class="nav-link" href="fitxaPersonal.php" style="color: #40514e;">Fitxa personal</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#" style="color: #e4f9f5;">CAP - Mútues<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sta.php" style="color: #40514e;">STA - Responsables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="histocalls.php" style="color: #40514e;">Historial de trucades</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <p class="navbar-text paddingr paddingRight" style="color: #e4f9f5;">
              <?php
              //echo 'Hola, '.$_SESSION['user']['username'].'  ';
              ?>
              &nbsp;
              &nbsp;
            </p>
          </li>
          <li class="nav-item">
            <form class="form-inline my-2 my-lg-0">
              <a href="exitLogin.php" class="btn btn-outline-light" role="button">Logout</a>
            </form>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <button id="showFormCAP" type="button" class="btn btn-primary"><i class="fa fa-plus"></i></button>
      <button id="showFormDoctor" type="button" class="btn btn-primary"><i class="fa fa-plus"></i></button>
      <!-- Formulario Añadir CAPS -->
      <div class="container_add">
        <button id="returnCAP" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
        <br>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="nom_cap">NOM DEL CAP</label>
          </div>
          <div class="col lg-6">
            <label for="direccio_cap">DIRECCIÓ</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input type="text" class="form-control" name="nom_cap"/>
          </div>
          <div class="col lg-6">
            <input type="text" class="form-control" name="direccio_cap"/>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="tel_cap">TELÈFON</label>
          </div>
          <div class="col lg-6">
            <label for="horari_cap">HORARI</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input type="text" class="form-control" name="tel_cap"/>
          </div>
          <div class="col lg-6">
            <input type="text" class="form-control" name="horari_cap"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <label for="mutues">MUTUES</label>
          </div>
          <div class="col lg-6">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input id="mutues"/>
          </div>
          <div class="col lg-6">
          </div>
        </div>
      </div>
      <!--Formulario Añadir Doctores -->
      <div class="container_add">
        <button id="returnDoctor" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
        <br>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="nom_cap">NOM DEL DOCTOR</label>
          </div>
          <div class="col lg-6">
            <label for="direccio_cap">COGNOMS DEL DOCTOR</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input type="text" class="form-control" name="nom_doctor"/>
          </div>
          <div class="col lg-6">
            <input type="text" class="form-control" name="direccio_doctor"/>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="genere_doc">GENERE</label>
          </div>
          <div class="col lg-6">
            <label for="especialització">ESPECIALITZACIÓ</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input type="text" class="form-control" name="genere"/>
          </div>
          <div class="col lg-6">
            <input id="especialitzacions"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <label for="mutues">CAP</label>
          </div>
          <div class="col lg-6">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input id="caps"/>
          </div>
          <div class="col lg-6">
          </div>
        </div>
      </div>
      <table id="dtCap" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">Nom</th>
            <th class="th-sm">Direcció</th>
            <th class="th-sm">Telèfon</th>
            <th class="th-sm">Horari</th>
            <th class="th-sm"></th>
          </tr>
        </thead>
        <tbody id="capTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Direcció</th>
            <th>Telèfon</th>
            <th>Horari</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/js/mdb.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="js/cap.js" type="text/javascript"></script>
  </body>
</html>
