<?php
//Inicia sesión el la base de datos mediante myql.
  $mysqli=new mysqli('localhost','root','','phonea');
  if ($mysqli->connect_errno) {
    echo "Error al conectarse con My SQL debido a un error".$mysqli->connect_error;
  }
 ?>
