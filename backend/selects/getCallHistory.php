<?php

  include ("../inc/usarBD.php");
  $consulta = "SELECT * FROM CALL_HISTORY";
  $result = mysqli_query($conexion, $consulta);
  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $sJSON .= '{"id":'. $row["id"].',"user_dninif":"'. $row["user_dninif"].'","call_date":"'. $row["call_date"].'","teleoperator_solution":"'. $row["teleoperator_solution"].'","reason_for_advice":"'. $row["reason_for_advice"].'","description":"'. $row["description"].'","Destiny_advice":"'. $row["Destiny_advice"].'", '  ;


      $consultaType = 'SELECT call_type FROM call_type WHERE  id = (SELECT call_type from call_history where id = '.$row["id"].')';
      $resultType = mysqli_query($conexion, $consultaType);
      if (mysqli_num_rows($resultType) > 0) {
        while ($rowType = mysqli_fetch_assoc($resultType)) {
          $sJSON .= '"call_type":"'. $rowType["call_type"].'", ';
        }
      }

      $consultaState = 'SELECT call_type FROM call_state WHERE  id = (SELECT call_state from call_history where id = '.$row["id"].')';
      $resultState = mysqli_query($conexion, $consultaState);
      if (mysqli_num_rows($resultState) > 0) {
        while ($rowState = mysqli_fetch_assoc($resultState)) {
          $sJSON .= '"call_state":"'. $rowState["call_type"].'", ';
        }
      }

      $consultaOutcall = 'SELECT outcall_type, subclass FROM outcall_type WHERE  id = (SELECT outcall_type from call_history where id = '.$row["id"].')';
      $resultOutcall = mysqli_query($conexion, $consultaOutcall);
      if (mysqli_num_rows($resultOutcall) > 0) {
        while ($rowOutcall = mysqli_fetch_assoc($resultOutcall)) {
          $sJSON .= '"outcall_type":"'. $rowOutcall["outcall_type"].',"outcall_subclass":"'. $row["subclass"].'", ';
        }
      }

      $consultaIncall = 'SELECT incall_type, subclass FROM incall_type WHERE  id = (SELECT incall_type from call_history where id = '.$row["id"].')';
      $resultIncall = mysqli_query($conexion, $consultaIncall);
      if (mysqli_num_rows($resultIncall) > 0) {
        while ($rowIncall = mysqli_fetch_assoc($resultIncall)) {
          $sJSON .= '"incall_type":"'. $rowIncall["incall_type"].',"incall_subclass":"'. $row["subclass"].'"},';
        }
      }
  }
}

  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';
  echo $sJSON;
  mysqli_close($conexion);
 ?>
