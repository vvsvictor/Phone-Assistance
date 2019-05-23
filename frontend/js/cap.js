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
  $("#returnDoctor").click(function() {
    goToCapList();
  });
});

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
}

function addCapListener() {
  $("#showFormBtn").click(function() {
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
    },
    error: function() {
      console.log('No hi han caps');
    }
  });

}


function showCap(id, name, address, phone, schedule) {
  let html;
  html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + phone + "</td><td>" + schedule + "</td><td><button type='button' id='deleteCapId" + id + "' class='deletecap btn btn-danger' data-toggle='modal' data-target='#deletecapmodal'>Eliminar</button></td></tr>";
  $("#capTable").append(html);
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
