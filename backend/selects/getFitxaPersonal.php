<?php
  include ("../inc/usarBD.php");
  $consulta = "SELECT * FROM personal_card";
  $result = mysqli_query($conexion, $consulta);
  $sJSON='[';
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {

      $sJSON .= '{"id":'. $row["id"].',"form":"'. $row["form"].'","name":"'. $row["name"].'","surname":"'. $row["surname"].'","gender":"'. $row["gender"].'","birthdate":"'. $row["birthdate"].'","dninie":"'. $row["dninie"].'","address":"'. $row["address"].'", "type_house":"'. $row["type_house"].'", "phone":"'. $row["phone"].'", "mobile_phone":"'. $row["mobile_phone"].'", "work_phone":"'. $row["work_phone"].'", ';

      $consultaLlenguatge = 'SELECT language_name FROM languages WHERE  id = (SELECT language from personal_card where id = '.$row["id"].')';
      $resultLlenguatge = mysqli_query($conexion, $consultaLlenguatge);
      if (mysqli_num_rows($resultLlenguatge) > 0) {
        while ($rowLlenguatge = mysqli_fetch_assoc($resultLlenguatge)) {
          $sJSON .= '"language":"'. utf8_encode($rowLlenguatge["language_name"]).'",';
        }
      }


      $consultaLlenguatgeSignes = 'SELECT language_name FROM sign_languages WHERE  id = (SELECT sign_language from personal_card where id = '.$row["id"].')';
      $resultLlenguatgeSignes = mysqli_query($conexion, $consultaLlenguatgeSignes);
      if (mysqli_num_rows($resultLlenguatgeSignes) > 0) {
        while ($rowLlenguatgeSignes = mysqli_fetch_assoc($resultLlenguatgeSignes)) {
          $sJSON .= '"sign_language":"'. utf8_encode($rowLlenguatgeSignes["language_name"]).'",';
        }
      }

      $consultaProvincia = 'SELECT prov_name FROM provinces WHERE  id = (SELECT province from personal_card where id = '.$row["id"].')';
      $resultProvincia = mysqli_query($conexion, $consultaProvincia);
      if (mysqli_num_rows($resultProvincia) > 0) {
        while ($rowProvincia = mysqli_fetch_assoc($resultProvincia)) {
          $sJSON .= '"province":"'. $rowProvincia["prov_name"].'",';
        }
      }

      $consultaComarcas = 'SELECT comar_name FROM comarcas WHERE  id = (SELECT comarca from personal_card where id = '.$row["id"].')';
      $resultComarcas = mysqli_query($conexion, $consultaComarcas);
      if (mysqli_num_rows($resultComarcas) > 0) {
        while ($rowComarcas = mysqli_fetch_assoc($resultComarcas)) {
          $sJSON .= '"comarca":"'. utf8_encode($rowComarcas["comar_name"]).'",';
        }
      }

      $consultaMunisipis = 'SELECT muni_name FROM munisipalitys WHERE id = (SELECT municipality from personal_card where id = '.$row["id"].')';
      $resultMunisipis = mysqli_query($conexion, $consultaMunisipis);
      if (mysqli_num_rows($resultMunisipis) > 0) {
        while ($rowMunisipis = mysqli_fetch_assoc($resultMunisipis)) {
          $sJSON .= '"municipality":"'. $rowMunisipis["muni_name"].'",';
        }
      }

      $consultaOwnership = 'SELECT owner_type FROM ownerships WHERE id = (SELECT ownership from personal_card where id = '.$row["id"].')';
      $resultOwnership = mysqli_query($conexion, $consultaOwnership);
      if (mysqli_num_rows($resultOwnership) > 0) {
        while ($rowOwnership = mysqli_fetch_assoc($resultOwnership)) {
          $sJSON .= '"ownership":"'. $rowOwnership["owner_type"].'",';
        }
      }

      $consultaMutua = 'SELECT insurance_name FROM HEALTH_INSURANCE WHERE user_dninif = (SELECT dninie from personal_card where id = '.$row["id"].')';
      $resultMutua = mysqli_query($conexion, $consultaMutua);
      if (mysqli_num_rows($resultMutua) > 0) {
        while ($rowMutua = mysqli_fetch_assoc($resultMutua)) {
          $sJSON .= '"mutua":"'. $rowMutua["insurance_name"].'",';
        }
      }
      $sJSON = rtrim($sJSON,",");
      $sJSON .='},';
    }
  }

  $sJSON = rtrim($sJSON,",");
  $sJSON.=']';
  echo $sJSON;
  mysqli_close($conexion);
 ?>
