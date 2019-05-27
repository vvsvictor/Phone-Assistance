$(document).ready(function() {
  //Multiselect
  var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");

  $("#get").click(function() {
    alert("Attendees:\n\nRequired: " + required.value() + "\nOptional: " + optional.value());
  });

  goToCapList();
  $('.dataTables_length').addClass('bs-select');
  showTable();

  $("#showFormCAP").click(function() {
    goToAddCap();
  });
  $("#showFormDoctor").click(function() {
    goToAddDoctor();
  });
  $("#returnCAP").click(function() {
    goToCapList();
  });
  $("#returnCAP2").click(function() {
    goToCapList();
  });
  $("#returnDoctor").click(function() {
    goToCapList();
  });
});

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

function gotoModCap() {
  $('#modCapDiv').show();
  $('#addCap').hide();
  $("#capList").hide();
}

function goToAddCap() {
  $("#tableCaps").hide();
  $("#addCap").show();
  addCapListener();
}

function goToAddDoctor() {
  $.ajax({
    url: "../backend/selects/getMedSpecialization.php",
    type: "GET",
    cache: false,
    success: function(response) {
      console.log(response);
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      let html = '';
      for (let i = 0; i < myJSON.length; i++) {
        html+='<option>(Id:'+myJSON[i].id+') '+myJSON[i].med_specialization+'</option>';
      }
      $("#especialitzacions").html(html);
      $("#especialitzacions").kendoDropDownList();

    },
    error: function() {
      console.log('No hi han Doctors');
    }
  });

  $("#tableCaps").hide();
  $("#addDoctor").show();
  $("#pageCAPS").hide();

  //on click
  $("#addDoctorBtn").click(function() {
    let especialitzacio = $("#especialitzacions").val();
    especialitzacio = especialitzacio.split('(Id:').pop().split(')')[0];
    let nom = $("#addNameDr").val();
    let cognom = $("#addSurnameDr").val();
    let gender = $("#addGenereDr").val();
    let idcap =$("#cid").html();
    $.ajax({
      url: "../backend/inserts/insertDoctors.php",
      data: {
        sName: nom,
        sSurname:cognom,
        sGender: gender,
        iSpecializacionId: especialitzacio,
        iIdCap: idcap
      },
      type: "GET",
      cache: false,
      success: function(response) {
        var myJSON = JSON.parse(response);
        //Mostrar taula doctors

        if (parseInt(myJSON.codigoError) != 0) {
          console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
      },
      error: function() {
        alert("Error en la consulta");
      }
    });
  });



}

function addCapListener() {
    $(".phoneMask").kendoMaskedTextBox({
    mask: "000 000 000"
    });
    $("#addnom").val('')
    $("#addDireccio").val('');
    $("#addHorari").val('');
    $("#addTel").val('');
    $("#capList").hide();
    $('#addCap').show();
    $("#showListBtn").click(function() {
      goToCapList();
    });

    $("#addCapBtn").click(function() {
      let tel =$("#addTel").val();
      tel= tel.replace(/\s/g, '');
      $.ajax({
        url: "../backend/inserts/insertCap.php",
        data: {
          sName: $("#addNom").val(),
          sAddress: $("#addDireccio").val(),
          iPhone: tel,
          sSchedule: $("#addHorari").val()
        },
        type: "GET",
        cache: false,
        success: function(response) {
          var myJSON = JSON.parse(response);
          goToCapList();
          showTable();

          if (parseInt(myJSON.codigoError) != 0) {
            console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
          }
        },
        error: function() {
          alert("Error en la consulta");
        }
      });
    });
}

function goToCapList() {
  $('#pageCAPS').hide();
  $('#modCapDiv').hide();
  $('#addCap').hide();
  $("#capList").show();
  $("#tableCaps").show();
  $("#addCap").hide();
  $("#addDoctor").hide();
}

function modCapListener() {
  $(".modcap").click(function() {
    let idCap = this.id;

    $.ajax({
      url: "../backend/selects/getCap.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        for (let i = 0; i < myJSON.length; i++) {
          let id = myJSON[i].id;
          let name = myJSON[i].name;
          let address = myJSON[i].address;
          let phone = myJSON[i].phone;
          let schedule = myJSON[i].schedule;
          console.log(id);
          console.log(idCap);
          if ("modCapId" + id == idUser) {
            $("#modName").val(name);
            $("#modAddress").val(address);
            $("#modPhone").val(phone);
            $("#modSchedule").val(schedule);
          }
          gotoModCap();
          //Botó tornar enrrere
          $("#showListBtnMod").click(function() {
            goToCapList();
          });
          //Click al botó modificar usuari
          $("#modCapBtn").click(function() {
            $.ajax({
              url: "../backend/updates/capsmutues.php",
              data: {
                sName: $("#name").val(''),
                sAddress: $("#address").val(''),
                iPhone: $("#phone").val(''),
                sSchedule: $("#schedule").val('')
              },
              type: "GET",
              cache: false,
              success: function(response) {
                let myJSON = JSON.parse(response);
                //reload users
                showTable();
                goToCapList();
              },
              error: function() {
                alert("Error en la consulta");
              }
            });
          });
        }
      },
      error: function() {
        console.log('No hi han clients');
      }
    });

  });
}

