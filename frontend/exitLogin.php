<?php

//Destruyo la sesión para redirigir al usuario a la pagina de logueo.
session_start();

session_destroy();
header("Location: index.php");
?>
