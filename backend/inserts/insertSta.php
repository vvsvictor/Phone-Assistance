<?php

  include ("../inc/usarBD.php");

  $sActualSituation = $_GET["sActualSituation"];
  $sHiringDate = $_GET["sHiringDate"];
  $iTfService = $_GET["iTfService"];
  $iTcrService = $_GET["iTcrService"];
  $iCcService = $_GET["iCcService"];
  $iTmService = $_GET["iTmService"];
  $iTamService = $_GET["iTamService"];
  $iGpsService = $_GET["iGpsService"];
  $iUmtService = $_GET["iUmtService"];

  $consulta="INSERT INTO sta (actual_situation, hiring_date, tf_service, tcr_service, cc_service, tm_service, tam_service, gps_service, umt_service) VALUES ('".$sActualSituation."','".$sHiringDate."','".$iTfService."','".$iTcrService."','".$iCcService."','".$iTmService."','".$iTamService."','".$iGpsService."','".$iUmtService."')";
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
