<!doctype html>
<?php
        include '..\backend\include.php';
        include '..\backend\includeUser.php';
        //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.

?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Phone Assistence</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="css/initPage.css">
  </head>

  <body>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #11999E; box-shadow: 2px 5px 10px #40514E;">
      <a class="navbar-brand" href="index.php"><img src="images/PA-Mini.png"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="index.php" style="color: #e4f9f5;">Inici <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
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
              <a href="exitLogin.php" class="btn btn-outline-light" role="button">Logout</a>
            </form>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <div class="card card-01 height-fix">
            <a href="fitxaPersonal.php">
              <img class="card-img-top" src="images/personal-sheet.jpg" alt="Card image cap">
            </a>
            <div class="card-img-overlay">
              <a class="nohyperlinkcss" href="fitxaPersonal.php">
                <h4 class="card-title"><strong>Fitxa personal</strong></h4>
              </a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card card-01 height-fix">
            <a href="capsmutues.php">
              <img class="card-img-top" src="images/cap-image.jpg" alt="Card image cap">
            </a>
            <div class="card-img-overlay">
              <a class="nohyperlinkcss" href="capsmutues.php">
                <h4 class="card-title"><strong>CAP</strong></h4>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card card-01 height-fix">
            <a href="sta.php">
              <img class="card-img-top" src="images/responsable.jpg" alt="Card image cap">
            </a>
            <div class="card-img-overlay">
              <a class="nohyperlinkcss" href="sta.php">
                <h4 class="card-title"><strong>STA- Responsables</strong></h4>
              </a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card card-01 height-fix">
            <a href="histocalls.php">
              <img class="card-img-top" src="images/phone-history.jpg" alt="Card image cap">
            </a>
            <div class="card-img-overlay">
              <a class="nohyperlinkcss" href="histocalls.php">
                <h4 class="card-title"><strong>Historial Trucades</strong></h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>

</html>
