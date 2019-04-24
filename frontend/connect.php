<?php
  $mysqli=new mysqli('localhost','root','','phonea');
  if ($mysqli->connect_errno) {
    echo "Error al conectarse con My SQL debido a un error".$mysqli->connect_error;
  }
 ?>
