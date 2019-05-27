<?php

  include ("../inc/usarBD.php");

  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sGender = $_GET["sGender"];
  $iSpecializacionId = $_GET["iSpecializacionId"];
  $iIdCap = $_GET["iIdCap"];


  $consulta="INSERT INTO DOCTORS (name, surname, gender, specialization_id, id_cap) VALUES ('".$sName."','".$sSurname."','".$sGender."',".$iSpecializacionId.",".$iIdCap.")";
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
