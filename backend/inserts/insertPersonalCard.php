<?php

  include ("../inc/usarBD.php");

  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sGender = $_GET["sGender"];
  $iLanguage = $_GET["iLanguage"];
  //Falta LLenguatge de signes !!
  $sBirthdate = $_GET["sBirthdate"];
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

  $consulta="INSERT INTO PERSONAL_CARD (name, surname, gender, language, birthdate, dninie, province, comarca, municipality, address, type_house, ownership, phone, mobile_phone, work_phone) VALUES ('".$sName."','".$sSurname."','".$sGender."','".$iLanguage."','".$sBirthdate."','".$sDninie."','".$iProvince."','".$iComarca."','".$iMunicipality."','".$sAddress."','".$sTypeHouse."','".$iOwnership."','".$sPhone."','".$sMobilePhone."','".$sWorkPhone."')";
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
