<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];

  $consulta="DELETE FROM CALL_HISTORY WHERE id=".$id;
  $hacerConsulta=mysqli_query($conexion, $consulta);

  $consulta="DELETE FROM RESPONSIBLE WHERE id=".$id;
  $hacerConsulta=mysqli_query($conexion, $consulta);

  $consulta="DELETE FROM STA WHERE id=".$id;
  $hacerConsulta=mysqli_query($conexion, $consulta);

  $consulta="DELETE FROM PERSONAL_CARD WHERE id=".$id;
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
