<?php
    require('connect.php');
    session_start();
    $usu=$_GET['inputUser1'];
    $pass=$_GET['inputPassword1'];
    $sql="Select username, password, usertype From USERS Where username='".$usu."' AND password='".$pass."'";
    $usuarios=$mysqli->query($sql);

    if ($usuarios->num_rows==1){
        $datos= $usuarios->fetch_assoc();
        echo json_encode(array('error'=>false,'tipo'=>$datos['usertype']));
        $_SESSION['inputUser1'] = $datos;
    }
    else{
        echo json_encode(array('error'=>true));
    }



    $mysqli->close();
 ?>
