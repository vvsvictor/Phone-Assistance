<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];
  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sGender = $_GET["sGender"];
  $specialization_id = $_GET["specialization_id"];
  $cap = $_GET["cap"];

  $consulta="UPDATE doctors SET name='".$sName."', surname='".$sSurname."', gender='".$sGender."', specialization_id=".$specialization_id.", id_cap=".$cap." WHERE id=".$id;
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