function showTable() {
  $.ajax({
    url: "../backend/selects/getCap.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#capTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let name = myJSON[i].name;
        let address = myJSON[i].address;
        let phone = myJSON[i].phone;
        let schedule = myJSON[i].schedule;
        showCap(id, name, address, phone, schedule);
      }
      $('#dtCap').DataTable();
      modCapListener();
      eliminarCapListener();
      mostrarCapListener();
    },
    error: function() {
      console.log('No hi han caps');
    }
  });
}


function showCap(id, name, address, phone, schedule) {
  let html;
  html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + phone + "</td><td>" + schedule + "</td><td><button id='fitxaCaps" + id + "' type='button' class='fitxaCaps btn btn-info marginBtn'><i class='fa fa-file'></i></button><button type='button' id='deleteCapId" + id + "' class='deletecap btn btn-danger' data-toggle='modal' data-target='#deletecapmodal'><i class='fa fa-trash'></i></button></td></tr>";
  console.log("HTML caps a insertar "+html)
  $("#capTable").append(html);
}

function goToCap() {
  $("#pageCAPS").show();
  $("#tableCaps").hide();
  $("#addCAP").hide();
}

function mostrarCapListener(){
  $(".fitxaCaps").click(function(event) {
      let idbtn = this.id;
      idbtn = idbtn.replace("fitxaCaps", "");
      $.ajax({
        url: "../backend/selects/getCap.php",
        type: "GET",
        cache: false,
        success: function(response) {
          console.log("entra");
          let myJSON = JSON.parse(response);
          $("#cid").html("");
          $("#cname").html("");
          $("#caddress").html("");
          $("#cphone").html("");
          $("#cschedule").html("");
          for (var i = 0; i < myJSON.length; i++) {
            if (idbtn == myJSON[i].id){
              let id = myJSON[i].id;
              let name = myJSON[i].name;
              let address = myJSON[i].address;
              let phone = myJSON[i].phone;
              let schedule = myJSON[i].schedule;
              $("#cid").html(id);
              $("#cname").html(name);
              $("#caddress").html(address);
              $("#cphone").html(phone);
              $("#cschedule").html(schedule);
              goToCap();
              $.ajax({
                url: "../backend/selects/getDoctors.php",
                type: "GET",
                cache: false,
                success: function(response) {
                  let myJSON = JSON.parse(response);
                  console.log("Medics "+response);
                  $("#tbDoctors").html("");
                  for (var i = 0; i < myJSON.length; i++) {
                    if (idbtn == myJSON[i].id_cap){
                      let id = myJSON[i].id;
                      let name = myJSON[i].name;
                      let surname = myJSON[i].surname;
                      let gender = myJSON[i].gender;
                      let specialization = myJSON[i].med_specialization;
                      showMedicos(id,name,surname,gender,specialization);
                    }
                    eliminarDrListener();
                  }
                  $('#dtDoctor').DataTable();
                },
                error: function() {
                  console.log('No hi han Doctors');
                }
              });
            }
          }
      },
      error: function(){
        console.log('No hi ha CAPS');
      }
    });
  });
}

function showMedicos(id,name,surname,gender,specialization) {
  let html;
  html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + surname + "</td><td>" + gender + "</td><td>" + specialization + "</td><td><button id='fitxaCaps" + id + "' type='button' class='fitxaCaps btn btn-info marginBtn'><i class='fa fa-file'></i></button><button type='button' id='deleteDrId" + id + "' class='deletedr btn btn-danger' data-toggle='modal' data-target='#deletedrmodal'><i class='fa fa-trash'></i>Eliminar</button></td></tr>";
  $("#tbDoctors").append(html);
}


function eliminarCapListener() {
  let idCap;
  $(".deletecap").click(function(event) {
    idCap = this.id;
    idCap = idCap.replace("deleteCapId", "");
    console.log("The id cap is: " + idCap);
    $("#deleteCapDef").click(function(event) {
      deleteCap(idCap);
    });
  });
}

function eliminarDrListener(){
  let idDoctor;
  $(".deletedr").click(function(event) {
    idDr = this.id;
    idDr = idDr.replace("deleteDrId", "");
    $("#deleteDrDef").click(function(event) {
      deleteDr(idDr);
    });
  });
}

function deleteDr(idDr){
  $.ajax({
    url: "../backend/delete/deleteDoctors.php",
    data: {
      id: idDr
    },
    type: "GET",
    cache: false,
    success: function(response) {
      var myJSON = JSON.parse(response);
      console.log("Success JSON" + myJSON.codigoError);

      if (parseInt(myJSON.codigoError) != 0) {

      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}


function deleteCap(idCap) {
  $.ajax({
    url: "../backend/delete/deleteCap.php",
    data: {
      id: idCap
    },
    type: "GET",
    cache: false,
    success: function(response) {
      var myJSON = JSON.parse(response);
      console.log("Success JSON" + myJSON.codigoError);
      if (parseInt(myJSON.codigoError) != 0) {
        showTable();
      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}
