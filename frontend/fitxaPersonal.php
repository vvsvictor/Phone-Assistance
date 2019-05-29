<!DOCTYPE html>
<?php
include '..\backend\include.php';
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
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <!-- <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.2.514/styles/kendo.common.min.css" /> -->
  <!-- <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.2.514/styles/kendo.blueopal.min.css" /> -->
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="css/initPage.css">
  <link rel="stylesheet" href="css/kendoTheme.css">
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
          <a class="nav-link" href="users.php" style="color: #40514e;">Usuaris/es</a>
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
            echo 'Hola, '.$_SESSION['user']['username'].'  ';
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
  <div id="loader" class="loader"></div>
  <div id="loaddiv" class="hidden">
  <div class="container">
    <div id="addFp" class="form">
      <button id="returnPF" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar enrere</button>
      <br>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="nom">Nom</label>
          <input id="addNom" type="text" class="form-control" name="nom"/>
        </div>
        <div class="col-lg-6">
          <label for="cognom">Cognom</label>
          <input id="addCognom" type="text" class="form-control" name="cognom"/>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="dni">DNI</label>
          <input id="addDni" type="text" class="form-control" name="dni"/>
        </div>
        <div class="col-lg-6">
          <label for="genere">Gènere</label>
          <select id="addGenere" style="width: 100%;" class="maxWidth dropDown">
            <option>Dona</option>
            <option>Home</option>
            <option>Intersexual</option>
            <option>Intersexual Home</option>
            <option>Intersexual Dona</option>
            <option>Transsexual</option>
            <option>Transsexual Dona</option>
            <option>Transsexual Home</option>
          </select>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="idioma">Idioma</label>
          <select onchange="altreListener()" id="addIdioma" style="width: 100%;" class="maxWidth"></select>&nbsp;
          <input id="addIdiomaAltre" type="text" class="form-control" placeholder="Idioma">
        </div>
        <div class="col-lg-6">
          <label for="idioma_s">Idioma de signes</label><br>
          <label for="catala_is">Català</label>
          <input value="1" type="radio" class="opciones" name="idioma_s" id="catala_is">
          <label for="castella_is">Castellà</label>
          <input value="2" type="radio" class="opciones" name="idioma_s" id="castella_is">
          <label for="angles_is">Anglès</label>
          <input value="3" type="radio" class="opciones" name="idioma_s" id="angles_is">
          <label for="no_is">No</label>
          <input value="0" type="radio" class="opciones" name="idioma_s" id="no_is">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="data_naixament" >Data de naixement</label>
          <input id="addDataNaixement" type="text" class="datepicker" style="width: 100%;"/>
        </div>
        <div class="col-lg-6">
          <label for="adresa">Adreça</label><br>
          <div class="row"  style="margin-left:1%">
              <select id="addTipus" class="maxWidth dropDown" style="width: 15%;">
                <option>C/</option>
                <option>Av.</option>
                <option>Pg.</option>
                <option>Ptge.</option>
                <option>Rbla.</option>
                <option>Rda.</option>
                <option>V.</option>
              </select>
              <input id="addAdreca" type="text" class="form-control" name="adresa" placeholder="Nom adreça" style="width: 30%; margin-left:2%;"/>
              <input id="addPis" type="text" class="form-control" name="pis" placeholder="Pis" style="width: 12%; margin-left:2%;"/>
              <input id="addPorta" type="text" class="form-control" name="porta" placeholder="Porta" style="width: 12%;  margin-left:2%;"/>
              <input id="addEscala" type="text" class="form-control" name="porta" placeholder="Esc." style="width: 12%;  margin-left:2%;"/>
            </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="tipus_habitatge">Tipus d'habitatge</label>
          <input id="addTipus_habitatge" name="tipusHabitatge" style="width: 100%;"/>
        </div>
        <div class="col-lg-6">
          <label for="titularitat">Titularitat de l'habitatge</label><br>
          <label for="propietari">Propietari</label>
          <input value="1" type="radio" class="opciones" name="titularitat" id="propietari">
          <label for="arrendatari">Arrendatari</label>
          <input value="2" type="radio" class="opciones" name="titularitat" id="arrendatari">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="provincias">Provincia</label>
          <input style="width: 100%;" id="provincias" onchange="provinciasListener()"/>
        </div>
        <div class="col-lg-6" id="divComarcas">
          <label for="comarcas">Comarca</label>
          <input style="width: 100%;" id="comarcas"/>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6" id="divMunicipios">
          <label for="municipios">Municipis</label>
          <input style="width: 100%;" id="municipios"/>
        </div>
        <div class="col-lg-6">
          <label for="tel_fijo">Telèfon fixe</label>
          <input id="addTel_fijo" type="text" class="phoneMask form-control" name="tel_fijo"/>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-lg-6">
          <label for="movil">Telèfon Movil</label>
          <input id="addMovil" type="text" class="phoneMask form-control" name="movil"/>
        </div>&nbsp;
        <div class="col-lg-6">
          <label for="tel_treball">Telèfon Treball</label>
          <input id="addTelTreball" type="text" class="phoneMask form-control" name="tel_treball"/>
        </div>
      </div><br>
      <div class="row">
        <div class="col">
          <button id="addPersonalCard" type="button" class="btn btn-primary">Insertar Fitxa Personal</button>
        </div>
      </div>
    </div>
    <div id="tableFitxaPersonal">
      <button id="showFormPF" type="button" class="btn btn-primary marginTop"><i class="fas fa-plus"></i> Afegir</button>
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
  </div>
  <br><br>
  <div id="pageFp">
    <section id="page">
      <button id="returnPF2" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar Enrere</button>
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
          <a href="#" class="c-tabs-nav__link is-active">Fitxa Personal</a>
          <a href="#" class="c-tabs-nav__link">Mutua</a>
          <a href="#" class="c-tabs-nav__link">Responsable</a>
          <div class="c-tab-nav-marker"></div>
        </div>
        <!-- FICHA PERSONAL-->
        <div class="c-tab is-active">
          <div class="c-tab__content">
            <div class="container_ficha">
              <button id="modFormPF" type="button" class="btn btn-primary marginBtn leftMargin"> Modificar</button>
              <div class="container">
                <div class="content">
                  <div class="direccion">
                    <h1 class="heading"> Dades</h1>
                    <div class="info">
                      <p class="sub-heading">DNI</p>
                      <p id="fpdninie" class="duration">30762309F</p>
                      <p></p>
                    </div>
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
                      <p class="sub-heading">Genere</p>
                      <p id="fpgender" class="duration">Genere</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Data de naixement</p>
                      <p id="fpbirthdate" class="duration"></p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Idioma</p>
                      <p id="fpidioma" class="duration"></p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Idioma de signes</p>
                      <p id="fpidioma_s" class="duration"></p>
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
                    <div class="info">
                      <p class="sub-heading">Tipus d'habitatge</p>
                      <p id="fptype_house" class="duration">Pis</p>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Titularitat de l'habitatge</p>
                      <p id="fpownership" class="duration">Arrendatari</p>
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
              <div class="content3">
                <div class="contacto">
                  <h1 class="heading">Mutua</h1>
                  <div class="info">
                    <p class="sub-heading">Nom</p>
                    <p id="fpmutua" class="duration">Mutua 1</p>
                    <p></p>
                  </div>
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
              <div class="content2a">
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

              <div class="content3">
                <div class="contacto">
                  <h1 class="heading">Raó</h1>
                  <div class="info">
                    <p id="resRao" class="duration">Familiar de primer grau</p>
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
  <div id="modpageFp">
    <section id="page">
      <button id="returnPF3" type="button" class="btn btn-primary marginTop"><i class="fa fa-reply"></i> Tornar Enrere</button>
      <button id="modFormFP2" type="button" class="btn btn-primary marginTop"><i class="fas fa-save"></i> Guarda</button>
      <div id="tabs" class="c-tabs">
        <div class="c-tabs-nav">
          <a href="#" class="c-tabs-nav__link is-active">Fitxa Personal</a>
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
                      <input id="modId" type="hidden" class="form-control" name="id" disabled/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">DNI</p>
                      <input id="moddninie" type="text" class="form-control" name="dni" disabled/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Nom</p>
                      <input id="modNom" type="text" class="form-control" name="nom"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Cognoms</p>
                      <input id="modCognom" type="text" class="form-control" name="cognom"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Genere</p>
                      <input id="modgenere" type="text" class="form-control" name="genere"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Data de naixement</p>
                      <input id="modDataNaixement" type="text" class="datepicker" style="width: 100%;"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Idioma</p>
                      <select onchange="altreListener()" id="modIdioma" style="width: 100%;" class="maxWidth"></select>&nbsp;
                      <input id="addIdiomaAltre" type="text" class="form-control" placeholder="Idioma">
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Idioma de signes</p>
                      <!-- <label for="idioma_s">Idioma de signes</label><br> -->
                      <label for="modcatala_is">Català</label>
                      <input value="1" type="radio" class="opciones" name="modidioma_s" id="modcatala_is">
                      <label for="modcastella_is">Castellà</label>
                      <input value="2" type="radio" class="opciones" name="modidioma_s" id="modcastella_is">
                      <label for="modangles_is">Anglès</label>
                      <input value="3" type="radio" class="opciones" name="modidioma_s" id="modangles_is">
                      <label for="modno_is">No</label>
                      <input value="0" type="radio" class="opciones" name="modidioma_s" id="modno_is">
                      <p></p>
                    </div>
                  </div>
                </div>
                <div class="content">
                  <div class="direccion">
                    <h1 class="heading"> Direcció</h1>
                    <div class="info">
                      <p class="sub-heading">Provincia</p>
                      <input id="modprovince" type="text" class="form-control" name="provincias"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Comarca</p>
                      <input style="width: 100%;" id="modcomarcas"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Municipi</p>
                      <input style="width: 100%;" id="modmunicipios"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Carrer</p>
                      <input id="modAdreca" type="text" class="form-control" name="adreça"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Tipus d'habitatge'</p>
                      <input id="modTipus_habitatge" name="tipusHabitatge" style="width: 100%;"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Titularitat de l'habitatge</p>
                      <input id="modownership" type="text" class="form-control" name="ownership"/>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div class="content">
                  <div class="contacto">
                    <h1 class="heading">Contacte</h1>
                    <div class="info">
                      <p class="sub-heading">Telèfon fixe</p>
                      <input id="modTel_fijo" type="text" class="phoneMask form-control" name="tel_fijo"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Telèfon móvil</p>
                      <input id="modMovil" type="text" class="phoneMask form-control" name="movil"/>
                      <p></p>
                    </div>
                    <div class="info">
                      <p class="sub-heading">Telèfon treball</p>
                      <input id="modTelTreball" type="text" class="phoneMask form-control" name="tel_treball"/>
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
              <div class="content3">
                <div class="contacto">
                  <h1 class="heading">Mutua</h1>
                  <div class="info">
                    <p class="sub-heading">Nom</p>
                    <p id="fpmutua" class="duration">Mutua 1</p>
                    <p></p>
                  </div>
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
              <div class="content2a">
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
              <div class="content3">
                <div class="contacto">
                  <h1 class="heading">Raó</h1>
                  <div class="info">
                    <p id="resRao" class="duration">Familiar de primer grau</p>
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
</div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/js/mdb.min.js"></script>
  <script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
  <script src="http://kendo.cdn.telerik.com/2019.2.514/js/kendo.all.min.js"></script>
  <script src="js/fitxaPersonal.js" type="text/javascript"></script>
</body>
</html>
