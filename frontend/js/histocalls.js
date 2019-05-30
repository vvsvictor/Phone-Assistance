$(document).ready(function () {
  goToCallList();
  $('.dataTables_length').addClass('bs-select');
  showTable();
  gotoModCall();
  addCall();

  $(".datePickerKendo").kendoDatePicker({
      format: "d/M/yyyy"
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
            text: "Trucada d'alarma", id: "Trucada d'alarma", items: [
                { text: "Emergències sanitàries", id: 1 },
                { text: "Emergències socials", id: 2},
                { text: "Emergències per crisi de soledat o angoixa", id: 3},
                { text: "Alarma sense resposta", id: 4}
            ]
        },
        {
            text: "Trucada d'informació", id: "Trucada d'informació" , items: [
                { text: "Trucada per error", id: 5 },
                { text: "Modificació de dades", id: 6 },
                { text: "Absencies", id: 7 },
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

function otherCallsListener(){
  console.log('othercall');
  let option = $("#addsortint_call").data("kendoDropDownTree").text();
  if (option == "Altres"){
    $('#addOtherCalls').show();
  }else{
    $('#addOtherCalls').hide();
  }
}

function gotoAddCall(){
  showDni();
  showCalls();
  showStateCall();
  $('#call_type').hide();
  $('#addCall').show();
  $("#callList").hide();
  $('#addOtherCalls').hide();
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
          },
            error: function() {
            console.log('No hi han estats de trucades');
          }
      });
    }

  function addCall(){
    $("#addCallBtn").click(function() {
      let dni = $("#adddni_usuari").val();
      dni = dni.split(') ').pop();
      let data_trucada = $("#adddata_trucada").val();
      let estat_trucada = $("#addstate_call").val();
      let solucio = $("#rao").val();
      let motiu = $("#addMotiu").val();
      let descripcio = $("#addDescription").val();
      let destinatari = $("#addDestinatari").val();
      if ($("#addtype_list").val()=="Entrant") {
        //Tipus de trucada entrant
<<<<<<< HEAD
        let incall = $("#addentrant_call").data("kendoDropDownTree").value().text;
        $.ajax({
          url: "../backend/inserts/insertCallHistory.php",
=======
        let incall = $("#addentrant_call").data("kendoDropDownTree").value();
        $.ajax({
          url: "../backend/inserts/insertInCall.php",
>>>>>>> d9b0092271b79ac5376145ee06420d7a8ca5cf3f
          data: {
            sDniNif: dni,
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
        let outcall = $("#addsortint_call").data("kendoDropDownTree").value();
        $.ajax({
          url: "../backend/inserts/insertCallHistory.php",
          data: {
            sDniNif: dni,
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
      }


  });
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
  let html="<tr><td>"+id+"</td><td>"+dni+"</td><td>"+date+"</td><td>"+type+"</td><td><button id='histoCall" + id + "' type='button' class='histoCall btn btn-info marginBtn'>Fitxa Completa</button><button type='button' id='deleteCallId" + id + "' class='deletecall btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecallmodal'>Eliminar</button></td></tr>";
  $("#histoCallsTable").append(html);

  $(".histoCall").click(function() {
    mostrarCardListener($(this).attr('id'));
  });
}

function mostrarCardListener(id) {
    let idbtn = id;
    idbtn = idbtn.replace("histoCall", "");
    $.ajax({
      url: "../backend/selects/getCallHistory.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        $("#fpdni").html("");
        $("#fpdata").html("");
        $("#fptype").html("");
        $("#fpin").html("");
        $("#fpout").html("");
        $("#fpstate").html("");
        $("#fpsolution").html("");
        $("#fpreason").html("");
        $("#fpdescription").html("");
        $("#fpaddressee").html("");
        for (var i = 0; i < myJSON.length; i++) {
          if (idbtn == myJSON[i].id) {
            let dninie = myJSON[i].user_dninif;
            let call_date = myJSON[i].call_date;
            let call_type = myJSON[i].call_type;
            let incall_type = myJSON[i].in_calltype;
            let outcall_type = myJSON[i].outcall_type;
            let call_state = myJSON[i].call_state;
            let teleoperator_solution = myJSON[i].teleoperator_solution;
            let reason_for_advice = myJSON[i].reason_for_advice;
            let description = myJSON[i].description;
            let destiny_advice = myJSON[i].Destiny_advice;
            $("#fpdni").val(dninie);
            $("#fpdata").val(call_date);
            $("#fptype").val(call_type);
            $("#fpin").val(incall_type);
            $("#fpout").val(outcall_type);
            $("#fpstate").val(call_state);
            $("#fpsolution").val(teleoperator_solution);
            $("#fpreason").val(reason_for_advice);
            $("#fpdescription").val(description);
            $("#fpaddressee").val(destiny_advice);
            goToCall();
          }
        }
      },
      error: function() {
        console.log('No hi han clients');
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
