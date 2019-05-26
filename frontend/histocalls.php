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

    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
  </head>
  <body class="addFont">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #11999E;">
      <a class="navbar-brand" href="index.php"><img src="images/PA-Mini.png"/></a>
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
          <li class="nav-item">
            <a class="nav-link" href="capsmutues.php" style="color: #40514e;">CAP - Mútues</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sta.php" style="color: #40514e;">STA - Responsables</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="histocalls.php" style="color: #e4f9f5;">Historial de trucades<span class="sr-only">(current)</span></a>
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
      <table id="dtHistocalls" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">DNI</th>
            <th class="th-sm">Data</th>
            <th class="th-sm">Estat de la trucada</th>
            <th class="th-sm">Tipus de trucada</th>
            <th class="th-sm"></th>
          </tr>
        </thead>
        <tbody id="histoCallsTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Data</th>
            <th>Estat de la trucada</th>
            <th>Tipus de trucada</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="container">

    </div>

    <!-- FICHA PERSONAL-->
    <div class="c-tab is-active">
      <div class="c-tab__content">
        <div class="container_ficha">
          <div class="container">
            <div class="content">
              <div class="direccion">
                <h1 class="heading"> Dades</h1>
                <div class="info">
                  <p class="sub-heading">Dni Usuari</p>
                  <p id="fpndni" class="duration">Gimena</p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Data Trucada</p>
                  <p id="fpdata" class="duration">del Carmen Ortega</p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Tipus de Trucada</p>
                  <p id="fptype" class="duration">30762309F</p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Estat de trucada</p>
                  <p id="fpstate" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Truca usuari</p>
                  <p id="fpincall" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Truca teleassistent</p>
                  <p id="fpoutcall" class="duration"></p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Modal Delete product-->
    <div class="modal fade" id="deletecallmodal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Eliminar Trucada</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Vols eliminar la trucada?</p>
          </div>
          <div class="modal-footer">
            <button type="button" id="deleteCallDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tancar</button>
          </div>
        </div>
      </div>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/js/mdb.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="js/histocalls.js" type="text/javascript"></script>
  </body>
</html>
