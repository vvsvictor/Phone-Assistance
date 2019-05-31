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
    <!-- <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.2.514/styles/kendo.flat.min.css" /> -->
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
    <link rel="stylesheet" href="css/dataTable.css">
    <link rel="stylesheet" href="css/kendoTheme.css">
    <link rel="stylesheet" href="css/caps.css">
  </head>
  <body class="addFont">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #11999E; box-shadow: 2px 5px 10px #40514E;">
      <a class="navbar-brand" href="#"><img src="images/PA-Mini.png"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.php" style="color: #000000;">Inici </a>
          </li>
          <?php
            if ($_SESSION['user']['usertype'] == 0) {
              echo '<li class="nav-item">
                <a class="nav-link" href="users.php" style="color: #000000;">Usuaris/àries</a>
              </li>';
            }
          ?>

          <li class="nav-item">
            <a class="nav-link" href="fitxaPersonal.php" style="color: #000000;">Fitxa personal</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#" style="color: #e4f9f5;">CAP<span class="sr-only">(current)</span></a>
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
      <div class="container">
        <!-- Formulario Añadir CAPS -->
        <div id="addCap" class="container_add">
          <button id="returnCAP" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar enrere</button>
          <br>
          <br>
          <div class="row">
            <div class="col-lg-6">

            </div>
            <div class="col lg-6">

            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <label for="nom_cap">Nom del cap</label>
              <input id="addNom" type="text" class="form-control" name="nom_cap"/>
            </div>
            <div class="col lg-6">
              <label for="direccio_cap">Direcció</label>
              <input id="addDireccio" type="text" class="form-control" name="direccio_cap"/>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-lg-6">
              <label for="tel_cap">Telèfon</label>
              <input id="addTel" type="text" class="form-control phoneMask" name="tel_cap"/>
            </div>
            <div class="col lg-6">
              <label for="horari_cap">Horari</label>
              <input id="addHorari" type="text" class="form-control" name="horari_cap"/>
            </div>
          </div><br>
          <button id="addCapBtn" type="button" class="btn btn-primary marginTop"> Afegir CAP</button><br>
        </div>

        <!--Formulario Añadir Doctores -->
        <div id="addDoctor" class="container_add">
          <button id="returnDoctor" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar Enrere</button>
          <br>
          <br>
          <div class="row">
            <div class="col-lg-6">
              <label for="nom_cap">Nom del doctor/a</label>
              <input id="addNameDr" type="text" class="form-control" name="nom_doctor"/>
            </div>
            <div class="col lg-6">
              <label for="direccio_cap">Cognoms del doctor/a</label>
              <input id="addSurnameDr" type="text" class="form-control" name="direccio_doctor"/>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-lg-6">
              <label for="genere_doc">Gènere</label>
              <input id="addGenereDr" type="text" class="form-control" name="genere"/>
            </div>
            <div class="col lg-6">
              <label for="especialitzacions">Especialització</label>
              <select id="especialitzacions" style="width: 100%;" >
              </select>
            </div>
          </div>
          <button id="addDoctorBtn" type="button" class="btn btn-primary marginTop">Afegir Doctor/a</button>
        </div>

        <!--Formulario Modificar Doctores -->
        <div id="modDoctor" class="container_add">
          <button id="returnDoctorMod" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar enrere</button>
          <br>
          <br>
          <div class="row">
            <div class="col-lg-6">
              <label for="nom_cap">Id doctor/a</label>
              <input id="modIdDr" type="text" class="form-control" name="id_doctor" disabled/>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <label for="modNameDr">Nom del doctor/a</label>
              <input id="modNameDr" type="text" class="form-control" name="nom_doctor"/>
            </div>
            <div class="col lg-6">
              <label for="modSurnameDr">Cognoms del doctor/a</label>
              <input id="modSurnameDr" type="text" class="form-control" name="cognoms_doctor"/>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-lg-6">
              <label for="modGenereDr">Gènere</label>
              <input id="modGenereDr" type="text" class="form-control" name="genere"/>
            </div>
            <div class="col lg-6">
              <label for="modespecialitzacions">Especialització</label>
              <select id="modespecialitzacions" style="width: 100%;" >
              </select>
            </div>
          </div>
          <button id="modDoctorBtn" type="button" class="btn btn-primary marginTop">Modificar Doctor</button>
        </div>


        <div id="tableCaps">
          <button id="showFormCAP" type="button" class="btn btn-primary marginTop"><i class="fas fa-plus"></i> Afegir CAP</button>

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
    </div>
    <div id="pageCAPS">
      <section id="page">
        <button id="returnCAP2" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar enrere</button>
        <div id="tabs" class="c-tabs">
          <div class="c-tabs-nav">
            <a href="#" class="c-tabs-nav__link is-active">Info CAP</a>
            <a href="#" class="c-tabs-nav__link">Doctors</a>
            <div class="c-tab-nav-marker"></div>
          </div>
          <!-- CAPS -->
          <div class="c-tab is-active">
            <div class="c-tab__content">
              <div class="container_caps">
                <div class="content3">
                  <div class="direccion">
                    <h1 class="heading"> CAP</h1>
                    <div class="info">
                      <p class="sub-heading">Id</p>
                      <p id="cid" class="duration">Id_cap</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Nom</p>
                      <p id="cname" class="duration">Nom_CAP</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Adreça</p>
                      <p id="caddress" class="duration">Carrer Alcudia nº 23 3º 1ª</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Telèfon</p>
                      <p id="cphone" class="duration">93 458 669 72</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Horari</p>
                      <p id="cschedule" class="duration">9h - 21h</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- DOCTORS -->
          <div class="c-tab">
            <div class="c-tab__content">
              <div class="container_doctors">
                <div class="content3">
                  <div id="tableDoctors">
                    <button id="showFormDoctor" type="button" class="btn btn-primary marginTop"><i class="fa fa-plus"></i> Afegir Doctor/a</button>
                    <table id="dtDoctor" class="table table-striped table-bordered" cellspacing="0" width="100%">
                      <thead>
                        <tr>
                          <th class="th-sm">Id</th>
                          <th class="th-sm">Nom</th>
                          <th class="th-sm">Cognom</th>
                          <th class="th-sm">Genere</th>
                          <th class="th-sm">Especialització</th>
                          <th class="th-sm"></th>
                        </tr>
                      </thead>
                      <tbody id="tbDoctors"></tbody>
                      <tfoot>
                        <tr>
                          <th>Id</th>
                          <th>Nom</th>
                          <th>Cognom</th>
                          <th>Genere</th>
                          <th>Especialització</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
              </div>
            </div>
          </div>
          <!-- STA -->
        </div>
      </section>
    </div>

      <!--Modal Delete cap-->
      <div class="modal fade" id="deletecapmodal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminar Cap</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Vols eliminar el cap?</p>
            </div>
            <div class="modal-footer">
              <button type="button" id="deleteCapDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Tancar</button>
            </div>
          </div>
        </div>
      </div>

      <!--Modal Delete dr-->
      <div class="modal fade" id="deletedrmodal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminar Doctor/a</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Vols eliminar el doctor/a?</p>
            </div>
            <div class="modal-footer">
              <button type="button" id="deleteDrDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Tancar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/js/mdb.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- kendo js-->
    <script src="http://kendo.cdn.telerik.com/2019.2.514/js/kendo.all.min.js"></script>
    <script src="js/cap.js" type="text/javascript"></script>
  </body>
</html>
