$(document).ready(function () {
  $("#data_contacte").kendoDatePicker({
    format: "d/M/yyyy"
  });
  $(".datePickerKendo").kendoDatePicker({
      format: "d/M/yyyy"
    });
  $("#hora_preferible").kendoTimePicker({
    format: "H:mm",
    interval: 15,
    dateInput: false
  });

  $("#addPrioritat").kendoComboBox({
  });

  $('.dataTables_length').addClass('bs-select');
  goToSTAList();
  showTable();
  $("#showFormSTA").click(function() {
    goToAddSTA();
  $("#serveitf").kendoSwitch();
  $("#serveitcr").kendoSwitch();
  $("#serveicc").kendoSwitch();
  $("#serveitm").kendoSwitch();
  $("#serveitam").kendoSwitch();
  $("#serveigps").kendoSwitch();
  $("#serveiumt").kendoSwitch();
  });
  $("#addSituacio").kendoDropDownList();
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
    $("#addResponsible").hide();
    $("#pageResponsable").hide();
    $("#tableResponsible").show();
  }

  function goToAddSTA() {
    showDni();
    $("#tableResponsible").hide();
    $("#pageResponsable").hide();
    $("#addSTA").show();
  }

  function goToAddResponsible() {
    showDni();
    $("#tableResponsible").hide();
    $("#pageResponsable").hide();
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
  function goToResp() {
    $("#pageResponsable").show();
    $("#addSTA").hide();
    $("#addResponsible").hide();
  }
  
  function showDni() {
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        let dni = [];
        for (var i = 0; i < myJSON.length; i++) {
          let dninie = myJSON[i].dninie;
          let id = myJSON[i].id;
          dni.push("(Id:" + id + ") " + dninie);
        }
        $("#dni_usuari").kendoAutoComplete({
          filter: "contains",
          dataSource: dni,
          placeholder: "Selecciona un DNI...",
        });

        $("#dninie_usuari").kendoAutoComplete({
          filter: "contains",
          dataSource: dni,
          placeholder: "Selecciona un DNI...",
        });

      },
      error: function() {
        console.log('No hi han dnis');
      }
    });
  }


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
  //get Responables and fill the table
  $.ajax({
    url: "../backend/selects/getResponsible.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#responsibleTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let user_dninif = myJSON[i].user_dninif;
        let priority = myJSON[i].priority;
        let name = myJSON[i].name;
        let surname = myJSON[i].surname;
        let address = myJSON[i].address;
        let post_code = myJSON[i].post_code;
        let contact_phone = myJSON[i].contact_phone;
        let preferable_hour = myJSON[i].preferable_hour;
        let date_responsible = myJSON[i].date_responsible;
        let reason = myJSON[i].reason;
        showResponsible(id,user_dninif,priority,name,surname);
      }
      $('#dtResponsible').DataTable();
      eliminarResponsibleListener();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });
  /*Get STA AJAX
  $.ajax({
    url: "../backend/selects/getResponsible.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#responsibleTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let user_dninif = myJSON[i].user_dninif;
        let priority = myJSON[i].priority;
        let hiring_date = myJSON[i].hiring_date;
        let tf_service = myJSON[i].tf_service;
        let tcr_service = myJSON[i].tcr_service;
        let cc_service = myJSON[i].cc_service;
        let tm_service = myJSON[i].tm_service;
        let tam_service = myJSON[i].tam_service;
        let gps_service = myJSON[i].gps_service;
        let umt_service = myJSON[i].umt_service;
        showResponsible(id, user_dninif,actual_situation, hiring_date);
      }
      $('#dtResponsible').DataTable();
      eliminarStaListener();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });
  */

}


function showResponsible(id,user_dninif,priority,name,surname){
  let html="<tr><td>"+id+"</td><td>"+user_dninif+"</td><td>"+priority+"</td><td>"+name+"</td><td>"+surname+"</td><td><button id='sta"+id+"' type='button' class='sta btn btn-info'>Fitxa Completa</button><button type='button' id='deleteResponsibleId" + id + "' class='deleteResponsible btn btn-danger' data-toggle='modal' data-target='#deleteResponsiblemodal'>Eliminar</button></td></tr>";
  $("#responsibleTable").append(html);

  $(".sta").click(function() {
    mostrarCardListener($(this).attr('id'));
  });
}

function mostrarCardListener(id) {
    let idbtn = id;
    idbtn = idbtn.replace("sta", "");
    console.log("ID "+idbtn);
    $.ajax({
      url: "../backend/selects/getResponsible.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        $("#resNom").html("");
        $("#resCognom").html("");
        $("#resCarrer").html("");
        $("#resCodiPostal").html("");
        $("#resTel").html("");
        $("#resHorari").html("");
        $("#resData").html("");
        $("#resPrioritat").html("");
        $("#resRao").html("");
        for (let i = 0; i < myJSON.length; i++) {
                      console.log("aqui");
                      console.log(myJSON[i].id);
                      console.log(idbtn);
          if (idbtn == myJSON[i].id) {
                        console.log("aqui2");
            let id = myJSON[i].id;
            let name = myJSON[i].name;
            let surname = myJSON[i].surname;
            let address = myJSON[i].address;
            let post_code = myJSON[i].post_code;
            let contact_phone = myJSON[i].contact_phone;
            let preferable_hour = myJSON[i].preferable_hour;
            let data_responsible = myJSON[i].date_responsible;
            data_responsible = data_responsible.replace(/-/g, "/");
            let priority = myJSON[i].priority;
            let reason = myJSON[i].reason;
            $("#resNom").html(name);
            $("#resCognom").html(surname);
            $("#resCarrer").html(address);
            $("#resCodiPostal").html(post_code);
            $("#resTel").html(contact_phone);
            $("#resHorari").html(preferable_hour);
            $("#resData").html(data_responsible);
            $("#resPrioritat").html(priority);
            $("#resRao").html(reason);
            goToResp();
          }
        }
      },
      error: function() {
        console.log('No hi ha responsable');
      }
      });
  }

function eliminarResponsibleListener() {
  let idResponsible;
  $(".deleteResponsible").click(function(event) {
    idResponsible = this.id;
    idResponsible = idResponsible.replace("deleteResponsibleId", "");
    console.log("The id Responsible is: " + idResponsible);
    $("#deleteResponsibleDef").click(function(event) {
      console.log("The Button Responsible is: " + idResponsible);
      deleteResponsible(idResponsible);
    });
  });
}

function deleteResponsible(idResponsible){
  console.log("The id2 Responsible is: " + idResponsible);
  $.ajax({
    url: "../backend/delete/deleteResponsible.php",
    data: {
      id: idResponsible
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
