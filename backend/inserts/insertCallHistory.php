<?php

  include ("../inc/usarBD.php");

  $sCallDate = $_GET["sCallDate"];
  $iCallType = $_GET["iCallType"];
  $iOutcallType = $_GET["iOutcallType"];
  $iIncallType = $_GET["iIncallType"];
  $iCallState = $_GET["iCallState"];
  $sTeleoperatorSolution = $_GET["sTeleoperatorSolution"];


  $consulta="INSERT INTO CALL_HISTORY (call_date, call_type, outcall_type, incall_type, call_state, teleoperator_solution) VALUES ('".$sCallDate."','".$iCallType."','".$iOutcallType."','".$iIncallType."','".$iCallState."','".$sTeleoperatorSolution."')";
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
