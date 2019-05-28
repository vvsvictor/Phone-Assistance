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
    <link rel="stylesheet" href="css/dataTable.css">
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
              <a class="nav-link" href="users.php" style="color: #40514e;">Usuaris/es</a>
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
            <label for="dni_usuari">DNI USUARI</label>
            <input id="dni_usuari" style="width: 100%;" />
          </div>
          <div class="col lg-6">
            <label for="situacion">SITUACIÓ ACTUAL</label>
            <select id="addSituacio" style="width: 100%;" class="maxWidth dropDown">
              <option>Alta</option>
              <option>Baixa</option>
              <option>Baixa Temporal</option>
              <option>Baixa Definitiva</option>
            </select>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="data_contacte">DATA EXPIRACIÓ</label>
            <input id="data_contacte" style="width: 100%"/>
          </div>
          <div class="col lg-6">
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <div class="row">
              Servei TF &nbsp; <input data-role="switch" id="serveitf" aria-label="Servei TF" type="checkbox"/>
            </div>
            <div class="row">
              Servei TCR &nbsp; <input data-role="switch" id="serveitcr" aria-label="Servei TF" type="checkbox"/>
            </div>
            <div class="row">
              Servei CC &nbsp; <input data-role="switch" id="serveicc" aria-label="Servei TF" type="checkbox"/>
            </div>
          </div>
          <div class="col lg-6">
            <div class="row">
              Servei TM &nbsp; <input data-role="switch" id="serveitm" aria-label="Servei TF" type="checkbox"/>
            </div>
            <div class="row">
              Servei TAM &nbsp; <input data-role="switch" id="serveitam" aria-label="Servei TF" type="checkbox"/>
            </div>
            <div class="row">
              Servei GPS &nbsp; <input data-role="switch" id="serveigps" aria-label="Servei TF" type="checkbox"/>
            </div>
            <div class="row">
              Servei UMT &nbsp; <input data-role="switch" id="serveiumt" aria-label="Servei TF" type="checkbox"/>
            </div>
          </div>
        </div>
      </div>

      <!--Formulario Añadir Responsable -->
      <div id="addResponsible" class="container_add">
        <button id="returnResponsible" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
        <br>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="dninie_usuari">DNI</label>
            <input id="dninie_usuari" style="width: 100%;" />
          </div>
          <div class="col-lg-6">
            <label for="addPrioritat">PRIORITAT</label>
            <select id="addPrioritat" style="width: 100%;" class="maxWidth dropDown">
              <option>Alta</option>
              <option>Mitjana</option>
              <option>Baixa</option>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="nom_responsable">NOM</label>
            <input type="text" class="form-control" name="nom_responsable"/>
          </div>
          <div class="col-lg-6">
            <label for="cognoms_responsable">COGNOMS</label>
            <input type="text" class="form-control" name="cognoms_responsable"/>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="adreca_responsable">ADREÇA</label>
            <input type="text" class="form-control" name="adreca_responsable"/>
          </div>
          <div class="col-lg-6">
            <label for="cp_responsable">CODI POSTAL</label>
            <input type="text" class="form-control" name="cp_responsable"/>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="tel_responsable">TELEFON</label>
            <input type="text" class="form-control" name="tel_responsable"/>
          </div>
          <div class="col-lg-6">
            <label for="hora_preferible">HORA PREFERIBLE</label>
            <input id="hora_preferible" title="timepicker" style="width: 100%;" />
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="data_contact">DATA CONTACTE</label>
            <input id="data_contact" class="datePickerKendo" title="datepicker" style="width: 100%"/>
          </div>
          <div class="col-lg-6">
            <label for="rao">RAÓ</label>
            <textarea class="form-control" id="rao" rows="3"></textarea>
          </div>
        </div>
      </div>

      <div id="tableFitxaPersonal">
        <br/>
        <button id="showFormSTA" type="button" class="btn btn-primary"><i class="fa fa-plus"></i>Afegir STA</button>
        <button id="showFormResponsible" type="button" class="btn btn-primary"><i class="fa fa-plus"></i>Afegir Responsable</button>
      <table id="dtFitxaPersonal" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">DNI</th>
            <th class="th-sm">Nom</th>
            <th class="th-sm">Cognom</th>
            <th class="th-sm"></th>
          </tr>
        </thead>
        <tbody id="fitxaPersonalTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Nom</th>
            <th>Cognom</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <div id="pageTables">
    <section id="page">
      <button id="returnCAP2" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar enrere</button>
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
          <a href="#" class="c-tabs-nav__link is-active">STA</a>
          <a href="#" class="c-tabs-nav__link">Responsible</a>
          <div class="c-tab-nav-marker"></div>
        </div>
        <!-- STA -->
        <div class="c-tab">
          <div class="c-tab__content">
            <div class="container_sta">
              <div class="content3">
                <div id="tableSTA">
                  <button id="showFormSTA" type="button" class="btn btn-primary marginTop"><i class="fa fa-plus"></i> Afegir Doctor</button>
                  <table id="dtSTA" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                      <tr>
                        <th class="th-sm">Id</th>
                        <th class="th-sm">DNI</th>
                        <th class="th-sm">Situació Actual</th>
                        <th class="th-sm">Data Expiració</th>
                        <th class="th-sm"></th>
                      </tr>
                    </thead>
                    <tbody id="tbSTA"></tbody>
                    <tfoot>
                      <tr>
                        <th>Id</th>
                        <th>DNI</th>
                        <th>Situació Actual</th>
                        <th>Data Expiració</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Responsible -->
      <div class="c-tab">
        <div class="c-tab__content">
          <div class="container_responsible">
            <div class="content3">
              <div id="tableSTA">
                <button id="showFormResponsible" type="button" class="btn btn-primary marginTop"><i class="fa fa-plus"></i> Afegir Doctor</button>
                <table id="dtResponsible" class="table table-striped table-bordered" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th class="th-sm">Id</th>
                      <th class="th-sm">DNI</th>
                      <th class="th-sm">Prioritat</th>
                      <th class="th-sm">Nom</th>
                      <th class="th-sm">Cognom</th>
                      <th class="th-sm"></th>
                    </tr>
                  </thead>
                  <tbody id="tbSTA"></tbody>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>DNI</th>
                      <th>Prioritat</th>
                      <th>Nom</th>
                      <th>Cognom</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>

  <div id="pageView">
    <section id="page">
      <button id="returnResponsible2" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
          <a href="#" class="c-tabs-nav__link is-active">Dades</a>
          <a href="#" class="c-tabs-nav__link ">Contacte</a>
          <div class="c-tab-nav-marker"></div>
        </div>
          <!-- RESPONSABLE : DADES -->
          <div class="c-tab is-active">
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
                      <p class="sub-heading">Codi Postal</p>
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

<!--Modal Delete deleteResponsible-->
<div class="modal fade" id="deleteResponsiblemodal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Eliminar Responsable</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Vols eliminar les dades del Responsable?</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="deleteResponsibleDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
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
