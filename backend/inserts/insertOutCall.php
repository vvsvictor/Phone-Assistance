<?php

include ("../inc/usarBD.php");
$sDniNif = $_GET["sDniNif"];
$sCallDate = $_GET["sCallDate"];
$iCallType = $_GET["iCallType"];
$iOutcallType = $_GET["iOutcallType"];
$iCallState = $_GET["iCallState"];
$sTeleoperatorSolution = $_GET["sTeleoperatorSolution"];
$sReasonAdvice = $_GET["sReasonAdvice"];
$sDescription = $_GET["sDescription"];
$sDestinyAdvice = $_GET["sDestinyAdvice"];


$consulta="INSERT INTO CALL_HISTORY (user_dninif,call_date, call_type, outcall_type, call_state, teleoperator_solution, reason_for_advice, description, Destiny_advice) VALUES ('".$sDniNif."','".$sCallDate."','".$iCallType."','".$iOutcallType."','".$iCallState."','".$sTeleoperatorSolution."','".$sReasonAdvice."','".$sDescription."','".$sDestinyAdvice."')";
$hacerConsulta=mysqli_query($conexion, $consulta);


  $sJSON = "";
  $sJSON .= "{";

  if ($hacerConsulta){
	  $sJSON .= '"codigoError": 0,';
	  $sJSON .= '"descError": "",';
	  $sJSON .= '"observaciones": "Todo OK"';
  } else {
	  $sJSON .= '"codigoError": -1,';
	  $sJSON .= '"descError": "Error en la consulta",';
	  $sJSON .= '"observaciones": "KO!"';
  }

  $sJSON .= "}";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>
