$(document).ready(function () {
  goToCallList();
  $('.dataTables_length').addClass('bs-select');
  showTable();
  gotoModCall();


  $(".datePickerKendo").kendoDatePicker({
      format: "yyyy/M/d"
    });

  $("#returnCalls").click(function() {
    goToCallList();
  });
  $("#returnCall").click(function() {
    goToCallList();
  });
  $("#returnCall2").click(function() {
    goToCallList();
  });

  $("#addtype_list").kendoDropDownList({
    dataSource: [
      {id: "Entrant" , name: "Entrant"},
      {id: "Sortint" , name: "Sortint"}
    ],
    dataTextField: "name",
    dataValueField: "id"
  });
  $("#modtype_list").kendoDropDownList({
    dataSource: [
      {id: "Entrant" , name: "Entrant"},
      {id: "Sortint" , name: "Sortint"}
    ],
    dataTextField: "name",
    dataValueField: "id"
  });
  $("#showFormBtn").click(function(){
    gotoAddCall();
  });
  $("#addentrant_call").kendoDropDownTree({
    placeholder: "Selecciona el tipus de trucada entrant ...",
    height: "auto",
    dataSource: [
        {
            text: "Trucada d'alarma", id: 0, items: [
                { text: "Emergències sanitàries", id: 1 },
                { text: "Emergències socials", id: 2},
                { text: "Emergències per crisi de soledat o angoixa", id: 3},
                { text: "Alarma sense resposta", id: 4}
            ]
        },
        {
            text: "Trucada d'informació", id: 0 , items: [
                { text: "Trucada per error", id: 5 },
                { text: "Modificació de dades", id: 6 },
                { text: "Absències", id: 7 },
                { text: "Estades Temporals", id: 8}
            ]
        },
        {
          text: "Soletat", id: 9
        },
        {
          text: "De reclamació", id: 10
        }
      ],
      dataTextField: "text",
      dataValueField: "id"
  });

  $("#modentrant_call").kendoDropDownTree({
    placeholder: "Selecciona el tipus de trucada entrant ...",
    height: "auto",
    dataSource: [
        {
            text: "Trucada d'alarma", id: "Trucada d'alarma", items: [
                { text: "Emergències sanitàries", id: "Emergències sanitàries" },
                { text: "Emergències socials", id: "Emergències socials"},
                { text: "Emergències per crisi de soledat o angoixa", id: "Emergències per crisi de soledat o angoixa"},
                { text: "Alarma sense resposta", id: "Alarma sense resposta"}
            ]
        },
        {
            text: "Trucada d'informació", id: "Trucada d'informació" , items: [
                { text: "Trucada per error", id: "Trucada per error" },
                { text: "Modificació de dades", id: "Modificació de dades" },
                { text: "Absencies", id: "Absencies" },
                { text: "Estades Temporals", id: "Estades Temporals", items: [
                  { text: "Data d'absència", id: "Data d'absència"},
                  { text: "Data de previsió de la tornada a l'habitatge", id: "Data de previsió de la tornada a l'habitatge"}
                ]}
            ]
        },
        {
          text: "Soletat", id: "Soletat"
        },
        {
          text: "De reclamació", id: "De reclamació"
        }
      ]
  });
  $("#addsortint_call").kendoDropDownTree({
          placeholder: "Selecciona el tipus de trucada sortint ...",
          height: "auto",
          dataSource: [
              {
                  text: "Trucada d'agenda", id: 0 , items: [
                      { text: "Recordartori de medicació", id: 1 },
                      { text: "Recordartori de visites mèdiques", id: 2 },
                      { text: "Felicitació", id: 3},
                      { text: "Agenda tècnica", id: 4 }
                  ]
              },
              {
                  text: "Trucada de seguiment", id: 0, items: [
                      { text: "Seguidament del regés a la llar de la persona usuària", id: 5},
                      { text: "Seguiment del procés de dol", id: 6},
                      { text: "Seguiment després de l'alta hospitalària", id: 7},
                  ]
              },
              {
                  text: "Trucada d'agenda preventiva", id: 0, items: [
                      { text: "Condicions ambientals", id: 8},
                      { text: "Seguretat de la via", id: 9},
                      { text: "Campanyes de vacunacio", id: 10},
                      { text: "Altres", id: 11}
                  ]
              }
          ],
          dataTextField: "text",
          dataValueField: "id"
    });
    $("#modsortint_call").kendoDropDownTree({
            placeholder: "Selecciona el tipus de trucada sortint ...",
            height: "auto",
            dataSource: [
                {
                    text: "Trucada d'agenda", id: "Trucada d'agenda" , items: [
                        { text: "Recordartori de medicació", id: "Recordartori de medicació" },
                        { text: "Recordartori de visites mèdiques", id: "Recordartori de visites mèdiques" },
                        { text: "Felicitació", id: "Felicitació"},
                        { text: "Agenda tècnica", id: "Agenda tècnica" }
                    ]
                },
                {
                    text: "Trucada de seguiment", id: "Trucada de seguiment", items: [
                        { text: "Seguidament del regés a la llar de la persona usuària", id: "Seguidament del regés a la llar de la persona usuària"},
                        { text: "Seguiment del procés de dol", id: "Seguiment del procés de dol"},
                        { text: "Seguiment després de l'alta hospitalària", id: "Seguiment després de l'alta hospitalària"},
                    ]
                },
                {
                    text: "Trucada d'agenda preventiva", id: "Trucada d'agenda preventiva", items: [
                        { text: "Condicions ambientals", id: "Condicions ambientals"},
                        { text: "Seguretat de la via", id: "Seguretat de la via"},
                        { text: "Campanyes de vacunacio", id: "Campanyes de vacunacio"},
                        { text: "Altres", id: "Altres"}
                    ]
                }
            ],
            dataTextField: "text",
            dataValueField: "id"
      });
  $("#addDestinatari").kendoDropDownList();
  $("#modaddressee").kendoDropDownList();
  addCall();
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

function gotoAddCall(){
  $("#addMotiu").val('');
  $("#addDescription").val('');
  $("#rao").val('');
  $("#adddni_usuari").val('');
  $("#adddata_trucada").val('');
  showDni();
  showCalls();
  showStateCall();
  $('#call_type').hide();
  $('#addCall').show();
  $("#callList").hide();
  $('#addOtherCalls').hide();

  $("#addentrant_call").data("kendoDropDownTree").value('');
  $("#addsortint_call").data("kendoDropDownTree").bind("change", otherCallsListener);
}

function gotoModCall() {
  $('#modCallDiv').hide();
  $('#addCall').hide();
  $("#callList").show();
}

function goToCall() {
  $("#pageCalls").show();
  $("#callList").hide();
}

function callTypeListener(){
  var type = $("#addtype_list").data("kendoDropDownList").select();
  if (type == 0) {
    $("#call_type").show();
    $("#entry_type").show();
    $("#exit_type").hide();
  }else{
    $("#call_type").show();
    $("#exit_type").show();
    $("#entry_type").hide();
  }
}

function returnCall(){
  returnCalls
}

function mostrarCallListener() {

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
          $("#adddni_usuari").kendoAutoComplete({
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

  function showCalls(){
      $.ajax({
        url: "../backend/selects/getCallType.php",
        type: "GET",
        cache: false,
        success: function(response) {
          let myJSON = JSON.parse(response);
          let tipustrucada = [];
          for (var i = 0; i < myJSON.length; i++) {
            tipustrucada.push({ text: myJSON[i].call_type , value: myJSON[i].id});
          }
          $("#addtype_call").val('');
          console.log(tipustrucada);
          $("#addtype_call").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: tipustrucada
          });

          callTypeListener();
        },
        error: function() {
          console.log('No hi han tipus de trucades');
        }
      });
    }

  function showStateCall(){
      $.ajax({
        url: "../backend/selects/getCallState.php",
        type: "GET",
        cache: false,
        success: function(response) {
          let myJSON = JSON.parse(response);
          let estattrucada = [];
          for (var i = 0; i < myJSON.length; i++) {
            estattrucada.push({ text: myJSON[i].call_type , value: myJSON[i].id});
          }
          $("#addstate_call").val('');
          console.log(estattrucada);
          $("#addstate_call").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: estattrucada
          });
          $("#addstate_call").data("kendoComboBox").value("");
          },
            error: function() {
            console.log('No hi han estats de trucades');
          }
      });
    }

  function addAmagar(){
    if ($("#addentrant_call").data("kendoDropDownTree").value()==8) {
      $("#divAbsencia").show();
      $("#divPrev").show();
    }else{
      $("#divAbsencia").hide();
      $("#divPrev").hide();
    }

    if ($("#addsortint_call").data("kendoDropDownTree").value()==11) {
      $("#divAltres").show();
    }else{
      $("#divAltres").hide();
    }
  }

  function addCall(){
    $("#divAbsencia").hide();
    $("#divPrev").hide();
    $("#divAltres").hide();
    $("#addentrant_call").data("kendoDropDownTree").bind("change", addAmagar);
    $("#addsortint_call").data("kendoDropDownTree").bind("change", addAmagar);
    $("#addCallBtn").click(function() {
      let dni = $("#adddni_usuari").val();
      dni = dni.split(') ').pop();
      let data_trucada = $("#adddata_trucada").val();
      let estat_trucada = $("#addstate_call").val();
      let solucio = $("#rao").val();
      let dateAbs = $("#adddataabs").val();
      let datePrev = $("#adddataprev").val();
      let altres = $("#addAltres").val();
      let motiu = $("#addMotiu").val();
      let descripcio = $("#addDescription").val();
      let destinatari = $("#addDestinatari").val();
      if ($("#addtype_list").val()=="Entrant") {
        //Tipus de trucada entrant
        let incall = $("#addentrant_call").data("kendoDropDownTree").value();
        if (incall != 8 && incall != 13) {
          dateAbs="";
          datePrev="";
          altres ="";
        }
        if (dni!="" && data_trucada!="" && incall!=0 && estat_trucada!="" && correctDate(data_trucada) ) {
          $.ajax({
            url: "../backend/inserts/insertInCall.php",

            data: {
              sDniNif: dni,
              absence_date:dateAbs,
              return_date: datePrev,
              other: altres,
              sCallDate:data_trucada,
              iCallType:1,
              iCallState:estat_trucada,
              iIncallType:incall,
              sTeleoperatorSolution:solucio,
              sReasonAdvice: motiu,
              sDescription: descripcio,
              sDestinyAdvice: destinatari
            },
            type: "GET",
            cache: false,
            success: function(response) {
              console.log("entra dades");
              console.log(response);
              let myJSON = JSON.parse(response);
              showTable();
              goToCallList();
              if (parseInt(myJSON.codigoError) != 0) {
                console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
              }
            },
            error: function() {
              alert("Error en la consulta");
            }
          });
        }else{
          alert("Falten camps i/o són incorrectes");
        }

      }else{
        let outcall = $("#addsortint_call").data("kendoDropDownTree").value().id;
        if (outcall!=11) {
          dateAbs="";
          datePrev="";
          altres ="";
        }
        if (dni!="" && data_trucada!="" && outcall!=0 && estat_trucada!="" && correctDate(data_trucada) ) {
          $.ajax({
            url: "../backend/inserts/insertCallHistory.php",
            data: {
              sDniNif: dni,
              absence_date:dateAbs,
              return_date: datePrev,
              other: altres,
              sCallDate:data_trucada,
              iCallType:2,
              CallState:estat_trucada,
              OutcallType:outcall,
              sTeleoperatorSolution:solucio,
              sReasonAdvice: motiu,
              sDescription: descripcio,
              sDestinyAdvice: destinatari
            },
            type: "GET",
            cache: false,
            success: function(response) {
              console.log("entra dades");
              console.log(response);
              let myJSON = JSON.parse(response);
              showTable();
              goToCallList();
              if (parseInt(myJSON.codigoError) != 0) {
                console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
              }
            },
            error: function() {
              alert("Error en la consulta");
            }
          });
        }else{
          alert("Falten camps i/o són incorrectes");
        }

      }


  });
}

function correctDate(date){
  return !isNaN(Date.parse(date));
}

function otherCallsListener(){
  console.log('othercall');
  let option = $("#addsortint_call").data("kendoDropDownTree").text();
  if (option == "Altres"){
    $('#addOtherCalls').show();
  }else{
    $('#addOtherCalls').hide();
  }
}

function goToCallList(){
  $('#modCallDiv').hide();
  $('#addCall').hide();
  $("#callList").show();
  $("#pageCalls").hide();
  $("#modpageCalls").hide();
}

function modCallListener() {
  $(".modcall").click(function() {
    let idCall = this.id;

    $.ajax({
      url: "../backend/selects/getCallHistory.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        for (let i = 0; i < myJSON.length; i++) {
          let id = myJSON[i].id;
          let dni = myJSON[i].user_dninif;
          let callDate = myJSON[i].call_date;
          let callType = myJSON[i].call_type;
          let outcallType = myJSON[i].outcall_type;
          let incallType = myJSON[i].incall_type;
          let callState = myJSON[i].call_state;
          let teleoperatorSolution = myJSON[i].teleoperator_solution;
          console.log(id);
          console.log(idCall);
          if ("modCallId" + id == idCall) {
            $("#modDni").val(dni);
            $("#modCallDate").val(callDate);
            $("#modCallType").val(callType);
            $("#modOutcallType").val(outcallType);
            $("#modIncallType").val(incallType);
            $("#modCallState").val(callState);
            $("#modTeleoperatorSolution").val(teleoperatorSolution);
          }
            gotoModCall();
            //Botó tornar enrrere
            $("#showListBtnMod").click(function() {
              goToCallList();
            });
            //Click al botó modificar usuari
            $("#modCallBtn").click(function() {
              $.ajax({
                url: "../backend/updates/histocalls.php",
                data: {
                  sDni:$("#user_dninif").val(),
                  sCallDate:$("#call_date").val(),
                  iCallType:$("#call_type").value(),
                  iOutcallType:$("#outcall_type").val(''),
                  iIncallType:$("#incall_type").val(''),
                  iCallState:$("#call_state").val(''),
                  sTeleoperatorSolution:$("#teleoperator_solution").val('')
                },
                type: "GET",
                cache: false,
                success: function(response) {
                  let myJSON = JSON.parse(response);
                  //reload users
                  showTable();
                  goToCallList();
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

function showTable(){
  $.ajax({
    url: "../backend/selects/getCallHistory.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      console.log(myJSON);
      $("#histoCallsTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let dni = myJSON[i].user_dninif;
        let date = myJSON[i].call_date;
        let type = myJSON[i].call_type;
        showHistoCall(id, dni, date, type);
      }
      $('#dtHistocalls').DataTable();
      $('#loaddiv').removeClass('hidden');
      $('#loader').hide();
      eliminarCallListener();
    },
    error: function() {
      console.log('No hi han trucades');
    }
  });
}

function showHistoCall(id, dni, date, type){
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+date+"</td><td>"+type+"</td><td><button id='histoCall" + id + "' type='button' class='histoCall btn btn-info marginBtn'><i class='fa fa-file'></i> Fitxa Completa</button><button type='button' id='deleteCallId" + id + "' class='deletecall btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecallmodal'><i class='fa fa-trash'></i> Eliminar</button></td></tr>";
  $("#histoCallsTable").append(html);

  $(".histoCall").click(function() {
    mostrarCardListener($(this).attr('id'));
  });
}

function mostrarCardListener(id) {
    let idbtn = id;
    idbtn = idbtn.replace("histoCall", "");
    console.log("mostrar entrar modCardListener");
    $.ajax({
      url: "../backend/selects/getCallHistory.php",
      type: "GET",
      cache: false,
      success: function(response) {
        console.log(response);
        let myJSON = JSON.parse(response);
        $("#fpdni").html("");
        $("#fpdata").html("");
        $("#fptype").html("");
        $("#fpin").html("");
        $("#fpsinout").html("");
        $("#fpabs").html("");
        $("#fpprev").html("");
        $("#fpstate").html("");
        $("#fpsolution").html("");
        $("#fpreason").html("");
        $("#fpdescription").html("");
        $("#fpaddressee").html("");
        for (var i = 0; i < myJSON.length; i++) {

          if (idbtn == myJSON[i].id) {
            let dninie = myJSON[i].user_dninif;
            let call_date = myJSON[i].call_date;
            let absence_date = myJSON[i].absence_date;
            let return_date = myJSON[i].return_date;
            if(absence_date == "" && return_date == ""){
              $("#showDataAbs").hide();
              $("#showDataPrev").hide();
            }else{
              $("#fpabs").html(absence_date);
              $("#fpprev").html(return_date);
            }
            let call_type = myJSON[i].call_type;
            let incall_type = myJSON[i].incall_type;
            let outcall_type = myJSON[i].outcall_type;
            let incall_subclass = myJSON[i].incall_subclass;
            let outcall_subclass = myJSON[i].outcall_subclass;
            if (call_type = "Entrant"){
              $("#showInType").show();
              $("#showOutType").hide();
              $('#fpin').html(incall_type);
              $("#fpsinout").html(incall_subclass);
            }else{
              $("#showInType").hide();
              $("#showOutType").show();
              $('#fpout').html(outcall_type);
              $("#fpsinout").html(outcall_subclass);
            }
            let call_state = myJSON[i].call_state;
            let teleoperator_solution = myJSON[i].teleoperator_solution;
            let reason_for_advice = myJSON[i].reason_for_advice;
            let description = myJSON[i].description;
            let destiny_advice = myJSON[i].Destiny_advice;
            $("#fpdni").html(dninie);
            $("#fpdata").html(call_date);
            $("#fptype").html(call_type);
            $('#fpin').html(incall_type);
            $("#fpstate").html(call_state);
            $("#fpsolution").html(teleoperator_solution);
            $("#fpreason").html(reason_for_advice);
            $("#fpdescription").html(description);
            $("#fpaddressee").html(destiny_advice);
            goToCall();
          }
        }
      },
      error: function() {
        console.log('No hi han trucades');
      }
    });
}


function eliminarCallListener() {
  let idCall;
  $(".deletecall").click(function(event) {
    console.log("The id call is: " + idCall);
    idCall = this.id;
    idCall = idCall.replace("deleteCallId", "");
    console.log("The id call is: " + idCall);
    $("#deleteCallDef").click(function(event) {
      deleteCall(idCall);
    });
  });
}


function deleteCall(idCall) {
  console.log(idCall);
  $.ajax({
    url: "../backend/delete/deleteCallHistory.php",
    data: {
      id: idCall
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
