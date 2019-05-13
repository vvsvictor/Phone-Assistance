<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM sta";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"actual_situation":"'. $row["actual_situation"].'","hiring_date":"'. $row["hiring_date"].'","tf_service":'. $row["tf_service"].',"tcr_service":'. $row["tcr_service"].',"cc_service":'. $row["cc_service"].',"tm_service":'. $row["tm_service"].',"tam_service":'. $row["tam_service"].',"gps_service":'. $row["gps_service"].',"umt_service":'. $row["umt_service"].',},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
