<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];
  $sUsername = $_GET["sUsername"];
  $sPassword = $_GET["sPassword"];
  $iUserType = $_GET["iUserType"];

  $consulta="UPDATE users SET username='".$sUsername."', usertype='".$iUserType."', password='".$sPassword."' WHERE id=".$id;
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
