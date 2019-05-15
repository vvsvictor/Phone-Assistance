<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM DOCTORS";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"name":"'. $row["name"].'","surname":"'. $row["surname"].'","gender":"'. $row["gender"].'","specialization_id":'. $row["specialization_id"].',"id_cap":'. $row["id_cap"].'},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
