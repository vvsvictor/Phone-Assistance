<?php

$conexion = mysqli_connect("localhost", "root", "");
$baseDeDatos=mysqli_select_db($conexion, "phonea");

  $consulta = "SELECT * FROM cap";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"name":"'. $row["name"].'", "schedule":"'. $row["schedule"].'", "address":"'. $row["address"].'", "phone":"'. $row["phone"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';



  echo utf8_encode($sJSON);

  mysqli_close($conexion);

 ?>
