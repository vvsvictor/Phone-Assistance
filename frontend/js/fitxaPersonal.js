$(document).ready(function() {
  $('.dataTables_length').addClass('bs-select');
  goToFpList();
  $("#showFormPF").click(function() {
    //neteja inputs
    cleanInputs();
    goToAddFp();

  });
  $("#modFormPF").click(function() {
    goToModFP();
  });
  $("#returnPF").click(function() {
    goToFpList();
  });
  $("#returnPF2").click(function() {
    goToFpList();
  });
  $("#returnPF3").click(function() {
    goToFp();
  });

  //kendo / jquery functions
  $(".opciones").checkboxradio();
  $(".datepicker").kendoDatePicker({
    format: "d/M/yyyy"
  });
  $(".phoneMask").kendoMaskedTextBox({
    mask: "000 000 000"
  });
  $("#addTipus_habitatge").kendoDropDownList();



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
      $("#divComarcas").hide();
      $("#divMunicipios").hide();
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

function showLanguages(){
  $.ajax({
    url: "../backend/selects/getLanguages.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      html="";
      for (let i = 0; i < myJSON.length; i++) {
        html+='<option>(Id:'+myJSON[i].id+") "+myJSON[i].language_name+'</option>';
      }
      html+="<option>Altre</option>";
      $("#addIdioma").html(html);
      $("#addIdioma").kendoDropDownList();
      $("#addGenere").kendoDropDownList();
      $("#addIdiomaAltre").hide();
    },
    error: function() {
      console.log('No hi han llenguatges');
    }
  });
}

function altreListener() {
  let e = document.getElementById("addIdioma");
  let text = e.options[e.selectedIndex].value;
  console.log(text);
  if (text=='Altre') {
    $("#addIdiomaAltre").show();
  }else{
    $("#addIdiomaAltre").hide();
  }
}

function provinciasListener(){
  if ($(provincias).val().includes("Barcelona")) {
    $("#divComarcas").show();
    $("#divMunicipios").show();
  }else{
    $("#divComarcas").hide();
    $("#divMunicipios").hide();
  }
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
    nom = uppercase(nom)
    let cognom = $("#addCognom").val();
    cognom = uppercase(cognom)
    let dni = $("#addDni").val();
    let genere = $("#addGenere").val();
    let idioma = $("#addIdioma").val();
    idioma = idioma.split('(Id:').pop().split(')')[0];
    let nouIdioma = $("#addIdiomaAltre").val();
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
    telFixe = telFixe.replace(/\s/g, '');
    let telMovil = $("#addMovil").val();
    telMovil = telMovil.replace(/\s/g, '');
    let telTreball = $("#addTelTreball").val();
    telTreball = telTreball.replace(/\s/g, '');
    if (isNaN(nom) && isNaN(cognom) && nom != "" && cognom != "" && dni != "" && genere != "" && dataNaixemement != "" && adreca != "" && tipusHabitatge != "" && !isNaN(provincia) && !isNaN(comarca) && !isNaN(municipi) && !isNaN(telFixe) && !isNaN(telMovil) && !isNaN(telTreball)) {
        if (idioma=="Altre") {
          //insertar nou idioma
          $.ajax({
            url: "../backend/inserts/insertIdioma.php",
            data: {
              sName: nouIdioma
            },
            type: "GET",
            cache: false,
            success: function(response) {
              let myJSON = JSON.parse(response);
              $.ajax({
                url: "../backend/selects/getLanguages.php",
                type: "GET",
                cache: false,
                success: function(response) {
                  let myJSON = JSON.parse(response);
                  for (let i = 0; i < myJSON.length; i++) {
                    if (myJSON[i].language_name ==nouIdioma) {
                      idioma = myJSON[i].id;
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
                    }
                  }
                },
                error: function() {
                  console.log('No hi ha responsable');
                }
              });
              if (parseInt(myJSON.codigoError) != 0) {
                console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
              }
            },

          });
        }else{
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
        }
    } else {
      //Funcion de eror al añadir fitxa personal
      alert("Error: Dades mal introduïdes")
    }
  });
}

