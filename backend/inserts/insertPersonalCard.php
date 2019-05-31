<?php

  include ("../inc/usarBD.php");

  $sName = $_GET["sName"];
  $sSurname = $_GET["sSurname"];
  $sGender = $_GET["sGender"];
  $iLanguage = $_GET["iLanguage"];
  $iLanguageSigne = $_GET["iLanguageSigne"];
  $sBirthdate = $_GET["sBirthdate"];
  $sDninie = $_GET["sDninie"];
  $iProvince = $_GET["iProvince"];
  if ($iProvince!="") {
    $iProvince = "'".$iProvince."'";
  }else{
    $iProvince = "NULL";
  }
  $iComarca = $_GET["iComarca"];
  if ($iComarca!="") {
    $iComarca = "'".$iComarca."'";
  }else{
    $iComarca = "NULL";
  }
  $iMunicipality = $_GET["iMunicipality"];
  if ($iMunicipality!="") {
    $iMunicipality = "'".$iMunicipality."'";
  }else{
    $iMunicipality = "NULL";
  }
  $sAddress = $_GET["sAddress"];
  $sTypeHouse = $_GET["sTypeHouse"];
  $iOwnership = $_GET["iOwnership"];
  $sPhone = $_GET["sPhone"];
  $sMobilePhone = $_GET["sMobilePhone"];
  $sWorkPhone = $_GET["sWorkPhone"];
  $date = date('Y/m/d', time());
  $mutua = $_GET["mutua"];
  $form = $_GET["form"];
  if ($form !="") {
    $form = "'".$form."'";
  }else{
    $form = "NULL";
  }

  if ($iLanguageSigne == 0) {
    $consulta="INSERT INTO PERSONAL_CARD (name, surname, gender, language, birthdate, dninie, province, comarca, municipality, address, type_house, ownership, phone, mobile_phone, work_phone, form) VALUES ('".$sName."','".$sSurname."','".$sGender."','".$iLanguage."','".$sBirthdate."','".$sDninie."',".$iProvince.",".$iComarca.",".$iMunicipality.",'".$sAddress."','".$sTypeHouse."','".$iOwnership."','".$sPhone."','".$sMobilePhone."','".$sWorkPhone."',".$form.")";
  }else{
    $consulta="INSERT INTO PERSONAL_CARD (name, surname, gender, language, sign_language, birthdate, dninie, province, comarca, municipality, address, type_house, ownership, phone, mobile_phone, work_phone, form) VALUES ('".$sName."','".$sSurname."','".$sGender."','".$iLanguage."','".$iLanguageSigne."','".$sBirthdate."','".$sDninie."',".$iProvince.",".$iComarca.",".$iMunicipality.",'".$sAddress."','".$sTypeHouse."','".$iOwnership."','".$sPhone."','".$sMobilePhone."','".$sWorkPhone."',".$form.")";
  }
  $hacerConsulta=mysqli_query($conexion, $consulta);
  $consultaSTA = "INSERT INTO STA (user_dninif, actual_situation, hiring_date, tf_service, tcr_service, cc_service, tm_service, tam_service, gps_service, umt_service) VALUES ('".$sDninie."', 'Baixa', '".$date."',0,0,0,0,0,0,0)";

  $hacerConsultaSTA=mysqli_query($conexion, $consultaSTA);
  if ($mutua !="") {
    // Añadir mutua
    $consultaMutua = "INSERT INTO HEALTH_INSURANCE (user_dninif, insurance_name) VALUES ('".$sDninie."', '".$mutua."')";
    $hacerConsultaMutua=mysqli_query($conexion, $consultaMutua);
  }


  $sJSON = "";
  $sJSON .= "{";

  if ($hacerConsulta && $hacerConsultaSTA){
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
