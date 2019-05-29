<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];
  $sPrority = $_GET["sPrority"];
  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sAddress = $_GET["sAddress"];
  $sPostcode = $_GET["sPostcode"];
  $sContact_phone = $_GET["sContact_phone"];
  $sPreferable_hour = $_GET["sPreferable_hour"];
  $sDate_responsible = $_GET["sDate_responsible"];
  $sReason = $_GET["sReason"];


  $consulta="UPDATE responsible SET  priority='".$sPrority."', name='".$sName."', surname='".$sSurname."', address='".$sAddress."', post_code='".$sPostcode."', contact_phone='".$sContact_phone."', preferable_hour='".$sPreferable_hour."', reason='".$sReason."' WHERE id=".$id;
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
