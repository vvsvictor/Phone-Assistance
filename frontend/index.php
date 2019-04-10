<html lang="es" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Phone Assistence</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="css/login.css">
  <script src="index.js"></script>
</head>

<body>
  <h1 class="text-center">Phone Assistence Portal</h1>
  <form class="container" id="formLg">
  <div class="form-group">
    <label for="inputUser1">Username</label>
    <input type="inputUser" class="form-control" id="inputUser1" name="inputUser1" aria-describedby="userHelp" placeholder="Enter user">
    <small id="userHelp" class="form-text text-muted">Introduce your user.</small>
  </div>
  <div class="form-group">
    <label for="inputPassword1">Password</label>
    <input type="password" class="form-control" id="inputPassword1" name="inputPassword1" placeholder="Password">
  </div>
  <div class="text-center">
    <button type="submit" class="btn btn-primary">Login</button>
  </div>
</form>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
<?php
session_start();

if(isset($_SESSION['usuario'])){
  echo $_SESSION['inputUser1']['usertype'];
  if($_SESSION['inputUser1']['usertype'] == 0){
    header('Location: admin.php');
  }elseif($_SESSION['inputUser1']['usertype'] == 1){
    header('Location: user.php');
    }
  }
?>
</html>