function uppercase(str){
  var array1 = str.split(' ');
  var newarray1 = [];

  for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newarray1.join(' ');
}

function goToModFP() {
  $("#pageFp").hide();
  $("#modpageFp").show();
  $("#tableFitxaPersonal").hide();
  $("#addFp").hide();
}

function goToFpList() {
  showTable();
  $("#pageFp").hide();
  $("#tableFitxaPersonal").show();
  $("#addFp").hide();
  $("#modpageFp").hide();
}

function goToAddFp() {
  showComarcas();
  showProvinces();
  showMunisipalitys();
  showLanguages();
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
  $("#fpmutua").html('');
  $("#addIdiomaAltre").val('');
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
    let idbtn = this.id;
    idbtn = idbtn.replace("fitxaPersonal", "");
    console.log("ID "+idbtn);
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        console.log(response);
        $("#fpname").html("");
        $("#fpsurname").html("");
        $("#fpdninie").html("");
        $("#fpgender").html("");
        $("#fpbirthdate").html("");
        $("#fpidioma").html("");
        $("#fpidioma_s").html("");
        $("#fpprovince").html("");
        $("#fpcomarca").html("");
        $("#fpmunicipality").html("");
        $("#fpaddress").html("");
        $("#fpphone").html("");
        $("#fpmobile_phone").html("");
        $("#fpwork_phone").html("");
        for (var i = 0; i < myJSON.length; i++) {
          if (idbtn == myJSON[i].id) {
            let id = myJSON[i].id;
            let name = myJSON[i].name;
            let surname = myJSON[i].surname;
            let dninie = myJSON[i].dninie;
            let gender = myJSON[i].gender;
            let birthdate = myJSON[i].birthdate;
            birthdate = birthdate.replace("-", "/");
            let province = myJSON[i].province;
            let comarca = myJSON[i].comarca;
            let municipality = myJSON[i].municipality;
            let address = myJSON[i].address;
            let phone = myJSON[i].phone;
            let mobile_phone = myJSON[i].mobile_phone;
            let mobile_phone_arr = mobile_phone.split("");
            mobile_phone = mobile_phone_arr[0]+mobile_phone_arr[1]+mobile_phone_arr[2]+" "+mobile_phone_arr[3]+mobile_phone_arr[4]+mobile_phone_arr[5]+" "+mobile_phone_arr[6]+mobile_phone_arr[7]+mobile_phone_arr[8];
            let work_phone = myJSON[i].work_phone;
            let language_name = myJSON[i].language;
            let signlanguage_name = myJSON[i].sign_language;
            $("#modNom").val(name);
            $("#modCognom").val(surname);
            $("#modgenere").val(gender);
            $("#modDataNaixement").val(birthdate);
            modProvincias
            modComarcas
            modMunicipios
            modAdreca
            $("#modTel_fijo").val();



            $("#fpname").html(name);
            $("#fpsurname").html(surname);
            $("#fpdninie").html(dninie);
            $("#fpgender").html(gender);
            $("#fpbirthdate").html(birthdate);
            $("#fpidioma").html(language_name);
            $("#fpidioma_s").html(signlanguage_name);
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
            $.ajax({
              url: "../backend/selects/getHealthInsurance.php",
              type: "GET",
              cache: false,
              success: function(response) {
                let myJSON = JSON.parse(response);
                for (let i = 0; i < myJSON.length; i++) {
                  if (myJSON[i].user_dninif==dninie) {
                    $("#fpmutua").html(myJSON[i].insurance_name);
                  }
                }
              },
              error: function() {
                console.log('No hi ha responsable');
              }
            });
            $.ajax({
              url: "../backend/selects/getSta.php",
              type: "GET",
              cache: false,
              success: function(response) {
                let myJSON = JSON.parse(response);
                for (let i = 0; i < myJSON.length; i++) {
                  if (myJSON[i].user_dninif==dninie) {
                    if (myJSON[i].tf_service==1) {
                      $("#tf_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#tf_service").kendoSwitch({
                        checked: false
                      });
                    }


                    if (myJSON[i].tcr_service==1) {
                      $("#tcr_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#tcr_service").kendoSwitch({
                        checked: false
                      });
                    }


                    if (myJSON[i].cc_service==1) {
                      $("#cc_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#cc_service").kendoSwitch({
                        checked: false
                      });
                    }


                    if (myJSON[i].tm_service==1) {
                      $("#tm_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#tm_service").kendoSwitch({
                        checked: false
                      });
                    }


                    if (myJSON[i].tam_service==1) {
                      $("#tam_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#tam_service").kendoSwitch({
                        checked: false
                      });
                    }


                    if (myJSON[i].gps_service==1) {
                      $("#gps_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#gps_service").kendoSwitch({
                        checked: false
                      });
                    }

                    if (myJSON[i].umt_service==1) {
                      $("#umt_service").kendoSwitch({
                        checked: true
                      });
                    }else{
                      $("#umt_service").kendoSwitch({
                        checked: false
                      });
                    }
                  }
                }
              },
              error: function() {
                console.log('No hi ha responsable');
              }
            });
          }
        }
      },
      error: function() {
        console.log('No hi han clients');
      }
    });

  });
}

