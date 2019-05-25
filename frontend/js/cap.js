$(document).ready(function() {
  //Multiselect
  var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");
  var optional = $("#optional").kendoMultiSelect({
    autoClose: false
  }).data("kendoMultiSelect");

  $("#get").click(function() {
    alert("Attendees:\n\nRequired: " + required.value() + "\nOptional: " + optional.value());
  });

  goToCapList();
  $('.dataTables_length').addClass('bs-select');
  showTable();
  addCapListener();
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
}

function goToAddDoctor() {
  $("#tableCaps").hide();
  $("#addDoctor").show();
  $("#pageCAPS").hide();

}

function addCapListener() {
  $("#showFormBtn").click(function(pageCAPS) {
    $("#name").val('')
    $("#address").val('');
    $("#phone").val('');
    $("#schedule").val('');
    $("#capList").hide();
    $('#addCap').show();
    $("#showListBtn").click(function() {
      goToCapList();
    });
  });


  $("#addCapBtn").click(function() {
    $.ajax({
      url: "../backend/inserts/insertCap.php",
      data: {
        sName: $("#name").val(''),
        sAddress: $("#address").val(''),
        iPhone: $("#phone").val(''),
        sSchedule: $("#schedule").val('')
      },
      type: "GET",
      cache: false,
      success: function(response) {
        var myJSON = JSON.parse(response);
        showTable();
        $('#addCap').hide();
        $("#capList").show();

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
          console.log(response);
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
                  for (var i = 0; i < myJSON.length; i++) {
                    if (idbtn == myJSON[i].id_cap){
                      let id = myJSON[i].id;
                      let name = myJSON[i].name;
                      let surname = myJSON[i].surname;
                      let gender = myJSON[i].gender;
                      let specialization_id = myJSON[i].specialization_id;
                    }
                  }
                },
                error: function() {
                  console.log('No hi han metges');
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

function showMedicos(id,name,surname,gender,med_specialization) {
  let html;
  html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + surname + "</td><td>" + gender + "</td><td>" + med_specialization + "</td><td></td></tr>";
  console.log(html)
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


function deleteCap(idCap) {
  console.log("The id cap2 is: " + idCap);
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
