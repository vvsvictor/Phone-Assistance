<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta content="text/html">
        <title>User Page</title>
        <script src="./js/index.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   </head>
   <body>
        <a type="button" href="exitLogin.php" class="btn btn-primary">Logout</button>
   </body>
</hmtl>
        <?php
        include '..\backend\include.php';
        include '..\backend\includeUser.php';
        //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.

        ?>
