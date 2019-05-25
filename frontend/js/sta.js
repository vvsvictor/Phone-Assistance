$(document).ready(function () {
  $(".datepicker").kendoDatePicker();
  $('.dataTables_length').addClass('bs-select');
  goToSTAList();
  showTable();
  $("#showFormSTA").click(function() {
    goToAddSTA();
  $("#mail-switch").kendoSwitch({
            messages: {
                checked: "SI",
                unchecked: "NO"
            }
        });
  });
  $("#showFormResponsible").click(function() {
    goToAddResponsible();
  });
  $("#returnSTA").click(function() {
    goToSTAList();
  });
  $("#returnResponsible").click(function() {
    goToSTAList();
  });
  $("#returnResponsible2").click(function() {
    goToSTAList();
  });

  function goToSTAList() {
    $('#addSTA').hide();
    $("#tableSTA").show();
    $("#addResponsible").hide();
  }

  function goToAddSTA() {
    $("#tableSTA").hide();
    $("#addSTA").show();
  }

  function goToAddResponsible() {
    $("#tableSTA").hide();
    $("#addResponsible").show();
  }

  //$( "#showFormBtn" ).click(function() {
    //$("#username").val('')
    //$("#password").val('');
    //$("input[name=usertype][value=0]").attr('checked', 'checked');
    //$( "#staList" ).hide();
    //$('#addSta').show();
  });
/*
  $( "#showListBtn" ).click(function() {
    $('#addSta').hide();
    $( "#staList" ).show();
  });

  $( "#addStaBtn" ).click(function() {
    $.ajax({
      url: "../backend/inserts/insertSta.php",
      data: {
        sUsername: $("#username").val(),
        sPassword: $("#password").val(),
        iUserType: $('input[name=usertype]:checked', '#formUser').val()
      },
      type: "GET",
      cache: false,
      success: function(response) {
        var myJSON = JSON.parse(response);
        showTable();
        $('#addUser').hide();
        $( "#usersList" ).show();

        if (parseInt(myJSON.codigoError) != 0) {
          console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
      },
      error: function() {
        alert("Error en la consulta");
      }
    });
  });

});
  */


    function Tabs(options) {

      var tabs = document.querySelector(options.el);
      var initCalled = false;
      var tabNavigation = tabs.querySelector(".c-tabs-nav");
      var tabNavigationLinks = tabs.querySelectorAll(".c-tabs-nav__link");
      var tabContentContainers = tabs.querySelectorAll(".c-tab");

      var marker = options.marker ? createNavMarker() : false;

      var activeIndex = 0;

      function init() {
        if (!initCalled) {
          initCalled = true;

          for (var i = 0; i < tabNavigationLinks.length; i++) {
            var link = tabNavigationLinks[i];
            clickHandlerSetup(link, i)
          }

          if (marker) {
            setMarker(tabNavigationLinks[activeIndex]);
          }
        }
      }

      function clickHandlerSetup(link, index) {
        link.addEventListener("click", function(e) {
          e.preventDefault();
          goToTab(index);
        })
      }

      function goToTab(index) {
        if (index >= 0 && index != activeIndex && index <= tabNavigationLinks.length) {
          tabNavigationLinks[activeIndex].classList.remove('is-active');
          tabNavigationLinks[index].classList.add('is-active');

          tabContentContainers[activeIndex].classList.remove('is-active');
          tabContentContainers[index].classList.add('is-active');

          if (marker) {
            setMarker(tabNavigationLinks[index]);
          }

          activeIndex = index;
        }
      }

      function createNavMarker() {
        var marker = document.createElement("div");
        marker.classList.add("c-tab-nav-marker");
        tabNavigation.appendChild(marker);
        return marker;
      }

      function setMarker(element) {
        marker.style.left = element.offsetLeft + "px";
        marker.style.width = element.offsetWidth + "px";
      }

      return {
        init: init,
        goToTab: goToTab
      }
    }


    var m = new Tabs({
      el: "#tabs",
      marker: true
    });

    m.init();

function showTable(){
  $.ajax({
    url: "../backend/selects/getSta.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#staTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let user_dninif = myJSON[i].user_dninif;
        let actual_situation = myJSON[i].actual_situation;
        let hiring_date = myJSON[i].hiring_date;
        let tf_service = myJSON[i].tf_service;
        let tcr_service = myJSON[i].tcr_service;
        let cc_service = myJSON[i].cc_service;
        let tm_service = myJSON[i].tm_service;
        let tam_service = myJSON[i].tam_service;
        let gps_service = myJSON[i].gps_service;
        let umt_service = myJSON[i].umt_service;
        showSta(id, user_dninif,actual_situation, hiring_date);
      }
      $('#dtSta').DataTable();
      eliminarStaListener();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}


function showSta(id, dni,situation, date){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+situation+"</td><td>"+date+"</td><td><button id='sta"+id+"' type='button' class='btn btn-info'>Fitxa Completa</button><button type='button' id='deleteStaId"+id+"' class='deleteSta btn btn-danger' data-toggle='modal' data-target='#deleteStamodal'>Eliminar</button></td></tr>";
  $("#staTable").append(html);
}

function eliminarStaListener() {
  let idSta;
  $(".deleteSta").click(function(event) {
    idSta = this.id;
    idSta = idSta.replace("deleteStaId", "");
    console.log("The id sta is: " + idSta);
    $("#deleteStaDef").click(function(event) {
      deleteSta(idSta);
    });
  });
}

function deleteSta(idSta){
  console.log("The id2 sta is: " + idSta);
  $.ajax({
    url: "../backend/delete/deleteSta.php",
    data: {
      id: idSta
    },
    type: "GET",
    cache: false,
    success: function(response) {
      var myJSON = JSON.parse(response);
      if (parseInt(myJSON.codigoError) != 0) {
        showTable();
      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}
