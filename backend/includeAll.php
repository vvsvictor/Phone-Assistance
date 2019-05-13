<?php

if(!(isset($_SESSION['user']) && $_SESSION['user']['usertype'] == 0) || !(isset($_SESSION['user']) && $_SESSION['user']['usertype'] == 1)){
  header("Location: index.php");
}

 ?>
