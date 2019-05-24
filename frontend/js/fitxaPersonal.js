$(document).ready(function() {
  $('.dataTables_length').addClass('bs-select');
  goToFpList();
  $("#showFormPF").click(function() {
    //neteja inputs
    cleanInputs();
    goToAddFp();

  });
  $("#returnPF").click(function() {
    goToFpList();
  });
  //jquery functions
  $(".opciones").checkboxradio();
  $(".datepicker").kendoDatePicker();
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


function showTable() {
  $.ajax({
    url: "../backend/selects/getFitxaPersonal.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#fitxaPersonalTable").html("");
      for (var i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let name = myJSON[i].name;
        let surname = myJSON[i].surname;
        let dninie = myJSON[i].dninie;
        let province = myJSON[i].province;
        showFitxaPersonal(id, name, surname, dninie, province);
      }
      $('#dtFitxaPersonal').DataTable();
      eliminarCardListener();
      mostrarCardListener();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });
}

function showProvinces() {
  $.ajax({
    url: "../backend/selects/getProvinces.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      let provincias = [];
      for (var i = 0; i < myJSON.length; i++) {
        let province = myJSON[i].prov_name;
        let id = myJSON[i].id;
        provincias.push("(Id:" + id + ") " + province);
      }
      $("#provincias").kendoAutoComplete({
        filter: "contains",
        dataSource: provincias,
        placeholder: "Selecciona una provincia...",
      });
    },
    error: function() {
      console.log('No hi han provincies');
    }
  });
}

function showComarcas() {
  $.ajax({
    url: "../backend/selects/getComarcas.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      let comarcas = [];
      for (var i = 0; i < myJSON.length; i++) {
        let comarca = myJSON[i].comar_name;
        let id = myJSON[i].id;
        comarcas.push("(Id:" + id + ") " + comarca);
      }
      $("#comarcas").kendoAutoComplete({
        filter: "contains",
        dataSource: comarcas,
        placeholder: "Selecciona una comarca...",
      });
    },
    error: function() {
      console.log('No hi han comarques');
    }
  });
}

function showMunisipalitys() {
  $.ajax({
    url: "../backend/selects/getMunisipalitys.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      let munisipalitys = [];
      for (var i = 0; i < myJSON.length; i++) {
        let munisipality = myJSON[i].muni_name;
        let id = myJSON[i].id;
        munisipalitys.push("(Id:" + id + ") " + munisipality);
      }
      $("#municipios").kendoAutoComplete({
        filter: "contains",
        dataSource: munisipalitys,
        placeholder: "Selecciona un municipi...",
      });
    },
    error: function() {
      console.log('No hi han municipis');
    }
  });
}



function addFitxaPersonal() {
  $("#addPersonalCard").click(function() {
    let nom = $("#addNom").val();
    let cognom = $("#addCognom").val();
    let dni = $("#addDni").val();
    let genere = $("#addGenere").val();
    let idioma = document.querySelector('input[name="idioma"]:checked').value;
    let idioma_s = document.querySelector('input[name="idioma_s"]:checked').value;
    //if ==0 return null
    let dataNaixemement = $("#addDataNaixement").val();
    let adreca = $("#addAdreca").val();
    let tipusHabitatge = $("#addTipus_habitatge").val();
    let titularitatHab = document.querySelector('input[name="titularitat"]:checked').value;
    let provincia = $("#provincias").val();
    provincia = provincia.split('(Id:').pop().split(')')[0];
    let comarca = $("#comarcas").val();
    comarca = comarca.split('(Id:').pop().split(')')[0];
    let municipi = $("#municipios").val();
    municipi = municipi.split('(Id:').pop().split(')')[0];
    let telFixe = $("#addTel_fijo").val();
    let telMovil = $("#addMovil").val();
    let telTreball = $("#addTelTreball").val();
    if (nom != "" && cognom != "" && dni != "" && genere != "" && dataNaixemement != "" && adreca != "" && tipusHabitatge != "" && !isNaN(provincia) && !isNaN(comarca) && !isNaN(municipi) && !isNaN(telFixe) && !isNaN(telMovil) && !isNaN(telTreball)) {
        console.log("entraclick");
        $.ajax({
          url: "../backend/inserts/insertPersonalCard.php",
          data: {
            sName: nom,
            sSurname: cognom,
            sGender: genere,
            iLanguage: idioma,
            iLanguageSigne: idioma_s,
            sBirthdate: dataNaixemement,
            sDninie: dni,
            iProvince: provincia,
            iComarca: comarca,
            iMunicipality: municipi,
            sAddress: adreca,
            sTypeHouse: tipusHabitatge,
            iOwnership: titularitatHab,
            sPhone: telFixe,
            sMobilePhone: telMovil,
            sWorkPhone: telTreball
          },
          type: "GET",
          cache: false,
          success: function(response) {
            console.log("entra dades");
            let myJSON = JSON.parse(response);
            showTable();
            goToFpList();

            if (parseInt(myJSON.codigoError) != 0) {
              console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
            }
          },
          error: function() {
            alert("Error en la consulta");
          }
        });

    } else {
      //Funcion de eror al añadir fitxa personal
      alert("Error: Dades mal introduïdes")
    }
  });

}



