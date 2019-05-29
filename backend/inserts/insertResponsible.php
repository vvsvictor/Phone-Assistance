<?php

  include ("../inc/usarBD.php");

  $sUserDninie = $_GET["sUserDninie"];
  $sPriority = $_GET["sPriority"];
  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sAddress = $_GET["sAddress"];
  $sPostCode = $_GET["sPostCode"];
  $sContactPhone = $_GET["sContactPhone"];
  $sPreferablePhone = $_GET["sPreferablePhone"];
  $sDateResponsible = $_GET["sDateResponsible"];
  $sReason = $_GET["sReason"];

  $consulta="INSERT INTO RESPONSIBLE (user_dninif, priority, name, surname, address, post_code, contact_phone, preferable_hour, date_responsible, reason) VALUES ('".$sUserDninie."','".$sPriority."','".$sName."','".$sSurname."','".$sAddress."','".$sPostCode."','".$sContactPhone."','".$sPreferablePhone."','".$sDateResponsible."','".$sReason."')";
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
