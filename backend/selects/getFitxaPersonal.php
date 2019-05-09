<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM personal_card";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"name":"'. $row["name"].'","surname":"'. $row["surname"].'","gender":"'. $row["gender"].'","language":"'. $row["language"].'","sign_language":"'. $row["sign_language"].'","birthdate":"'. $row["birthdate"].'","dninie":"'. $row["dninie"].'","province":"'. $row["province"].'","comarca":"'. $row["comarca"].'","municipality":"'. $row["municipality"].'", "address":"'. $row["address"].'", "type_house":"'. $row["type_house"].'", "ownership":"'. $row["ownership"].'", "phone":"'. $row["phone"].'", "mobile_phone":"'. $row["mobile_phone"].'", "work_phone":"'. $row["work_phone"].'"},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
