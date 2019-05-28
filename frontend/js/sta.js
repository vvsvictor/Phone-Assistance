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
  goToFitxaList();
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
    goToFitxaList();
  });
  $("#returnResponsible").click(function() {
    goToFitxaList();
  });
  $("#returnResponsible2").click(function() {
    goToFitxaList();
  });



  });
  function goToFitxaList() {
    $('#addSTA').hide();
    $("#addResponsible").hide();
    $("#pageTables").hide();
    $("#pageView").hide();
    $("#tableFitxaPersonal").show();
  }

  function showAllInfo(){
    $(".fitxaPersonal").click(function() {

    });
  }

  function goToShowAll(){

  }

  function goToAddSTA() {
    showDni();
    $("#tableFitxaPersonal").hide();
    $("#pageResponsable").hide();
    $("#addSTA").show();
  }

  function goToAddResponsible() {
    showDni();
    $("#tableFitxaPersonal").hide();
    $("#pageResponsable").hide();
    $("#addResponsible").show();
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

  function showTable() {
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        console.log(myJSON);
        $("#fitxaPersonalTable").html("");
        for (var i = 0; i < myJSON.length; i++) {
          let id = myJSON[i].id;
          let dninie = myJSON[i].dninie;
          let name = myJSON[i].name;
          let surname = myJSON[i].surname;

          showFitxaPersonal(id, name, surname, dninie);
        }
        $('#dtFitxaPersonal').DataTable();
      },
      error: function() {
        console.log('No hi han clients');
      }
    });
  }

  function showFitxaPersonal(id, name, surname, dninie) {
    let html = "<tr><td>" + id + "</td><td>" + dninie + "</td><td>" + name + "</td><td>" + surname + "</td><td><button id='fitxaPersonal" + id + "' type='button' class='fitxaPersonal btn btn-info marginBtn'>Més Informació</button></td></tr>";
    $("#fitxaPersonalTable").append(html);

    $(".fitxaPersonal").click(function() {
      mostrarCardListener($(this).attr('id'));
    });
  }


function showResponsible(id,user_dninif,priority,name,surname){
  let html="<tr><td>"+id+"</td><td>"+user_dninif+"</td><td>"+priority+"</td><td>"+name+"</td><td>"+surname+"</td><td><button id='responsible"+id+"' type='button' class='responsible btn btn-info'>Fitxa Completa</button><button type='button' id='deleteResponsibleId" + id + "' class='deleteResponsible btn btn-danger' data-toggle='modal' data-target='#deleteResponsiblemodal'>Eliminar</button></td></tr>";
  $("#responsibleTable").append(html);

  $(".responsible").click(function() {
    mostrarCardListener();
  });
}

function showSta(id){
  let html="<tr><td>"+id+"</td><td>"+"</td><td>"+"</td><td>"+"</td><td>"+surname+"</td><td><button id='sta"+id+"' type='button' class='sta btn btn-info'>Fitxa Completa</button><button type='button' id='deleteResponsibleId" + id + "' class='deleteResponsible btn btn-danger' data-toggle='modal' data-target='#deleteResponsiblemodal'>Eliminar</button></td></tr>";
  $("#staTable").append(html);

  $(".sta").click(function() {
    mostrarCardListener();
  });
}

function mostrarCardListener() {
    let idbtn = this.id;
    idbtn = idbtn.replace("responsible", "");
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
          if (idbtn == myJSON[i].id) {
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
            $.ajax({
              url: "../backend/selects/getResponsible.php",
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
      error: function() {
        console.log('No hi ha responsable');
      }
      });
  }

function addSTA() {
}

function addResponsible() {
}

function eliminarStaListener() {
  let idSta;
  $(".deleteSta").click(function(event) {
    idSta = this.id;
    idSta = idSta.replace("deleteStaId", "");
    console.log("The id sta is: " + idSta);
    $("#deleteStaDef").click(function(event) {
      console.log("The Button sta is: " + idSta);
      deleteSta(idSta);
    });
  });
}

function deleteSta(idSta){
  console.log("The id2 Sta is: " + idSta);
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
        showTableSta();
      }
    },
    error: function() {
      alert("Error en la consulta");
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
        showTableResponsible();
      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}
