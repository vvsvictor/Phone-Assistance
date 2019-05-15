<?php

  include ("../inc/usarBD.php");

  $sName = $_GET["sName"];
  $sAddress = $_GET["sAddress"];
  $iPhone = $_GET["iPhone"];
  $sSchedule =  $_GET["sSchedule"];


  $consulta="INSERT INTO CAP (name, address, phone, schedule) VALUES ('".$sName."','".$sAddress."','".$iPhone."','".$sSchedule."')";
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
