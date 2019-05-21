<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];


  $consulta="DELETE FROM med_specialization WHERE id=(SELECT dninie FROM PERSONAL_CARD WHERE specialization_id='".$id."')";
  $hacerConsulta=mysqli_query($conexion, $consulta);

  $consulta="DELETE FROM DOCTORS WHERE id=".$id;
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
