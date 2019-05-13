<?php

  include ("../inc/usarBD.php");

  $consulta = "SELECT * FROM CALL_HISTORY";

  $result = mysqli_query($conexion, $consulta);

  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"call_date":"'. $row["call_date"].'","call_type":'. $row["call_type"].'"outcall_type":'. $row["outcall_type"].'"incall_type":'. $row["incall_type"].'"call_state":'. $row["call_state"].'},'  ;
    }
  }
  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';

  echo $sJSON;

  mysqli_close($conexion);

 ?>
