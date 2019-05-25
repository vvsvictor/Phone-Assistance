<!DOCTYPE html>
<?php
        include '..\backend\include.php';
        //include '..\backend\includeAll.php';
        //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.

        ?>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>STA-Responsables</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/css/mdb.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"> -->

    <link rel="stylesheet" href="css/kendoTheme.css">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/sta.css">
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
          <li class="nav-item active">
            <a class="nav-link" href="#" style="color: #e4f9f5;">STA - Responsables<span class="sr-only">(current)</span></a>
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
      <!-- Formulario Añadir STA -->
      <div id="addSTA" class="container_add">
        <button id="returnSTA" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
        <br>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="dni_usuario">DNI USUARI</label>
          </div>
          <div class="col lg-6">
            <label for="situacion">SITUACIÓ ACTUAL</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input id="dni_usuario"/>
          </div>
          <div class="col lg-6">
            <input type="text" class="form-control" name="situacion"/>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="tel_cap">DATA EXPIRACIÓ</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <input class="datepicker" style="width: 100%"/>
          </div>
          <div class="col lg-6">

          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <ul>
                <li>
                  Servei TF
                  <span class="k-switch k-widget k-switch-off" role="switch" tabindex="0" aria-checked="false" aria-label="Servei TF">
                    <input data-role="switch" id="mail-switch" aria-label="Servei TF" type="checkbox"/>
                  <span class="k-switch-container">
                    <span class="k-switch-label-on">SI</span>
                    <span class="k-switch-label-off">NO</span>
                    <span class="k-switch-handle"></span>
                  </span>
                </span>
                </li>

              <li>Servei TCR <input id="servicios" aria-label="Servei TCR" /></li>
              <li>Servei CC <input id="servicios" aria-label="Servei CC" /></li>
            </ul>
          </div>
          <div class="col lg-3">

          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">

          </div>
          <div class="col lg-6">

          </div>
        </div>
      </div>
      <!--Formulario Añadir Doctores -->
      <div id="addResponsible" class="container_add">
        <button id="returnResponsible" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
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

      <div id="tableSTA">
        <button id="showFormSTA" type="button" class="btn btn-primary"><i class="fa fa-plus"></i>Afegir STA</button>
        <button id="showFormResponsible" type="button" class="btn btn-primary"><i class="fa fa-plus"></i>Afegir Responsable</button>
      <table id="dtSta" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">DNI</th>
            <th class="th-sm">Situació</th>
            <th class="th-sm">Data</th>
            <th class="th-sm"></th>
          </tr>
        </thead>
        <tbody id="staTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Situació</th>
            <th>Data</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <div id="pageResponsable">
    <section id="page">
      <button id="returnResponsible2" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
          <a href="#" class="c-tabs-nav__link is-active">Dades</a>
          <a href="#" class="c-tabs-nav__link ">Contacte</a>
          <div class="c-tab-nav-marker"></div>
        </div>

          <!-- RESPONSABLE : DADES -->
          <div class="c-tab">
            <div class="c-tab__content">
              <div class="container_responsible">
                <div class="content3">
                  <div class="direccion">
                    <h1 class="heading"> Dades</h1>
                    <div class="info">
                      <p class="sub-heading">Nom</p>
                      <p id="resNom" class="duration">Nati</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Cognoms</p>
                      <p id="resCognom" class="duration">Novo</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Carrer</p>
                      <p id="resCarrer" class="duration">Alcudia nº 23 3º 1ª</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Codí Postal</p>
                      <p id="resCodiPostal" class="duration">08029</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- RESPONSABLE : CONTACTE -->
          <div class="c-tab">
            <div class="c-tab__content">
              <div class="container_responsible">
                <div class="content3">
                  <div class="contacto">
                    <h1 class="heading">Contacte</h1>
                    <div class="info">
                      <p class="sub-heading">Telèfon</p>
                      <p id="resTel" class="duration">937764012</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Horari</p>
                      <p id="resHorari" class="duration">8h - 14h</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Data</p>
                      <p id="resData" class="duration">01-04-2017</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Prioritat</p>
                      <p id="resPrioritat" class="duration">Alta</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>
</div>
</div>
</div>
</section>
</div>

<!--Modal Delete STA-->
<div class="modal fade" id="deleteStamodal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Eliminar les dades STA de l'usuari</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Vols eliminar les dades STA de l'usuari?</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="deleteStaDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
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
    <script src="http://kendo.cdn.telerik.com/2019.2.514/js/kendo.all.min.js"></script>
    <script src="js/sta.js" type="text/javascript"></script>
  </body>
</html>
