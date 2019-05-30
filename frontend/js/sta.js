$(document).ready(function () {
  $("#data_contacte").kendoDatePicker({
    format: "d/M/yyyy"
  });
  $(".datePickerKendo").kendoDatePicker({
      format: "d/M/yyyy"
    });
  $("#hora_preferibleAdd").kendoTimePicker({
    format: "H:mm",
    interval: 15,
    dateInput: false
  });

  $("#hourresMod").kendoTimePicker({
    format: "H:mm",
    interval: 15,
    dateInput: false
  });

  $("#addPrioritat").kendoComboBox({
    dataSource: [
      {id: "Alta", name: "Alta"},
      {id: "Mitjana", name: "Mitjana"},
      {id: "Baixa", name: "Baixa"}
    ],
    dataTextField: "name",
    dataValueField: "id"
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
  $("#staActualSMod").kendoDropDownList({
    dataSource: [
      { id: "Alta", name: "Alta" },
      { id: "Baixa Temporal", name: "Baixa Temporal" },
      { id: "Baixa Definitiva", name: "Baixa Definitiva" }
    ],
    dataTextField: "name",
    dataValueField: "id"
  });

  $("#priresMod").kendoDropDownList({
    dataSource: [
      { id: "Alta", name: "Alta" },
      { id: "Mitja", name: "Mitja" },
      { id: "Baixa", name: "Baixa" }
    ],
    dataTextField: "name",
    dataValueField: "id"
  });

  $("#dropdownlist").kendoDropDownList();

  $("#showFormResponsible").click(function() {
    goToAddResponsible();
  });
  $("#returnSTA").click(function() {
    goToFitxaList();
  });
  $("#returnResponsible").click(function() {
    mostrarResponsablesTable();
    showAllInfo();
    goToShowAll();
    console.log('entra enrer');
  });
  $("#returnResponsible2").click(function() {
    mostrarResponsablesTable();
    showAllInfo();
    goToShowAll();
    console.log('entra enrer');
  });
  $("#returnResponsible3").click(function() {
    $("#responsibleModDiv").hide();
    $("#responsibleInfoDiv").show();
  });
  $(".notifications-switch").kendoSwitch();

  $(".phoneMask").kendoMaskedTextBox({
    mask: "000 000 000"
  });

  });


//tabs
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





  function goToFitxaList() {
    $('#addSTA').hide();
    $("#addResponsible").hide();
    $("#pageTables").hide();
    $("#responsibleInfoDiv").hide();
    $("#pageView").hide();
    $("#tableFitxaPersonal").show();
  }

  function showAllInfo(){
    $("#responsibleModDiv").hide();
    $(".fitxaPersonal").click(function() {
      let idFP = this.id;
      idFP = idFP.replace("fitxaPersonal", "");
      //AJAX mostrar info
      $.ajax({
        url: "../backend/selects/getFitxaPersonal.php",
        type: "GET",
        cache: false,
        success: function(response) {
          let myJSON = JSON.parse(response);
          let dniSelected;
          console.log(myJSON);
          //Clean FP
          $("#fpid").html('');
          $("#fpDNI").html('');
          $("#fpnom").html('');
          $("#fpcognom").html('');
          for (var i = 0; i < myJSON.length; i++) {
            if (myJSON[i].id==idFP) {
              console.log('entra fp'+ idFP);
              $("#fpid").html(idFP);
              dniSelected = myJSON[i].dninie;
              $("#fpDNI").html(myJSON[i].dninie);
              $("#fpnom").html(myJSON[i].name);
              $("#fpcognom").html(myJSON[i].surname);
            }
          }
          //Anar a mostrar info
          goToShowAll();
          //Tornar enrrere listener
          $("#returnFP").click(function() {
            goToFitxaList();
          });
          //AJAX Mostrar switch
          $.ajax({
            url: "../backend/selects/getSta.php",
            type: "GET",
            cache: false,
            success: function(response) {
              let myJSON = JSON.parse(response);
              for (let i = 0; i < myJSON.length; i++) {
                if (myJSON[i].user_dninif==dniSelected ) {
                  $('#staActualS').html(myJSON[i].actual_situation);
                  if (myJSON[i].actual_situation=="Alta") {
                    $("#staActualSMod").data("kendoDropDownList").select(0);
                  }else if (myJSON[i].actual_situation=="Baixa Temporal") {
                    $("#staActualSMod").data("kendoDropDownList").select(1);
                  }else{
                    $("#staActualSMod").data("kendoDropDownList").select(2);
                  }
                  $('#staHDate').html(myJSON[i].hiring_date);
                  $('#staHDateMod').val(myJSON[i].hiring_date);

                  if (myJSON[i].tf_service==1) {
                    $("#tf_service").data("kendoSwitch").check(true);
                  }else{
                    $("#tf_service").data("kendoSwitch").check(false);
                  }


                  if (myJSON[i].tcr_service==1) {
                    $("#tcr_service").data("kendoSwitch").check(true);
                  }else{
                    $("#tcr_service").data("kendoSwitch").check(false);
                  }


                  if (myJSON[i].cc_service==1) {
                    $("#cc_service").data("kendoSwitch").check(true);
                  }else{
                    $("#cc_service").data("kendoSwitch").check(false);
                  }


                  if (myJSON[i].tm_service==1) {
                    $("#tm_service").data("kendoSwitch").check(true);
                  }else{
                    $("#cc_service").data("kendoSwitch").check(false);
                  }


                  if (myJSON[i].tam_service==1) {
                    $("#tam_service").data("kendoSwitch").check(true);
                  }else{
                    $("#tam_service").data("kendoSwitch").check(false);
                  }


                  if (myJSON[i].gps_service==1) {
                    $("#gps_service").data("kendoSwitch").check(true);
                  }else{
                    $("#gps_service").data("kendoSwitch").check(false);
                  }

                  if (myJSON[i].umt_service==1) {
                    $("#umt_service").data("kendoSwitch").check(true);
                  }else{
                    $("#gps_service").data("kendoSwitch").check(false);
                  }
                }
              }
              modSTAListener();

            },
            error: function() {
              console.log('No hi ha STA');
            }
          });
          //Ajax mostrar responsables
          mostrarResponsablesTable();

          //Ajax afegir responsable
          $("#addResponsibleBtn").click(function() {
            //Afegir validació de camps aqui
            let sUserDninie = $("#fpDNI").html();
            let sPriority = $("#addPrioritat").val();
            let sName = $("#nom_responsableAdd").val();
            let sSurname = $("#cognoms_responsableAdd").val();
            let sAddress = $("#adreca_responsableAdd").val();
            let sPostCode = $("#cp_responsableAdd").val();
            let sContactPhone = $("#tel_responsableAdd").val();
            let sPreferablePhone = $("#hora_preferibleAdd").val();
            let sDateResponsible = $("#data_contactAdd").val();
            let sReason = $("#raoAdd").val();
            $.ajax({
              url: "../backend/inserts/insertResponsible.php",
              data: {
                sUserDninie: sUserDninie,
                sPriority: sPriority,
                sName: sName,
                sSurname: sSurname,
                sAddress: sAddress,
                sPostCode: sPostCode,
                sContactPhone: sContactPhone,
                sPreferablePhone: sPreferablePhone,
                sDateResponsible: sDateResponsible,
                sReason: sReason
              },
              type: "GET",
              cache: false,
              success: function(response) {
                //Reload all
                mostrarResponsablesTable();
                showAllInfo();
                goToShowAll();
              },
              error: function() {
                alert("Error en la consulta");
              }
            });
          });
        },
        error: function() {
          console.log('No hi han provincies');
        }
      });


    });
  }

  function mostrarResponsablesTable(){
    $.ajax({
      url: "../backend/selects/getResponsible.php",
      type: "GET",
      cache: false,
      success: function(response) {
        $("#tbResponsible").html("");
        let myJSON = JSON.parse(response);
        for (let i = 0; i < myJSON.length; i++) {
          if (myJSON[i].user_dninif==$("#fpDNI").html()) {
            let id = myJSON[i].id;
            let prioritat = myJSON[i].priority;
            let nom = myJSON[i].name;
            let cognom = myJSON[i].surname;
            showTableResponsibles(id, prioritat, nom, cognom);
          }
        }
        $('#dtResponsible').DataTable();
        //Seleccionar responsable listener
        showInfoResponsible();
      },
      error: function() {
        console.log('No hi han Resposables');
      }
    });
  }

  function showInfoResponsible(){
    $(".responsible").click(function() {
      idres = this.id;
      idres = idres.replace("responsibleId", "");
      //Obtenció de la informació del responsable
      $.ajax({
        url: "../backend/selects/getResponsible.php",
        type: "GET",
        cache: false,
        success: function(response) {
          $("#tbResponsible").html("");
          let myJSON = JSON.parse(response);
          //Netejar camps
          $("#idres").html('');
          $("#prires").html('');
          $("#nomres").html('');
          $("#cognomres").html('');
          $("#direcciores").html('');
          $("#cpres").html('');
          $("#telres").html('');
          $("#hourres").html('');
          $("#dateres").html('');
          $("#reasonres").html('');
          $("#priresMod").val('');
          $("#nomresMod").val('');
          $("#cognomresMod").val('');
          $("#direccioresMod").val('');
          $("#cpresMod").val('');
          $("#telresMod").val('');
          $("#hourresMod").val('');
          $("#dateresMod").val('');
          $("#reasonresMod").val('');
          for (let i = 0; i < myJSON.length; i++) {
            if (myJSON[i].id==idres) {
              //obtenció de les dades
              let id = myJSON[i].id;
              let prioritat = myJSON[i].priority;
              let nom = myJSON[i].name;
              let cognom = myJSON[i].surname;
              let address = myJSON[i].address;
              let cp = myJSON[i].post_code;
              let tel = myJSON[i].contact_phone;
              let horaPref = myJSON[i].preferable_hour;
              let dateres = myJSON[i].date_responsible;
              let reason = myJSON[i].reason;
              //Actualitzar info
              $("#idres").html(id);
              $("#prires").html(prioritat);
              $("#nomres").html(nom);
              $("#cognomres").html(cognom);
              $("#direcciores").html(address);
              $("#cpres").html(cp);
              $("#telres").html(tel);
              $("#hourres").html(horaPref);
              $("#dateres").html(dateres);
              $("#reasonres").html(reason);
              $("#priresMod").val(prioritat);
              $("#nomresMod").val(nom);
              $("#cognomresMod").val(cognom);
              $("#direccioresMod").val(address);
              $("#cpresMod").val(reason);
              $("#telresMod").val(tel);
              $("#hourresMod").val(horaPref);
              $("#dateresMod").val(dateres);
              $("#reasonresMod").val(reason);
            }
          }
          goToShowResponsible();
          eliminarResponsibleListener();
          modificarResponsibleListener();
        },
        error: function() {
          console.log('No hi han Resposables');
        }
      });
    });
  }

  function modificarResponsibleListener(){
    $("#responsibleModBtn").click(function() {
      $("#responsibleModDiv").show();
      $("#responsibleInfoDiv").hide();
      //Click guardar
      $("#ModResponsibleBtn").click(function() {
        //Obtenció de les dades
        let id = $("#idres").html();
        let prioritat = $("#priresMod").val();
        let nom = $("#nomresMod").val();
        let cognom = $("#cognomresMod").val();
        let direccio = $("#direccioresMod").val();
        let cp = $("#cpresMod").val();
        let tel = $("#telresMod").val();
        let hour = $("#hourresMod").val();
        let date = $("#dateresMod").val();
        let reason = $("#reasonresMod").val();
        //Funció ajax actualitzar
        $.ajax({
          url: "../backend/updates/responsible.php",
          data:{
            id: id,
            sPrority: prioritat,
            sName: nom,
            sSurname: cognom,
            sAddress: direccio, //$("#").val(),
            sPostcode: cp,
            sContact_phone: tel, //$("#modprovince").val(),
            sPreferable_hour: hour, //$("#modComarcas").val(),
            sDate_responsible: date,//$("#modMunicipios").val(),
            sReason: reason
          },
          type: "GET",
          cache: false,
          success: function(response) {
            //redirect
            mostrarResponsablesTable();
            showAllInfo();
            goToShowAll();
          },
          error: function() {
            console.log('Error al actualitzar les dades');
          }
        });
      });

    });
  }


  function modSTAListener(){
    //Amagar botó guardar per defecte
    $('#saveSTA').hide();
    $('#modSTA').show();
    $("#staHDateModDiv").hide();
    $("#staActualSModDiv").hide();
    $("#staHDate").show();
    $("#staActualS").show();
    //Al click modificar mostrar guardar, amagar modificar
    $("#modSTA").click(function() {
      $("#staHDateModDiv").show();
      $("#staActualSModDiv").show();
      $("#staHDate").hide();
      $("#staActualS").hide();
      $('#modSTA').hide();
      $('#saveSTA').show();
      //funcio habilitar botons
      enableSTASwitch();
      $("#saveSTA").click(function() {
        //Guardar Switch estat sta
        //obtenció dels estats del switch
        let tf;
        if ($("#tf_service").data("kendoSwitch").check()) {
          tf = 1;
        }else{
          tf = 0;
        }
        let tcr;
        if ($("#tcr_service").data("kendoSwitch").check()) {
          tcr = 1;
        }else{
          tcr = 0;
        }
        let cc;
        if ($("#cc_service").data("kendoSwitch").check()) {
          cc = 1;
        }else{
          cc = 0;
        }
        let tm;
        if ($("#tm_service").data("kendoSwitch").check()) {
          tm = 1;
        }else{
          tm = 0;
        }
        let tam;
        if ($("#tam_service").data("kendoSwitch").check()) {
          tam = 1;
        }else{
          tam = 0;
        }
        let gps;
        if ($("#gps_service").data("kendoSwitch").check()) {
          gps = 1;
        }else{
          gps = 0;
        }
        let umt;
        if ($("#umt_service").data("kendoSwitch").check()) {
          umt = 1;
        }else{
          umt = 0;
        }
        //AJAX Update dades
        let actual_situation_mod;
        let sActual_situation_mod;
        $.ajax({
          url: "../backend/updates/sta.php",
          data:{
            sActual_situation: $("#staActualSMod").val(),
            sHiring_date: $("#staHDateMod").val(),
            sUser_dninif: $("#fpDNI").html(),
            iTf_service: tf,
            iTcr_service: tcr,
            iCc_service: cc,
            iTm_service: tm,
            iTam_service: tam,
            iGps_service: gps,
            iUmt_service: umt
          },
          type: "GET",
          cache: false,
          success: function(response) {
            let myJSON = JSON.parse(response);
            //Mostrar les noves dades
            $("#staActualS").html($("#staActualSMod").val())
            $("#staHDate").html($("#staHDateMod").val())
            //tornar a amagar els camps
            disableSTASwitch();
            modSTAListener();
          },
          error: function() {
            console.log('Error al actualitzar les dades');
          }
        });

      });
    });
  }

  function showTableResponsibles(id, prioritat, nom, cognom){
    let html = "<tr><td>" + id + "</td><td>" + prioritat + "</td><td>" + nom + "</td><td>" + cognom + "</td><td><button id='responsibleId" + id + "' type='button' class='responsible btn btn-info marginBtn'>Fitxa Completa</button></td></tr>";
    $("#tbResponsible").append(html);
  }

  function enableSTASwitch(){
    $("#tf_service").data("kendoSwitch").enable(true);
    $("#tcr_service").data("kendoSwitch").enable(true);
    $("#cc_service").data("kendoSwitch").enable(true);
    $("#tm_service").data("kendoSwitch").enable(true);
    $("#tam_service").data("kendoSwitch").enable(true);
    $("#gps_service").data("kendoSwitch").enable(true);
    $("#umt_service").data("kendoSwitch").enable(true);
  }

  function disableSTASwitch(){
    $("#tf_service").data("kendoSwitch").enable(false);
    $("#tcr_service").data("kendoSwitch").enable(false);
    $("#cc_service").data("kendoSwitch").enable(false);
    $("#tm_service").data("kendoSwitch").enable(false);
    $("#tam_service").data("kendoSwitch").enable(false);
    $("#gps_service").data("kendoSwitch").enable(false);
    $("#umt_service").data("kendoSwitch").enable(false);
  }

  function goToShowAll(){
    $('#addSTA').hide();
    $("#addResponsible").hide();
    $("#pageTables").hide();
    $("#pageView").hide();
    $("#tableFitxaPersonal").hide();
    $("#responsibleInfoDiv").hide();
    $("#pageTables").show();
    $("#tableResponsible").show();


  }

  function goToAddSTA() {
    showDni();
    $("#tableFitxaPersonal").hide();
    $("#pageResponsable").hide();
    $("#responsibleInfoDiv").hide();
    $("#addSTA").show();
  }

  function goToAddResponsible() {
    showDni();
    $("#tableFitxaPersonal").hide();
    $("#pageResponsable").hide();
    $("#tableResponsible").hide();
    $("#responsibleInfoDiv").hide();
    $("#addResponsible").show();

  }

function goToShowResponsible(){
  $("#tableFitxaPersonal").hide();
  $("#pageResponsable").hide();
  $("#tableResponsible").hide();
  $("#responsibleInfoDiv").show();
  $("#addResponsible").hide();
  $("#responsibleModDiv").hide();
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
          $('#loaddiv').removeClass('hidden');
          $('#loader').hide();
        }
        $('#dtFitxaPersonal').DataTable();
        showAllInfo();
      },
      error: function() {
        console.log('No hi han clients');
      }
    });
  }

  function showFitxaPersonal(id, name, surname, dninie) {
    let html = "<tr><td>" + id + "</td><td>" + dninie + "</td><td>" + name + "</td><td>" + surname + "</td><td><button id='fitxaPersonal" + id + "' type='button' class='fitxaPersonal btn btn-info marginBtn'>Més Informació</button></td></tr>";
    $("#fitxaPersonalTable").append(html);

    /*$(".fitxaPersonal").click(function() {
      mostrarCardListener($(this).attr('id'));
    });*/
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
  $("#deleteResponsibleBtn").click(function(event) {
    idResponsible = $("#idres").html();
    $('#deleteResponsiblemodal').modal('show')
    $("#deleteResponsibleDef").click(function(event) {;
      deleteResponsible(idResponsible);


    });
  });
}

function deleteResponsible(idResponsible){
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

        mostrarResponsablesTable();
        showAllInfo();
        goToShowAll();

      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}
