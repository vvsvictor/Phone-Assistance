<?php

if(!(isset($_SESSION['user']) && $_SESSION['user']['usertype'] == 0)){
  header("Location: index.php");
}

 ?>
