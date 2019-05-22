<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM comarcas";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"comar_name":"'. $row["comar_name"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo utf8_encode($sJSON);

  mysqli_close($conexion);

 ?>
