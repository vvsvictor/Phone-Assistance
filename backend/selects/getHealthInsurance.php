<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM HEALTH_INSURANCE";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"insurance_name":"'. $row["insurance_name"].'","user_dninif":"'. $row["user_dninif"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
