<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM INCALL_TYPE";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"incall_type":"'. $row["incall_type"].'","subclass":"'. $row["subclass"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo utf8_encode($sJSON);

  mysqli_close($conexion);

 ?>
