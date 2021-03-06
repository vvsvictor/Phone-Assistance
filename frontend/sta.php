<!DOCTYPE html>
<?php
        include '..\backend\include.php';
        //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.

        ?>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>STA-Responsables</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <link rel="stylesheet" href="css/kendoTheme.css">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/sta.css">
    <link rel="stylesheet" href="css/dataTable.css">
    <link rel="stylesheet" href="css/initPage.css">
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
          <li class="nav-item">
            <a class="nav-link" href="capsmutues.php" style="color: #000000;">CAP</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#" style="color: #e4f9f5;">STA - Responsables<span class="sr-only">(current)</span></a>
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
      <!-- Formulario Añadir STA -->
      <div id="addSTA" class="container_add">
        <button id="returnSTA" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
        <br>
        <br>
        <div class="row">
          <div class="col-lg-6">
            <label for="dni_usuari">DNI Usuari</label>
            <input id="dni_usuari" style="width: 100%;" />
          </div>
          <div class="col lg-6">
            <label for="situacion">Situació Actual</label>
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
            <label for="data_contacte">Data Expiració</label>
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



      <div id="tableFitxaPersonal">
        <br/>
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

  <!--Pagina Tota la info-->
  <div id="pageTables">
    <section id="page">
      <button id="returnFP" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar enrere</button>
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
          <a href="#" class="c-tabs-nav__link is-active">Fitxa bàsica</a>
          <a href="#" class="c-tabs-nav__link ">STA</a>
          <a href="#" class="c-tabs-nav__link">Responsables</a>
          <div class="c-tab-nav-marker"></div>
        </div>
        <!--Informació bàsica-->
        <div class="c-tab is-active">
          <div class="c-tab__content">
            <div class="container_sta">
              <div class="content3">
                <div class="contacto">
                  <h1 class="heading">Fitxa bàsica</h1>
                  <div class="info">
                    <p class="sub-heading">ID</p>
                    <p id="fpid" class="duration"></p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">DNI</p>
                    <p id="fpDNI" class="duration"></p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Nom</p>
                    <p id="fpnom" class="duration"></p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Cognom</p>
                    <p id="fpcognom" class="duration"></p>
                    <p></p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
        <!-- STA -->
        <div class="c-tab">
          <div class="c-tab__content">
            <div class="container_sta">
              <div class="content3">
                <div class="contacto">
                  <h1 class="heading">Serveis Contractats</h1>
                  <button id="modSTA" type="button" class="btn btn-primary marginTop">Modificar</button>
                  <button id="saveSTA" type="button" class="btn btn-primary marginTop">Guardar</button>
                  <div class="info">
                    <p class="sub-heading">Situació actual</p>
                    <p id="staActualS" class="duration"></p>
                    <div id="staActualSModDiv">
                      <select id="staActualSMod" style="width: 100%;" >
                      </select>
                    </div>

                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Data de contractació</p>
                    <p id="staHDate" class="duration"></p>
                    <div id="staHDateModDiv">
                      <input id="staHDateMod" value="" class="datePickerKendo" title="datepicker" style="width: 100%" />
                    </div>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Telèfon Fixe</p>
                    <input id="tf_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" checked="unchecked" disabled/>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Terminal de Control Remot</p>
                    <input id="tcr_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" disabled/>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Custòdia de Claus</p>
                    <input id="cc_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" checked="checked" disabled/>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Terminal Mòbil</p>
                    <input id="tm_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" checked="checked" disabled/>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Teleassistència Mòbil</p>
                    <input id="tam_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" checked="checked" disabled/>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">GPS</p>
                    <input id="gps_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" checked="checked" disabled/>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">UMT</p>
                    <input id="umt_service" type="checkbox" class="notifications-switch" aria-label="Notifications Switch" checked="checked" disabled/>
                    <p></p>
                  </div>
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
              <div id="tableResponsible">
                <button id="showFormResponsible" type="button" class="btn btn-primary marginTop"><i class="fa fa-plus"></i> Afegir Responsable</button>
                <table id="dtResponsible" class="table table-striped table-bordered" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th class="th-sm">Id</th>
                      <th class="th-sm">Prioritat</th>
                      <th class="th-sm">Nom</th>
                      <th class="th-sm">Cognom</th>
                      <th class="th-sm"></th>
                    </tr>
                  </thead>
                  <tbody id="tbResponsible"></tbody>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Prioritat</th>
                      <th>Nom</th>
                      <th>Cognom</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <!--Responsible all info-->
              <div id="responsibleInfoDiv" class="responsibleInfo container_add contacto">

                <h1 class="heading">Informació del responsable</h1>
                <button id="returnResponsible" type="button" class="btn btn-primary"><i class="fa fa-reply"></i> Tornar enrere</button>
                <button id="responsibleModBtn" type="button" class="btn btn-primary">Modificar</button>
                <div class="info">
                  <p class="sub-heading">ID</p>
                  <p id="idres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Prioritat</p>
                  <p id="prires" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Nom</p>
                  <p id="nomres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Cognom</p>
                  <p id="cognomres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Direcció</p>
                  <p id="direcciores" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Codi Postal</p>
                  <p id="cpres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Telèfon</p>
                  <p id="telres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Hora de preferència de trucada</p>
                  <p id="hourres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Data de creació del responsable</p>
                  <p id="dateres" class="duration"></p>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Raó del responsable</p>
                  <p id="reasonres" class="duration"></p>
                  <p></p>
                </div><br>
                <button id="deleteResponsibleBtn" type="button" class="btn btn-danger"><i class='fa fa-trash'></i> Eliminar</button>
              </div>
              <!--Responsible all info modify-->
              <div id="responsibleModDiv" class="responsibleInfo container_add contacto">

                <h1 class="heading">Informació del responsable</h1>
                <button id="returnResponsible3" type="button" class="btn btn-primary"><i class="fa fa-reply"></i> Tornar enrere</button>
                <button id="ModResponsibleBtn" type="button" class="btn btn-primary">Guardar</button>
                <div class="info">
                  <p class="sub-heading">Prioritat</p>
                  <select id="priresMod" style="width: 18%;"></select>
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Nom</p>
                  <input type="text" id="nomresMod" style="width: 18%;" class="form-control" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Cognom</p>
                  <input type="text" id="cognomresMod" style="width: 18%;" class="form-control" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Direcció</p>
                  <input type="text" id="direccioresMod" style="width: 18%;" class="form-control" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Codi Postal</p>
                  <input type="text" id="cpresMod" style="width: 18%;" class="form-control" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Telèfon</p>
                  <input type="text" id="telresMod" class="phoneMask form-control" style="width: 18%;" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Hora de preferència de trucada</p>
                  <input id="hourresMod" title="timepicker" style="width: 18%;" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Data de creació del responsable</p>
                  <input id="dateresMod" value="" class="datePickerKendo" title="datepicker" style="width: 18%" />
                  <p></p>
                </div>
                <div class="info">
                  <p class="sub-heading">Raó del responsable</p>
                  <input type="text" id="reasonresMod" style="width: 18%;" class="form-control" />
                  <p></p>
                </div><br>

              </div>

              <!--Formulario Añadir Responsable -->
              <div id="addResponsible" class="container_add">
                <button id="returnResponsible2" type="button" class="btn btn-primary"><i class="fa fa-reply"></i> Tornar enrere</button>
                <br>
                <br>
                <div class="row">
                  <div class="col-lg-6">
                    <label for="addPrioritat">Prioritat</label>
                    <select id="addPrioritat" style="width: 100%;" class="maxWidth dropDown"></select>
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-lg-6">
                    <label for="nom_responsableAdd">Nom</label>
                    <input type="text" class="form-control" id="nom_responsableAdd"/>
                  </div>
                  <div class="col-lg-6">
                    <label for="cognoms_responsableAdd">Cognoms</label>
                    <input type="text" class="form-control" id="cognoms_responsableAdd"/>
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-lg-6">
                    <label for="adreca_responsableAdd">Adreça</label>
                    <input type="text" class="form-control" id="adreca_responsableAdd"/>
                  </div>
                  <div class="col-lg-6">
                    <label for="cp_responsableAdd">Codi Postal</label>
                    <input type="text" class="form-control" id="cp_responsableAdd"/>
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-lg-6">
                    <label for="tel_responsableAdd">Telèfon</label>
                    <input type="text" class="form-control" id="tel_responsableAdd"/>
                  </div>
                  <div class="col-lg-6">
                    <label for="hora_preferibleAdd">Hora Preferible</label>
                    <input id="hora_preferibleAdd" title="timepicker" style="width: 100%;" />
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-lg-6">
                    <label for="data_contactAdd">Data Contacte</label>
                    <input id="data_contactAdd" class="datePickerKendo" title="datepicker" style="width: 100%"/>
                  </div>
                  <div class="col-lg-6">
                    <label for="rao">Raó</label>
                    <textarea class="form-control" id="raoAdd" rows="3"></textarea>
                  </div>
                </div><br>
                <button id="addResponsibleBtn" type="button" class="btn btn-primary">Afegir Responsable</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
