<?php
session_start();
if(isset($_SESSION['user'])){
  if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 60*30)) {
     // last request was more than 30 minutes ago
     session_destroy();   // destroy session data in storage
    header("Location: index.php");
  }else if(!isset($_SESSION['LAST_ACTIVITY'])){
    $_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp
  }

}elseif(!isset($_SESSION['user'])){
    header("Location: index.php");
}

 ?>
