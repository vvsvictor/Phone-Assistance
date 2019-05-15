<?php

  include ("../inc/usarBD.php");

  $sUsername = $_GET["sUsername"];
  $sPassword = $_GET["sPassword"];
  $iUserType = $_GET["iUserType"];


  $consulta="INSERT INTO users (username, password, usertype) VALUES ('".$sUsername."','".$sPassword."','".$iUserType."')";
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
