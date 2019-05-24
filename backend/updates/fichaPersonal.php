<?php

  include ("../inc/usarBD.php");
  $id = $_GET["id"];
  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sGender = $_GET["sGender"];
  $iLanguage = $_GET["iLanguage"];
  $iSignLanguage = $_GET["iSignLanguage"];
  $sBirthDate = $_GET["sBirthDate"];
  $sDninie = $_GET["sDninie"];
  $iProvince = $_GET["iProvince"];
  $iComarca = $_GET["iComarca"];
  $iMunicipality = $_GET["iMunicipality"];
  $sAddress = $_GET["sAddress"];
  $sTypeHouse = $_GET["sTypeHouse"];
  $iOwnership = $_GET["iOwnership"];
  $sPhone = $_GET["sPhone"];
  $sMobilePhone = $_GET["sMobilePhone"];
  $sWorkPhone = $_GET["sWorkPhone"];



  $consulta="UPDATE personal_card SET name='".$sName."', surname='".$sSurname."', gender='".$sGender."', language='".$iLanguage."', sign_language='".$iSignLanguage."', birthdate='".$sBirthDate."', dninie='".$sDninie."', province='".$iProvince."', comarca='".$iComarca."', municipality='".$iMunicipality."', address='".$sAddress."', type_house='".$sTypeHouse."', ownership='".$iOwnership."', phone='".$sPhone."', mobile_phone='".$sMobilePhone."', work_phone='".$sWorkPhone."' WHERE id=".$id;
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
