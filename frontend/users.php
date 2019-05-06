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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/themes/redmond/jquery-ui.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/css/ui.jqgrid.min.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/jquery.jqgrid.min.js"></script>
        
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

            pdJqGrid(myData);
          });

          function pdJqGrid(myData) {
          var myGrid = "#list";

          jQuery(myGrid).jqGrid({
              datatype: 'local',
              data: myData,
              width: 600,
              colusers: ['ID', 'User', 'Password', 'Access Level'],
              colModel: [
                  { name: 'user', index: 'user', editable: true},
                  { name: 'password', index: 'password', editable: true},
                  {
                      name: 'level', index: 'level', align: 'center', formatter: 'select', editable: true,
                      edittype: 'select', editoptions: { value: '0:Admin;1:Tech' },
                      stype: 'select', searchoptions: { value: ':All;0:Admin;1:Tech' }
                  }
              ],
              iconSet: "fontAwesome",
              pager: '#pager',
              gridview: true,
              ignoreCase: true,
              rownumbers: true,
              sortname: 'invdate',
              viewrecords: true,
              sortorder: 'desc',
              rowNum: 10,
              rowList: [5, 10, 20],
              //caption: "The grid, which uses predefined formatters and templates" <-- Minimizado de tabla completa
          });

          jQuery(myGrid).jqGrid('navGrid', {
            edit: true,
            //edittext: 'Edit',
            add: true,
            //addtext: 'Add',
            del: true,
            //deltext: 'Del',
            search: false,
            view: true,
            //viewtext: 'View',
            refresh: true,
            //refreshtext: 'Refresh'
          });

          jQuery(myGrid).jqGrid('filterToolbar', {
            stringResult: true,
            searchOnEnter: false,
            defaultSearch: "cn"
          });
        }
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
      <div id="pager"></div>
    <div>
    <!-- JQGrid table Finish here -->
  </body>
</html>
