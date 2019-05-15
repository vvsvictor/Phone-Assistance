<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM RESPONSIBLE";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"user_vinculation_id":'. $row["user_vinculation_id"].',"user_dninif":"'. $row["user_dninif"].'","priority":"'. $row["priority"].'","name":"'. $row["name"].'","surname":"'. $row["surname"].'","address":"'. $row["address"].'","post_code":"'. $row["post_code"].'","contact_phone":"'. $row["contact_phone"].'","preferable_hour":"'. $row["preferable_hour"].'","date_responsible":"'. $row["date_responsible"].'","reason":"'. $row["reason"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