function modCardListener() {
  //Falta enlazarlo al boton modificar
  $(".modFormPF").click(function() {
    let idUser = this.id;
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        for (let i = 0; i < myJSON.length; i++) {
          if ($('#fpdninie').val() == myJSON[i].dninie) {
            let id = myJSON[i].id;
            let name = myJSON[i].name;
            let surname = myJSON[i].surname;
            let dninie = myJSON[i].dninie;
            let gender = myJSON[i].gender;
            let birthdate = myJSON[i].birthdate;
            let province = myJSON[i].province;
            let comarca = myJSON[i].comarca;
            let municipality = myJSON[i].municipality;
            let address = myJSON[i].address;
            let phone = myJSON[i].phone;
            let mobile_phone = myJSON[i].mobile_phone;
            let work_phone = myJSON[i].work_phone;
            let language_name = myJSON[i].language;
            let signlanguage_name = myJSON[i].sign_language;
            $("#modname").html(name);
            $("#modsurname").html(surname);
            $("#modgenere").html(gender);
            //$("#modbirthdate").html(birthdate);
            //$("#modidioma").html(language_name);
            //$("#modidioma_s").html(signlanguage_name);
            $("#modprovince").html(province);
            $("#modcomarca").html(comarca);
            $("#modmunicipality").html(municipality);
            $("#modaddress").html(address);
            $("#modphone").html(phone);
            $("#modmobile_phone").html(mobile_phone);
            $("#modwork_phone").html(mobile_phone);
            goToModFP()
          }
            /*//Botó tornar enrrere no echo.
            $("#showListBtnMod").click(function() {
              goToUsersList();
            });
            */
            //Click al botó modificar usuari
            $("#modUserBtn").click(function() {
              $.ajax({
                url: "../backend/updates/fitxaPersonal.php",
                data: {
                  id: id,
                  sName: $('#modNom').val(),
                  sSurname: $('#modCognom').val(),
                  sGender: $('#modgenere').val(),
                  //iLanguage: $('#modUsername').val(),
                  //iSignLanguage: $('#modUsername').val(),
                  sBirthDate: $('#modDataNaixement').val(),
                  iProvince: $('#modUsername').val(),
                  iComarca: $('#modUsername').val(),
                  iMunicipality: $('#modUsername').val(),
                  sAddress: $('#modAdreca').val(),
                  //sTypeHouse $('#modUsername').val(),
                  //iOwnership $('#modUsername').val(),
                  sPhone: $('#modTel_fijo').val(),
                  sMobilePhone: $('#modMovil').val(),
                  sWorkPhone: $('#addTelTreball').val()
                },
                type: "GET",
                cache: false,
                success: function(response) {
                  let myJSON = JSON.parse(response);
                  //reload users
                  showTable();
                  goToUsersList();
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
