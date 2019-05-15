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

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/css/mdb.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"> -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
    <link rel="stylesheet/sass" style="text/css" href="css/fichaPersonal.sass">
    <link rel="stylesheet" href="css/fichaPersonal.css">
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #11999E;">
      <a class="navbar-brand" href="index.php"><img src="images/PA-Mini.png"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.php" style="color: #e4f9f5;">Inici </a>
          </li>
          <?php
          if ($_SESSION['user']['usertype'] == 0) {
            echo '<li class="nav-item">
              <a class="nav-link" href="users.php" style="color: #e4f9f5;">Usuaris</a>
            </li>';
          }
           ?>

          <li class="nav-item active">
            <a class="nav-link" href="#" style="color: #e4f9f5;">Fitxa personal<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="capsmutues.php" style="color: #e4f9f5;">CAP - Mútues</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sta.php" style="color: #e4f9f5;">STA - Responsables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="histocalls.php" style="color: #e4f9f5;">Historial de trucades</a>
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
              <a href="#" class="c-tabs-nav__link">STA</a>
              <a href="#" class="c-tabs-nav__link">Trucades</a>
              <div class="c-tab-nav-marker"></div>
      </div>
      <div class="c-tab is-active">
          <div class="c-tab__content">
            <div class="container_ficha">
              <div class="container">
              <div class="sidebar">
                <div class="sidebar-top">
                  <img class="profile-image" src="https://images.pexels.com/photos/2269739/pexels-photo-2269739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                  <div class="profile-basic">
                    <h4 class="name">Gimena del Carmen Ortega</h4>
                    <h6 class="designation">31451552F</h6>
                  </div>
                </div>
                <div class="profile-info">
                  <h4 class="key">Nom</h4>
                  <p class="value">Gimena</p>
                </div>
                <div class="profile-info">
                  <h4 class="key">Cognoms</h4>
                  <p class="value">del Carmen Ortega</p>
                </div>
                <div class="profile-info">
                  <h4 class="key">Sexe</h4>
                  <p class="value">Femeni</p>
                </div>

                <div class="profile-info">
                  <h4 class="key">Data de naixement</h4>
                  <p class="value" >10-04-1912</p>
                </div>
              </div>

              <div class="content">
                <div class="direccion">
                  <h1 class="heading"> Direcció</h1>
                  <div class="info">
                    <p class="sub-heading">Provincia</p>
                    <p class="duration">Barcelona</p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Comarca</p>
                    <p class="duration">Barcelonès</p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Municipi</p>
                    <p class="duration">Barcelona</p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Carrer</p>
                    <p class="duration">Alcudia nº 23 3º 1ª</p>
                    <p></p>
                  </div>
                </div>
                <div class="contacto">
                  <h1 class="heading">Contacte</h1>
                  <div class="info">
                    <p class="sub-heading">Telèfon fixe</p>
                    <p class="duration">937764012</p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Telèfon móvil</p>
                    <p class="duration">672750032</p>
                    <p></p>
                  </div>
                  <div class="info">
                    <p class="sub-heading">Telèfon treball</p>
                    <p class="duration">903412653</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      <div class="c-tab">
          <div class="c-tab__content">
            <div class="cv container">
  <div class="row">
    <aside class="col-md-4">
      <h2><span>CAP Guineueta</span></h2>
      <ul class="info">
        <li><a href="#"><i class="fa fa-building"></i>CAP Guineueta</a></li>
        <li><a href="#"><i class="fa fa-map-marker"></i>Pg. Valldaura 30</a></li>
        <li><a href="#"><i class="fa fa-phone"></i>904322188</a></li>
        <li><a href="#"><i class="fa fa-clock"></i>8:00 - 20:00</a></li>
      </ul>
    </aside>
    <div class="col-md-8">
      <h1>Metge/ssa de Capçalera</h1>
      <div class="row skills">
        <div class="col-md-4">
          <section>
          </section>
        </div>
      </div>
      <h1>Ubicació</h1>

    </div>
  </div>
</div>
          </div>
      </div>

      <div class="c-tab">
          <div class="c-tab__content">
            <div class="content_STA">
            <div class="esquerda">
              <header>
                <h1 style="color: #30E3CA"><i class="material-icons">account_box</i> Responsable</h1>

                <div id="informacoes-principais">
                  <p id="nome">Carles Moreno Serrano</p>
                  <p id="formacao">Tele Asistente</p>
                </div>
              </header>

              <main>
                <section id="informacoes-pessoais" class="secao">
                  <h1>Informació Personal</h1>
                </section>

                <section id="informacoes-pessoais" class="secao">
                  <h1>Horari de Treball</h1>

                </section>

                <section id="experiencia" class="secao">
                  <h1>Raó</h1>

                </section>

              </main>
            </div>

            <aside>
              <div id="informacoes-contato">
                <div class="imagem-perfil">
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Imagem de perfil">
                </div>

                <div id="informacoes-gerais">
                  <div class="info-line" id="info-endereco">
                    <i class="material-icons">location_on</i>
                    <span class="texto-item">Carrer Verdi 28 1º 2ª</span>
                  </div>

                  <div class="info-line" id="info-telefone">
                    <i class="material-icons">phone</i>
                    <span class="texto-item">657423095</span>
                  </div>

                  <div class="info-line" id="info-mail">
                    <i class="material-icons">mail</i>
                    <span class="texto-item">08032</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div class="c-tab">
          <div class="c-tab__content">

          </div>
        </div>
  </div>
</section>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.0/js/mdb.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="js/fitxaPersonal.js" type="text/javascript"></script>
    <script src="js/fitchaPersonal.js" type="text/javascript"></script>
  </body>
</html>
