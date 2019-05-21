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
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/css/mdb.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"> -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
    <link rel="stylesheet" href="css/fichaPersonal.css">
    <link rel="stylesheet" href="css/dataTable.css">
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

          <li class="nav-item active">
            <a class="nav-link" href="#" style="color: #e4f9f5;">Fitxa personal<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="capsmutues.php" style="color: #40514e;">CAP - Mútues</a>
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
      <button id="showFormPF" type="button" class="btn btn-primary"><i class="fa fa-plus"></i></button>
      <div class="container_add">
        <button id="returnPF" type="button" class="btn btn-primary"><i class="fa fa-reply"></i></button>
        <div class="widget">
          <legend>Select a Location: </legend>
          <label for="radio-1">New York</label>
          <input type="radio" name="radio-1" id="radio-1">
          <label for="radio-2">Paris</label>
          <input type="radio" name="radio-1" id="radio-2">
          <label for="radio-3">London</label>
          <input type="radio" name="radio-1" id="radio-3">
        </div>
      </div>
      <table id="dtFitxaPersonal" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">Id</th>
            <th class="th-sm">Nom</th>
            <th class="th-sm">Cognom</th>
            <th class="th-sm">DNI</th>
            <th class="th-sm">Provincia</th>
            <th class="th-sm"></th>
          </tr>
        </thead>
        <tbody id="fitxaPersonalTable"></tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Cognom</th>
            <th>DNI</th>
            <th>Provincia</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <br><br>
    <section id="page">
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
                <a href="#" class="c-tabs-nav__link is-active">Fitxa Personal</a>
                <a href="#" class="c-tabs-nav__link">CAPS</a>
                  <a href="#" class="c-tabs-nav__link">Responsable</a>
                <a href="#" class="c-tabs-nav__link">STA</a>
                <a href="#" class="c-tabs-nav__link">Trucades</a>
                <div class="c-tab-nav-marker"></div>
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
                        <p class="sub-heading">Nom</p>
                        <p id="fpname" class="duration">Gimena</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Cognoms</p>
                        <p id="fpsurname" class="duration">del Carmen Ortega</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">DNI</p>
                        <p id="fpdninie" class="duration">30762309F</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Data de naixement</p>
                        <p id="fpbirthdate" class="duration">10-04-1912</p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div class="content">
                    <div class="direccion">
                      <h1 class="heading"> Direcció</h1>
                      <div class="info">
                        <p class="sub-heading">Provincia</p>
                        <p id="fpprovince" class="duration">Barcelona</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Comarca</p>
                        <p id="fpcomarca" class="duration">Barcelonès</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Municipi</p>
                        <p id="fpmunicipality" class="duration">Barcelona</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Carrer</p>
                        <p id="fpaddress" class="duration">Alcudia nº 23 3º 1ª</p>
                        <p></p>
                      </div>
                    </div>
                  </div>

                  <div class="content">
                    <div class="contacto">
                      <h1 class="heading">Contacte</h1>
                      <div class="info">
                        <p class="sub-heading">Telèfon fixe</p>
                        <p id="fpphone" class="duration">937764012</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Telèfon móvil</p>
                        <p id="fpmobile_phone" class="duration">672750032</p>
                        <p></p>
                      </div>
                      <div class="info">
                        <p class="sub-heading">Telèfon treball</p>
                        <p id="fpwork_phone" class="duration">903412653</p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <!-- CAPS -->
        <div class="c-tab">
            <div class="c-tab__content">
              <div class="container_caps">
                <div class="content2">
                  <div class="direccion">
                    <h1 class="heading"> CAP</h1>
                    <div class="info">
                      <p class="sub-heading">Nom</p>
                      <p class="duration">Nom_CAP</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Comarca</p>
                      <p class="duration">Barcelonès</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Adreça</p>
                      <p class="duration">Carrer Alcudia nº 23 3º 1ª</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Telèfon</p>
                      <p class="duration">93 458 669 72</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Horari</p>
                      <p class="duration">9h - 21h</p>
                      <p></p>
                    </div>
                  </div>
                </div>

                <div class="content2a">
                  <div class="contacto">
                    <h1 class="heading">Doctor/a</h1>
                    <div class="info">
                      <p class="sub-heading">Nom</p>
                      <p class="duration">Pedro</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Cognoms</p>
                      <p class="duration">Hernandez Torres</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Sexe</p>
                      <p class="duration">Home</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Especialització</p>
                      <p class="duration">Capçalera</p>
                      <p></p>
                    </div>
                  </div>
                </div>

                <div class="content3">
                  <div class="contacto">
                    <h1 class="heading">Ubicació</h1>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <!-- RESPONSABLE -->
        <div class="c-tab">
            <div class="c-tab__content">
              <div class="container_responsible">
                <div class="content2">
                  <div class="direccion">
                    <h1 class="heading"> Dades</h1>
                    <div class="info">
                      <p class="sub-heading">Nom</p>
                      <p class="duration">Nati</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Cognoms</p>
                      <p class="duration">Novo</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Carrer</p>
                      <p class="duration">Alcudia nº 23 3º 1ª</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Codí Postal</p>
                      <p class="duration">08029</p>
                      <p></p>
                    </div>
                  </div>
                </div>

                <div class="content2a">
                  <div class="contacto">
                    <h1 class="heading">Contacte</h1>
                    <div class="info">
                      <p class="sub-heading">Telèfon</p>
                      <p class="duration">937764012</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Horari</p>
                      <p class="duration">8h - 14h</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Data</p>
                      <p class="duration">01-04-2017</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Prioritat</p>
                      <p class="duration">Alta</p>
                      <p></p>
                    </div>
                  </div>
                </div>

                <div class="content3">
                  <div class="contacto">
                    <h1 class="heading">Raó</h1>
                    <div class="info">
                      <p class="duration">Familiar de primer grau</p>
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
                    <div class="info">
                      <p class="sub-heading">Telèfon Fixe</p>
                      <p class="duration">Alta</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Terminal de Control Remot</p>
                      <p class="duration">Baixa</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Custòdia de Claus</p>
                      <p class="duration">Baixa Temporal</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Terminal Mòbil</p>
                      <p class="duration">Alta</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Teleassistència Mòbil</p>
                      <p class="duration">Alta</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">GPS</p>
                      <p class="duration">Alta</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">UMT</p>
                      <p class="duration">Baixa</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <!-- LLAMADAS -->
        <div class="c-tab">
            <div class="c-tab__content">
            </div>
        </div>
      </div>
    </section>

    <!--Modal Delete product-->
    <div class="modal fade" id="deletecardmodal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title">Eliminar Fitxa</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
            <p>Vols eliminar la Fitxa?</p>
          </div>
          <div class="modal-footer">
            <button type="button" id="deleteCardDef" class="btn btn-danger" data-dismiss="modal">Eliminar</button>
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
    <script src="js/fitxaPersonal.js" type="text/javascript"></script>
  </body>
</html>
