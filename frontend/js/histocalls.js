$(document).ready(function () {
  $('.dataTables_length').addClass('bs-select');
  showTable();
  gotoModCall();
  addCall();

  $(".datePickerKendo").kendoDatePicker({
      format: "d/M/yyyy"
    });

  $("#outcall").kendoComboBox({
       dataSource: ["Item1", "Item2"]
  });

  $("#incall").kendoComboBox({
       dataSource: ["Item1", "Item2"]
  });

  $("#state_call").kendoComboBox({
       dataSource: ["Item1", "Item2"]
  });

  $("#returnCalls").click(function() {
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
  $("#showFormBtn").click(function(){
    gotoAddCall();
  });
  $("#addentrant_call").kendoDropDownTree({
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
  $("#addDestinatari").kendoDropDownList();
});

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

<<<<<<< HEAD
=======
function addCallListener() {
  $("#addCallbtn").click(function() {

  });
}
>>>>>>> ebb2e1d763409e1263c88f4eddc84d018febd5e6

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
      dni = dni.split('(Id:').pop().split(')')[0];
      let data_trucada = $("#adddata_trucada").val();
      let tipus_trucada = $("#addtype_list").val();
      let estat_trucada = $("#addstate_call").val();
<<<<<<< HEAD
      let incall = $("#addentrant_call").data("kendoDropDownTree").value().text;
      let outcall = $("#addsortint_call").data("kendoDropDownTree").value().text;
=======
      let incall = $("#addentrant_call").data("kendoDropDownList").value();
      let outcall = $("#addsortint_call").data("kendoDropDownTree").value();
>>>>>>> 57e24573a4fa4030c57b178f9715016865508eed
      let solucio = $("#rao").val();
      let motiu = $("#addMotiu").val();
      let descripcio = $("#addDescription").val();
      let destinatari = $("#addDestinatari").val();
      $.ajax({
        url: "../backend/inserts/insertCallHistory.php",
        data: {
          $sDniNif: dni,
          $sCallDate:data_trucada,
          $iCallType:tipus_trucada,
          $iCallState:estat_trucada,
          iOutcallType:outcall,
          iIncallType:incall,
          $sTeleoperatorSolution:solucio,
          $sReasonAdvice: motiu,
          $sDescription: descripcio,
          $sDestinyAdvice: destinatari
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
  });
}


function goToCallList(){
  $('#modCallDiv').hide();
  $('#addCall').hide();
  $("#callList").show();
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
