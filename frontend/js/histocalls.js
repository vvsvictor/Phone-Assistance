$(document).ready(function () {
  $('.dataTables_length').addClass('bs-select');
  showTable();
  gotoModCall();
  addCallListener();

  $(".datePickerKendo").kendoDatePicker({
      format: "d/M/yyyy"
    });

  $("#type_call").kendoComboBox({
       dataSource: ["Item1", "Item2"]
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


});


function gotoModCall() {
  $('#modCallDiv').hide();
  $('#addCall').hide();
  $("#callList").show();
}

function callTypeListener(){
  if ($(provincias).val().includes("Entrant")) {
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

function addCallListener() {
  $("#showFormBtn").click(function() {
    //Ajax mostrar dnis
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        let dnis = [];
        for (var i = 0; i < myJSON.length; i++) {
          dnis.push(myJSON[i].dninie)
        }
        $("#adddni_usuari").val('');
        console.log(dnis);

        $("#adddni_usuari").kendoAutoComplete({
          maxSelectedItems: 1,
          dataSource: dnis,
          filter: "startswith",
          placeholder: "Selecciona un DNI..."
        });
        $("#call_type").hide();
        $("#data").val('');
        $("#type").val('');
        $("#state").val('');
        $("#callList").hide();
        $('#addCall').show();
      },
      error: function() {
        console.log('No hi han clients');
      }
    });
    //Ajax mostrar tipus TRUCADA
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
      },
      error: function() {
        console.log('No hi han tipus de trucades');
      }
    });
    //Ajax mostrar estat de la TRUCADA
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
    //Ajax mostrar tipus de trucada entrant
    $.ajax({
      url: "../backend/selects/getInCallType.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        let allIncallType = [];
        let incallType = [];
        let allsubclass1 = [];
        let allsubclass2 = [];
        let allsubclass3 = [];
        for (let i = 0; i < myJSON.length; i++) {
          allIncallType.push({ text: myJSON[i].incall_type , value: myJSON[i].id});
          if (myJSON[i].incallType == 'Trucada d’alarma') {
            allsubclass1.push({ text: myJSON[i].subclass , value: myJSON[i].id});
          }else if (myJSON[i].incallType == 'Trucada d’informació') {
            allsubclass2.push({ text: myJSON[i].subclass , value: myJSON[i].id});
          }else{
            allsubclass3.push({ text: myJSON[i].subclass , value: myJSON[i].id});
          }
        }
        for (let i = 0; i < allIncallType.length; i++) {
          let existeix = false;
          for (let j = 0; i < incallType.length; i++) {
            if (allIncallType[i].text == incallType[j].text) {
              existeix = true;
            }
          }
          if (!existeix) {
            incallType.push(allIncallType)
          }
        }
        $("#addentrant_call").val('');
        $("#addsubentrant_call").val('');
        $("#addentrant_call").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: allIncallType
        });

        },
          error: function() {
          console.log('No hi han estats de trucades');
        }
    });
    //En principi amagar tot
    $('#addentrant_call').hide();
    $('#addsubentrant_call').hide();
    $('#addsortint_call').hide();
    $('#addsubsortint_call').hide();
    //Si la trucada es entrant mostrar els tipus de trucada
    $( "#addtype_call" ).change(function() {
      if ($("#addtype_call").val()==1) {
        //Trucada entrant amagar sortnts
        $('#addentrant_call').show();
        $('#addsubentrant_call').hide();
        $('#addsubentrant_calllab').hide();
        $('#addsortint_call').hide();
        $('#addsortint_calllab').hide();
        $('#addsubsortint_call').hide();
        $('#addsubsortint_calllab').hide();
        $("#addentrant_call").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: allsubclass1
        });
        //Al modificar la trucada entrant
        $('#addentrant_call').change(function(){
          if ($('#addentrant_call').val()=="Trucada d'alarma") {
            $("#addsubentrant_call").kendoComboBox({
              dataTextField: "text",
              dataValueField: "value",
              dataSource: allsubclass1
            });
          }else if ($('#addentrant_call').val()=="Trucada d'informació") {
            $("#addsubentrant_call").kendoComboBox({
              dataTextField: "text",
              dataValueField: "value",
              dataSource: allsubclass2
            });
          }else{
            $("#addsubentrant_call").kendoComboBox({
              dataTextField: "text",
              dataValueField: "value",
              dataSource: allsubclass3
            });
          }
        });

      }else{
        //Trucada sortint
        $('#addentrant_call').hide();
        $('#addentrant_calllab').hide();
        $('#addsubentrant_call').hide();
        $('#addsubentrant_calllab').hide();
        $('#addsortint_call').show();
        $('#addsubsortint_call').hide();
        $('#addsubsortint_calllab').hide();

      }
      // Check input( $( this ).val() ) for validity here
    });
    $("#showListBtn").click(function() {
      goToCallList();
    });

  });

  $("#addCallBtn").click(function() {
    //Faltan comprovaciones de input correcto
    $.ajax({
      url: "../backend/inserts/insertCallHistory.php",
      data: {
        sDni: $("#adddni_usuari").val(),
        sCallDate: $("#adddata_trucada").val(),
        iCallType: $("#addtype_call").val(),
        iState: $("#addstate_call").val()
      },
      type: "GET",
      cache: false,
      success: function(response) {
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
