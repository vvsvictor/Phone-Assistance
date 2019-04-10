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
        session_start();
        if(isset($_SESSION['inputUser1'])){
           if($_SESSION['inputUser1']['usertype'] != 0){
               header("Location: index.php");
           }
        }elseif(!isset($_SESSION['inputUser1'])){
             header("Location: index.php");
        }

         $message= '"Welcome, admin."';
         echo "<script type='text/javascript'>alert('$message');</script>";
        ?>
