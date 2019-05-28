<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];
  $sUser_dninif = $_GET["sUser_dninif"];
  $sActual_situation = $_GET["sActual_situation"];
  $sHiring_date = $_GET["sHiring_date"];
  $iTf_service = $_GET["iTf_service"];
  $iTcr_service = $_GET["iTcr_service"];
  $iCc_service = $_GET["iCc_service"];
  $iTm_service = $_GET["iTm_service"];
  $iTam_service = $_GET["iTam_service"];
  $iGps_service = $_GET["iGps_service"];
  $iUmt_service = $_GET["iUmt_service"];


  $consulta="UPDATE sta SET user_dninif='".$sUser_dninif."', actual_situation='".$sActual_situation."', hiring_date='".$sHiring_date."', tf_service='".$iTf_service."', tcr_service='".$iTcr_service."', cc_service='".$iCc_service."', tm_service='".$iTm_service."', tam_service='".$iTam_service."', gps_service='".$iGps_service."', umt_service='".$iUmt_service."' WHERE id=".$id;
  $hacerConsulta=mysqli_query($conexion, $consulta);

  $sJSON = "[{";

  if ($hacerConsulta){
	  $sJSON .= '"codigoError": 0,';
	  $sJSON .= '"descError": "",';
	  $sJSON .= '"observaciones": "Todo OK"';
  } else {
	  $sJSON .= '"codigoError": -1,';
	  $sJSON .= '"descError": "Error en la consulta",';
	  $sJSON .= '"observaciones": "KO!"';
  }

  $sJSON .= "}]";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>
