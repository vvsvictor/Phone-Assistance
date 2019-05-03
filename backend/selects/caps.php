<?php

  // $conexion = mysqli_connect("localhost", "root", "");
  // $baseDeDatos=mysqli_select_db($conexion, "phonea");
  //
  //
  // mysqli_close($conexion);
  //
  // $query = "SELECT * FROM cap where id=489";
  //
  // $stmt = $DBcon->prepare($query);
  // $stmt->execute();



  // Initialize variable for database credentials
  $dbhost = 'localhost';
  $dbuser = 'root';
  $dbpass = '';
  $dbname = 'phonea';

  //Create database connection
    $dblink = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

  //Check connection was successful
    if ($dblink->connect_errno) {
       printf("Failed to connect to database");
       exit();
    }

  //Fetch 3 rows from actor table
    $result = $dblink->query("SELECT * FROM cap where id=489");

  //Initialize array variable
    $dbdata = array();

  //Fetch into associative array
    while ( $row = $result->fetch_assoc())  {
  	$dbdata[]=$row;
    }

  //Print array in JSON format
   echo json_encode($dbdata);





 ?>
