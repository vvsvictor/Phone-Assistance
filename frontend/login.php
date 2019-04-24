<?php
    require('connect.php');
    session_start();
    $usu=$_GET['userInput'];
    $pass=$_GET['passwordInput'];
    $sql="Select username, password, usertype From USERS Where username='".$usu."' AND password='".$pass."'";
    $usuarios=$mysqli->query($sql);

    if ($usuarios->num_rows==1){
        $datos= $usuarios->fetch_assoc();
        echo json_encode(array('error'=>false,'type'=>$datos['usertype'], 'username'=>$datos['username']));
        $_SESSION['user'] = $datos;
    }else{
        echo json_encode(array('error'=>true));
    }

    $mysqli->close();
 ?>
