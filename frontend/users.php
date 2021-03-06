<?php
//Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.
include '..\backend\include.php';
include '..\backend\includeAdmin.php';
?>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Phone Assistence</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.min.css"/>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
    <link rel="stylesheet" href="css/dataTable.css">
    <link rel="stylesheet" href="css/users.css">

  </head>
  <body class="addFont">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #11999E; box-shadow: 2px 5px 10px #40514E;">
      <a class="navbar-brand" href="index.php"><img src="images/PA-Mini.png"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.php" style="color: #000000;">Inici </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="users.php" style="color: #e4f9f5;">Usuaris/àries<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="fitxaPersonal.php" style="color: #000000;">Fitxa personal</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="capsmutues.php" style="color: #000000;">CAP</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sta.php" style="color: #000000;">STA - Responsables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="histocalls.php" style="color: #000000;">Historial de trucades</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <p class="navbar-text paddingr paddingRight" style="color: #e4f9f5;">
              <?php
                echo 'Hola, '.$_SESSION['user']['username'].'  ';
              ?>
              &nbsp;
              &nbsp;
            </p>
          </li>
          <li class="nav-item">
            <form class="form-inline my-2 my-lg-0">
              <a href="exitLogin.php" class="btn btn-outline-light" role="button">Sortir</a>
            </form>
          </li>
        </ul>
      </div>
    </nav>
    <div id="loader" class="loader"></div>
    <div id="loaddiv" class="hidden">
    <div class="container" id="usersList">
      <button id="showFormBtn" type="button" class="btn btn-primary marginTop"><i class="fas fa-plus"></i> Afegir</button>
      <table id="dtUsuaris" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">Usuari/a</th>
            <th class="th-sm">Tipus d'usuari/a</th>
            <th class="th-sm"></th>
          </tr>
        </thead>
        <tbody id="usuarisTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Usuari/a</th>
            <th>Tipus d'usuari/a</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- Div afegir usuari -->
    <div class="container contact_form" id="addUser">
      <button id="showListBtn" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar a la llista</button>
      <form id="formUser">
        <div class="form-group">
          <label for="username">Nom d'usuari/a</label>
          <input type="text" class="form-control" id="username" placeholder="Nom d'usuari" name="username">
        </div>
        <div class="form-group">
          <label for="password">Contrasenya</label>
          <input type="password" class="form-control" id="password" placeholder="Contrasenya"  name="password" autocomplete="password">
        </div>
        <fieldset class="form-group">
          Tipus d'usuari/a
          <div class="row">
            <div class="col-md-4 col-lg-4 col-sm-4">
              <label>
                <input value="0" type="radio" name="usertype" class="card-input-element" checked/>
                  <div class="panel panel-default card-input">
                    <div class="panel-body">
                      Docent
                    </div>
                  </div>
              </label>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-4">
              <label>
                <input value="1" type="radio" name="usertype" class="card-input-element" />
                  <div class="panel panel-default card-input">
                    <div class="panel-body">
                      Alumne
                    </div>
                  </div>
              </label>
            </div>
        </div>
        </fieldset>
        <div class="form-group row">
          <div class="col-sm-10">
            <button id="addUserBtn" type="button" class="btn btn-primary">Afegir usuari/a</button>
          </div>
        </div>
      </form>
    </div>
    <!-- Div modificar usuari -->
    <div class="container mod_form" id="modUserDiv">
      <button id="showListBtnMod" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar a la llista</button>
      <form id="formModUser">
        <div class="form-group">
          <label for="modId">ID</label>
          <input type="text" class="form-control" id="modId" placeholder="Id" disabled>
        </div>
        <div class="form-group">
          <label for="username">Nom d'usuari/a</label>
          <input type="text" class="form-control" id="modUsername" placeholder="Nom d'usuari/a" name="modusername">
        </div>
        <div class="form-group">
          <label for="password">Contrasenya</label>
          <input type="password" class="form-control" id="modPassword" placeholder="Contrasenya" autocomplete="password" name="modpassword">
        </div>
        <fieldset class="form-group">
          Tipus d'usuari/a
          <div class="row">
            <div class="col-md-4 col-lg-4 col-sm-4">
              <label>
                <input value="0" type="radio" name="modUsertype" class="card-input-element"/>
                  <div class="panel panel-default card-input">
                    <div class="panel-body">
                      Docent
                    </div>
                  </div>
              </label>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-4">
              <label>
                <input value="1" type="radio" name="modUsertype" class="card-input-element" />
                  <div class="panel panel-default card-input">
                    <div class="panel-body">
                      Alumne
                    </div>
                  </div>
              </label>
            </div>
        </div>
        </fieldset>
        <div class="form-group row">
          <div class="col-sm-10">
            <button id="modUserBtn" type="button" class="btn btn-primary">Modificar usuari/a</button>
          </div>
        </div>
      </form>
    </div>
    <!--Modal Delete product-->
    <div class="modal fade" id="deleteproductmodal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Eliminar usuari/a</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Vols eliminar el/la usuari/a?</p>
          </div>
          <div class="modal-footer">
            <button type="button" id="deleteUserDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tancar</button>
          </div>
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
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.bootstrapvalidator/0.5.2/js/bootstrapValidator.min.js"></script>
    <script src="js/users.js" type="text/javascript"></script>
  </body>
</html>
