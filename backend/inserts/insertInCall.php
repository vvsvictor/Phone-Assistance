<?php

include ("../inc/usarBD.php");
$sDniNif = $_GET["sDniNif"];
$sCallDate = $_GET["sCallDate"];
$iCallType = $_GET["iCallType"];
$iIncallType = $_GET["iIncallType"];
$iCallState = $_GET["iCallState"];
$absence_date = $_GET["absence_date"];
$return_date = $_GET["return_date"];
$other = $_GET["other"];
$sTeleoperatorSolution = $_GET["sTeleoperatorSolution"];
$sReasonAdvice = $_GET["sReasonAdvice"];
$sDescription = $_GET["sDescription"];
$sDestinyAdvice = $_GET["sDestinyAdvice"];


$consulta="INSERT INTO CALL_HISTORY (user_dninif,call_date, call_type, incall_type, call_state, teleoperator_solution, reason_for_advice, description, Destiny_advice, absence_date, return_date, other) VALUES ('".$sDniNif."','".$sCallDate."','".$iCallType."','".$iIncallType."','".$iCallState."','".$sTeleoperatorSolution."','".$sReasonAdvice."','".$sDescription."','".$sDestinyAdvice."','".$absence_date."','".$return_date."','".$other."')";
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
