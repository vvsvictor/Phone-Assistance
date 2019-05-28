<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM MUNISIPALITYS";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"muni_name":"'. $row["muni_name"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo utf8_decode($sJSON);

  mysqli_close($conexion);

 ?>
