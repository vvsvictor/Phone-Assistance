<?php
  //Obliga al usuario a ser un determinado tipo de usuario para poder entrar en la pagina.En caso de no ser posible por no estar logueado o no ser el tipo de usuario permitido, redirige a la pagina de login.
  session_start();
  if(isset($_SESSION['user'])){
     if($_SESSION['user']['usertype'] != 0){
         header("Location: index.php");
     }
  }elseif(!isset($_SESSION['user'])){
     header("Location: index.php");
  }
?>
<!doctype html>
<html lang="es">
  <head>
        <meta charset="utf-8">
        <meta content="text/html">
        <title>Users Page</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="index.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="./js/jqGrid/css/ui.jqgrid.css">
        <link rel="stylesheet" href="./js/jqGrid/css/ui.jqgrid.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="./js/index.js"></script>
        <script src="./js/jqGrid/js/jquery.jqgrid.min.js"></script>


        <script>
          $(document).ready(function () {
            var myData = [
              { id: "1", user: "test1", password: "password1", level: "0"},
              { id: "2", user: "test2", password: "password2", level: "1"},
              { id: "3", user: "test3", password: "password3", level: "1"},
              { id: "4", user: "test4", password: "password4", level: "1"},
              { id: "5", user: "test5", password: "password5", level: "1"},
              { id: "6", user: "test6", password: "password6", level: "1"}
            ];
            var myGrid = "#list";

            jQuery(myGrid).jqGrid({
                datatype: 'local',
                data: myData,
                colusers: ['ID', 'User', 'Password', 'Access Level'],
                colModel: [
                    { name: 'id', index: 'id', width: 70, align: 'center', sorttype: 'int' },
                    { name: 'user', index: 'user', width: 70 },
                    { name: 'password', index: 'password', width: 100 },
                    {
                        name: 'level', index: 'level', width: 120, align: 'center', formatter: 'select',
                        edittype: 'select', editoptions: { value: '0:Admin;1:Tech' },
                        stype: 'select', searchoptions: { value: ':All;0:Admin;1:Tech' }
                    }
                ],
                rowNum: 10,
                rowList: [5, 10, 20],
                pager: '#pager',
                gridview: true,
                ignoreCase: true,
                rownumbers: true,
                sortname: 'invdate',
                viewrecords: true,
                sortorder: 'desc',
                guiStyle: "bootstrap",
                iconSet: "fontAwesome",
                idPrefix: "gb1_",
                //caption: "The grid, which uses predefined formatters and templates" <-- Minimizado de tabla completa
            });
            jQuery(myGrid).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

        });
        </script>
   </head>

  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Phone Assistence</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Inici <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Usuaris</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Fitxa personal</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">CAP - Mútues</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">STA - Responsables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Historial de trucades</a>
          </li>
          <li class="nav-item">
            <a href="exitLogin.php" class="btn btn-primary" role="button">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- JQGrid table Start here -->
      <table id="list"><tr></tr></table>
      <div style="margin-left: 25%">
      <div id="pager"></div>
    <div>
    <!-- JQGrid table Finish here -->
  </body>
</html>