function goToFpList() {
  showTable();
  $("#pageFp").hide();
  $("#tableFitxaPersonal").show();
  $("#addFp").hide();
}

function goToAddFp() {
  showComarcas();
  showProvinces();
  showMunisipalitys();
  $('input:radio[name=idioma][value=1]').click();
  $('input:radio[name=idioma_s][value=0]').click();
  $('input:radio[name=titularitat][value=1]').click();
  $("#pageFp").hide();
  $("#tableFitxaPersonal").hide();
  $("#addFp").show();
  addFitxaPersonal();
}

function goToFp() {
  $("#pageFp").show();
  $("#tableFitxaPersonal").hide();
  $("#addFp").hide();
}

function cleanInputs(){
  //Neteja de camps
  let nom = $("#addNom").val('');
  let cognom = $("#addCognom").val('');
  let dni = $("#addDni").val('');
  let genere = $("#addGenere").val('');
  let dataNaixemement = $("#addDataNaixement").val('');
  let adreca = $("#addAdreca").val('');
  let tipusHabitatge = $("#addTipus_habitatge").val('');
  let provincia = $("#provincias").val('');
  let comarca = $("#comarcas").val('');
  let municipi = $("#municipios").val('');
  let telFixe = $("#addTel_fijo").val('');
  let telMovil = $("#addMovil").val('');
  let telTreball = $("#addTelTreball").val('');
  $("#resNom").html('');
  $("#resCognom").html('');
  $("#resCarrer").html('');
  $("#resCodiPostal").html('');
  $("#resTel").html('');
  $("#resHorari").html('');
  $("#resData").html('');
  $("#resPrioritat").html('');
  $("#resRao").html('');
}


function showFitxaPersonal(id, name, surname, dninie, province) {
  let html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + surname + "</td><td>" + dninie + "</td><td>" + province + "</td><td><button id='fitxaPersonal" + id + "' type='button' class='fitxaPersonal btn btn-info marginBtn'>Fitxa Completa</button><button type='button' id='deleteCardId" + id + "' class='deletecard btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecardmodal'>Eliminar</button></td></tr>";
  $("#fitxaPersonalTable").append(html);
}

function mostrarCardListener() {
  $(".fitxaPersonal").click(function(event) {
    let id = this.id;
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        $("#fpname").html("");
        $("#fpsurname").html("");
        $("#fpdninie").html("");
        $("#fpbirthdate").html("");
        $("#fpprovince").html("");
        $("#fpcomarca").html("");
        $("#fpmunicipality").html("");
        $("#fpaddress").html("");
        $("#fpphone").html("");
        $("#fpmobile_phone").html("");
        $("#fpwork_phone").html("");
        for (var i = 0; i < myJSON.length; i++) {
          let id = myJSON[i].id;
          let name = myJSON[i].name;
          let surname = myJSON[i].surname;
          let dninie = myJSON[i].dninie;
          let birthdate = myJSON[i].birthdate;
          let province = myJSON[i].province;
          let comarca = myJSON[i].comarca;
          let municipality = myJSON[i].municipality;
          let address = myJSON[i].address;
          let phone = myJSON[i].phone;
          let mobile_phone = myJSON[i].mobile_phone;
          let work_phone = myJSON[i].work_phone;
          $("#fpname").html(name);
          $("#fpsurname").html(surname);
          $("#fpdninie").html(dninie);
          $("#fpbirthdate").html(birthdate);
          $("#fpprovince").html(province);
          $("#fpcomarca").html(comarca);
          $("#fpmunicipality").html(municipality);
          $("#fpaddress").html(address);
          $("#fpphone").html(phone);
          $("#fpmobile_phone").html(mobile_phone);
          $("#fpwork_phone").html(mobile_phone);
          goToFp();
          $.ajax({
            url: "../backend/selects/getResponsible.php",
            type: "GET",
            cache: false,
            success: function(response) {
              let myJSON = JSON.parse(response);
              for (let i = 0; i < myJSON.length; i++) {
                if (myJSON[i].user_dninif==dninie) {
                  $("#resNom").html(myJSON[i].name);
                  $("#resCognom").html(myJSON[i].surname);
                  $("#resCarrer").html(myJSON[i].address);
                  $("#resCodiPostal").html(myJSON[i].post_code);
                  $("#resTel").html(myJSON[i].contact_phone);
                  $("#resHorari").html(myJSON[i].preferable_hour);
                  $("#resData").html(myJSON[i].date_responsible);
                  $("#resPrioritat").html(myJSON[i].priority);
                  $("#resRao").html(myJSON[i].reason);
                }
              }

            },
            error: function() {
              console.log('No hi ha responsable');
            }
          });


        }

      },
      error: function() {
        console.log('No hi han clients');
      }
    });

  });
}

function eliminarCardListener() {
  let idCard;
  $(".deletecard").click(function(event) {
    idCard = this.id;
    idCard = idCard.replace("deleteCardId", "");
    console.log("The id card is: " + idCard);
    $("#deleteCardDef").click(function(event) {
      deleteCard(idCard);
    });
  });
}


function deleteCard(idCard) {
  console.log(idCard);
  $.ajax({
    url: "../backend/delete/deleteFitxaPersonal.php",
    data: {
      id: idCard
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
