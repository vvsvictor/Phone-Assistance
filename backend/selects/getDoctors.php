<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM DOCTORS";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"name":"'. $row["name"].'","surname":"'. $row["surname"].'","gender":"'. $row["gender"].'", "id_cap":'. $row["id_cap"].', ';

      $consultaSpecialization = 'SELECT med_specialization FROM med_specialization WHERE id = (SELECT specialization_id from doctors where id = '.$row["id"].')';
      $resultSpecialization = mysqli_query($conexion, $consultaSpecialization);
      if (mysqli_num_rows($resultSpecialization) > 0) {
        while ($rowSpecialization = mysqli_fetch_assoc($resultSpecialization)) {
          $sJSON .= '"med_specialization":"'. $rowSpecialization["med_specialization"].'"},';
        }
      }
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
