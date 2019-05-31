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
    showLanguages();
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

  $("#modFormFP2").click(function() {
    modCardListener();
    //añadir id
  });

  $('.addFp_validation').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
        },
        fields: {
          nom: {
              validators: {
                  notEmpty: {
                      message: "El camp nom no pot estar buit."
                  },
                  stringLength: {
                      min: 3,
                      message: "El nom te de ser de 3 caracters com a minim."
                  }
              }
          },
          cognom: {
            validators: {
                notEmpty: {
                    message: "El cognom no pot estar buit."
                },
                stringLength: {
                    min: 3,
                    message: "El cognom te de ser de 3 caracters com a minim."
                }
              }
          },
          dni: {
            validators: {
              notEmpty: {
                  message: "El dni no pot estar buit."
              },
              stringLength: {
                  min: 9,
                  message: "El dni te de ser de 9 caracters com a minim."
              }
            }
          }
        }
    });

  //kendo / jquery functions
  $(".opciones").checkboxradio();
  $(".datepicker").kendoDatePicker({
    format: "d/M/yyyy"
  });
  $(".phoneMask").kendoMaskedTextBox({
    mask: "000 000 000"
  });
  $("#addTipus_habitatge").kendoDropDownTree({
                placeholder: "Selecciona el tipus d'habitatge ...",
                height: "auto",
                dataSource: [
                    {
                        text: "Casa", items: [
                            { text: "Casa Duplex" },
                            { text: "Mansió" },
                            { text: "Xalet" }
                        ]
                    },
                    {
                        text: "Pis", items: [
                            { text: "Atic" },
                            { text: "Baix" }
                        ]
                    }
                ]
            });
  $("#addTipus").kendoDropDownList();
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
      $('#loaddiv').removeClass('hidden');
      $('#loader').hide();
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
      html2="";
      for (let i = 0; i < myJSON.length; i++) {
        html+='<option>(Id:'+myJSON[i].id+") "+myJSON[i].language_name+'</option>';
        html2+='<option>(Id:'+myJSON[i].id+") "+myJSON[i].language_name+'</option>';
      }
      html+="<option>Altre</option>";
      $("#addIdioma").html(html);
      $("#addifIdioma").html(html2);
      $("#addIdioma").kendoDropDownList();
      $("#addifIdioma").kendoDropDownList();
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



function modLanguages(){
  $.ajax({
    url: "../backend/selects/getLanguages.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      html="";
      html2="";
      for (let i = 0; i < myJSON.length; i++) {
        html+='<option>(Id:'+myJSON[i].id+") "+myJSON[i].language_name+'</option>';
        html2+='<option>(Id:'+myJSON[i].id+") "+myJSON[i].language_name+'</option>';
      }
      html+="<option>Altre</option>";
      $("#modIdioma").html(html);
      $("#modifIdioma").html(html2);
      $("#modIdioma").kendoDropDownList();
      $("#modifIdioma").kendoDropDownList();
      $("#modIdiomaAltre").hide();
    },
    error: function() {
      console.log('No hi han llenguatges');
    }
  });
}

function modaltreListener() {
    let e = document.getElementById("modIdioma");
    let text = e.options[e.selectedIndex].value;
    console.log(text);
    if (text=='Altre') {
      $("#modIdiomaAltre").show();
    }else{
      $("#modIdiomaAltre").hide();
      $("#modIdiomaAltre").val();
    }
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
    let dataNaixemement = $("#addDataNaixement").val();
    dataNaixemement = changeToSQLDate(dataNaixemement);
    let adreca = $("#addTipus").val()+' '+$("#addAdreca").val()+' '+$("#addPis").val()+' '+$("#addPorta").val()+' '+$("#addEscala").val()+ ' '+$("#addCP");

    let kendotipusHabitatge = $("#addTipus_habitatge").data("kendoDropDownTree");
    let tipusHabitatge = kendotipusHabitatge.value().text;
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
    let form = $("#addForm").val();
    let mutua = $("#addMutua").val();
    if ($("#addAdreca").val().length>0 && correctDate(dataNaixemement) && provincia != "" && isNaN(nom) && isNaN(cognom) && nom != "" && cognom != "" && dni != "" && genere != "" && dataNaixemement != "" && adreca != "" && tipusHabitatge != "" && !isNaN(provincia) && !isNaN(comarca) && !isNaN(municipi) && !isNaN(telFixe) && !isNaN(telMovil) && !isNaN(telTreball)) {
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
                          sWorkPhone: telTreball,
                          form: form,
                          mutua: mutua
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
              sWorkPhone: telTreball,
              form: form,
              mutua: mutua
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
      alert("Error: Falten dades i/o estan mal introduïdes");
    }
  });
}

function changeToSQLDate(date){
  let arrayDate = date.split("/");
  let newDate = arrayDate[2]+"-"+arrayDate[1]+"-"+arrayDate[0];
  return newDate;
}

function correctDate(UserDate) {
    UserDate = UserDate.split('-').join(',');
    var ToDate = new Date();
    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
          return true;
     }
    return false;
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
  //modComarcas();
  //modProvinces()
  //modMunisipalitys();
  modLanguages();
  $("#modGenere").kendoDropDownList();
  $("#modTipusHabitatge").kendoDropDownList();
  $('input:radio[name=modidioma][value=1]').click();
  $('input:radio[name=modidioma_s][value=1]').click();
  $('input:radio[name=modtitularitat][value=1]').click();
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
  $('input:radio[name=idioma_s][value=1]').click();
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
  $("#modpageFp").hide();
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
  let html = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + surname + "</td><td>" + dninie + "</td><td>" + province + "</td><td><button id='fitxaPersonal" + id + "' type='button' class='fitxaPersonal btn btn-info marginBtn'><i class='fa fa-file'></i> Fitxa Completa</button><button type='button' id='deleteCardId" + id + "' class='deletecard btn btn-danger marginBtn' data-toggle='modal' data-target='#deletecardmodal'><i class='fa fa-trash'></i> Eliminar</button></td></tr>";
  $("#fitxaPersonalTable").append(html);

  $(".fitxaPersonal").click(function() {
    mostrarCardListener($(this).attr('id'));
  });
}

function mostrarCardListener(id) {
    let idbtn = id;
    idbtn = idbtn.replace("fitxaPersonal", "");
    $.ajax({
      url: "../backend/selects/getFitxaPersonal.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        $("#fpname").html("");
        $("#fpsurname").html("");
        $("#fpdninie").html("");
        $("#fpgender").html("");
        $("#fpbirthdate").html("");
        $("#fpidioma").html("");
        $("#fpidioma_s").html("");
        $("#fpform").html("");
        $("#fpmutua").html("");
        $("#fpprovince").html("");
        $("#fpcomarca").html("");
        $("#fpmunicipality").html("");
        $("#fpaddress").html("");
        $("#fpphone").html("");
        $("#fpmobile_phone").html("");
        $("#fpwork_phone").html("");
        for (var i = 0; i < myJSON.length; i++) {
          if (idbtn == myJSON[i].id) {
            let name = myJSON[i].name;
            let surname = myJSON[i].surname;
            let dninie = myJSON[i].dninie;
            let gender = myJSON[i].gender;
            let birthdate = myJSON[i].birthdate;
            birthdate = birthdate.replace(/-/g, "/");
            let provinceGet = myJSON[i].province;
            let comarcaGet = myJSON[i].comarca;
            let municipalityGet = myJSON[i].municipality;
            let address = myJSON[i].address;
            let type_house = myJSON[i].type_house;
            let ownership = myJSON[i].ownership;
            let phone = myJSON[i].phone;
            if (phone!="") {
              let phone_arr = phone.split("");
              phone = phone_arr[0]+phone_arr[1]+phone_arr[2]+" "+phone_arr[3]+phone_arr[4]+phone_arr[5]+" "+phone_arr[6]+phone_arr[7]+phone_arr[8];
            }
            let mobile_phone = myJSON[i].mobile_phone;
            if (mobile_phone!="") {
              let mobile_phone_arr = mobile_phone.split("");
              mobile_phone = mobile_phone_arr[0]+mobile_phone_arr[1]+mobile_phone_arr[2]+" "+mobile_phone_arr[3]+mobile_phone_arr[4]+mobile_phone_arr[5]+" "+mobile_phone_arr[6]+mobile_phone_arr[7]+mobile_phone_arr[8];
            }
            let work_phone = myJSON[i].work_phone;
            if (work_phone!="") {
              let work_phone_arr = work_phone.split("");
              work_phone = work_phone_arr[0]+work_phone_arr[1]+work_phone_arr[2]+" "+work_phone_arr[3]+work_phone_arr[4]+work_phone_arr[5]+" "+work_phone_arr[6]+work_phone_arr[7]+work_phone_arr[8];
            }

            let language_name = myJSON[i].language;
            let sign_language = myJSON[i].sign_language;
            let form = myJSON[i].form;
            let mutua = myJSON[i].mutua;
            //Amagar camps invisibles
            if (sign_language!== undefined) {
              $("#dividioma_s").show();
            }else{
              $("#dividioma_s").hide();
            }
            if (form!="") {
              $("#divform").show();
            }else{
              $("#divform").hide();
            }
            if (mutua!== undefined) {
              $("#divmutua").show();
            }else{
              $("#divmutua").hide();
            }
            if (comarcaGet!== undefined) {
              $("#divcomarca").show();
            }else{
              $("#divcomarca").hide();
            }
            if (municipalityGet!== undefined) {
              $("#divmunicipi").show();
            }else{
              $("#divmunicipi").hide();
            }
            if (phone!="") {
              $("#divphone").show();
            }else{
              $("#divphone").hide();
            }
            if (mobile_phone!="") {
              $("#divmobile_phone").show();
            }else{
              $("#divmobile_phone").hide();
            }
            if (work_phone!="") {
              $("#divwork_phone").show();
            }else{
              $("#divwork_phone").hide();
            }

            $("#modId").val(idbtn);
            $("#modNom").val(name);
            $("#modCognom").val(surname);
            $("#moddninie").val(dninie);
            $("#modGenere").val(gender);
            //modificar date a altre format 2019/05/20
            let arrbirthdate = birthdate.split("/");
            birthdate = arrbirthdate[2]+"/"+arrbirthdate[1]+"/"+arrbirthdate[0];
            $("#modDataNaixement").val(birthdate);
            //Mostrar comarques
            $.ajax({
              url: "../backend/selects/getComarcas.php",
              type: "GET",
              cache: false,
              success: function(response) {
                let myJSON = JSON.parse(response);
                let comarcas = [];
                let comarcaSel;
                for (var i = 0; i < myJSON.length; i++) {
                  let comarca = myJSON[i].comar_name;
                  let id = myJSON[i].id;
                  comarcas.push("(Id:" + id + ") " + comarca);
                  if (comarcaGet == comarca) {
                    comarcaSel = "(Id:" + id + ") " + comarca;
                  }

                }
                $("#modcomarcas").kendoAutoComplete({
                  filter: "contains",
                  dataSource: comarcas,
                  placeholder: "Selecciona una comarca...",
                });
                $("#modcomarcas").data("kendoAutoComplete").value(comarcaSel);
              },
              error: function() {
                console.log('No hi han comarques');
              }
            });
            //Mostrar municipis
            $.ajax({
              url: "../backend/selects/getMunisipalitys.php",
              type: "GET",
              cache: false,
              success: function(response) {
                let myJSON = JSON.parse(response);
                let munisipalitys = [];
                let munisipalitySel;

                for (var i = 0; i < myJSON.length; i++) {
                  let munisipality = myJSON[i].muni_name;
                  let id = myJSON[i].id;

                  munisipalitys.push("(Id:" + id + ") " + munisipality);
                  if (municipalityGet == myJSON[i].muni_name) {

                    munisipalitySel = "(Id:" + id + ") " + munisipality;
                    console.log(munisipalitySel);
                  }
                }
                console.log(munisipalitySel);
                $("#modmunicipios").kendoAutoComplete({
                  filter: "contains",
                  dataSource: munisipalitys,
                  placeholder: "Selecciona un municipi...",
                });
                if (munisipalitySel!==undefined) {
                    $("#modmunicipios").data("kendoAutoComplete").value(munisipalitySel);
                }

              },
              error: function() {
                console.log('No hi han municipis');
              }
            });
            //Mostrar provincies
            $.ajax({
              url: "../backend/selects/getProvinces.php",
              type: "GET",
              cache: false,
              success: function(response) {
                let myJSON = JSON.parse(response);
                let provincias = [];
                let provinciasSel;
                for (var i = 0; i < myJSON.length; i++) {
                  let province = myJSON[i].prov_name;
                  let id = myJSON[i].id;
                  provincias.push("(Id:" + id + ") " + province);
                  if (provinceGet = province) {
                    provinciasSel = "(Id:" + id + ") " + province;
                  }
                }
                $("#modprovincias").kendoAutoComplete({
                  filter: "contains",
                  dataSource: provincias,
                  placeholder: "Selecciona una provincia...",
                });
                if (provinciasSel!==undefined) {
                    $("#modprovincias").data("kendoAutoComplete").value(provinciasSel);
                }
              },
              error: function() {
                console.log('No hi han provincies');
              }
            });
            $("#modAdreca").val(address);
            $("#modtype_house").val(type_house);
            $("#modownership").val(ownership);
            $("#modTel_fijo").val(phone);
            $("#modMovil").val(mobile_phone);
            $("#modForm").val(form);
            $("#modMutua").val(mutua);
            $("#modTelTreball").val(work_phone);
            $("#fpname").html(name);
            $("#fpsurname").html(surname);
            $("#fpdninie").html(dninie);
            //form
            $("#fpform").html('<a href="'+form+'">Accés al formulari</a>');
            $("#fpgender").html(gender);
            $("#fpmutua").html(mutua);
            $("#fpbirthdate").html(birthdate);
            $("#fpidioma").html(language_name);
            $("#fpidioma_s").html(sign_language);
            $("#fpprovince").html(provinceGet);
            $("#fpcomarca").html(comarcaGet);
            $("#fpmunicipality").html(municipalityGet);
            $("#fpaddress").html(address);
            $("#fptype_house").val(type_house);
            $("#fpownership").val(ownership);
            $("#fpphone").html(phone);
            $("#fpmobile_phone").html(mobile_phone);
            $("#fpwork_phone").html(work_phone);
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
          }
        }
      },
      error: function() {
        console.log('No hi han clients');
      }
    });
}

function modCardListener() {
  let id = $("#modId").val();
  let nom = $("#modNom").val();
  nom = uppercase(nom);
  let cognom = $("#modCognom").val();
  cognom = uppercase(cognom);
  let genere = $("#modGenere").val();
  let idioma = $("#modIdioma").val();
  idioma = idioma.split('(Id:').pop().split(')')[0];
  let nouIdioma = $("#modIdiomaAltre").val();
  let idioma_s = document.querySelector('input[name="modidioma_s"]:checked').value;
  let dataNaixemement = $("#modDataNaixement").val();
  dataNaixemement = changeToSQLDate(dataNaixemement);
  let adreca = $("#modAdreca").val();
  let tipusHabitatge = $("#modTipusHabitatge").val();
  let titularitatHab = document.querySelector('input[name="modtitularitat"]:checked').value;
  let provincia = $("#modprovincias").val();
  provincia = provincia.split('(Id:').pop().split(')')[0];
  let comarca = $("#modcomarcas").val();
  comarca = comarca.split('(Id:').pop().split(')')[0];
  let municipi = $("#modmunicipios").val();
  municipi = municipi.split('(Id:').pop().split(')')[0];
  let telFixe = $("#modTel_fijo").val();
  telFixe = telFixe.replace(/\s/g, '');
  let telMovil = $("#modMovil").val();
  telMovil = telMovil.replace(/\s/g, '');
  let telTreball = $("#modTelTreball").val();
  telTreball = telTreball.replace(/\s/g, '');
  let form = $("#modForm").val();
  let mutua = $("#modMutua").val();
  if (nom != "" && cognom != "" && dataNaixemement != "" && provincia != "" && correctDate(dataNaixemement)) {
    $.ajax({
      url: "../backend/updates/fichaPersonal.php",
      data:{
        id: id,
        sName: nom,
        sSurname: cognom,
        sGender: genere,
        iLanguage: idioma,
        iSignLanguage: idioma_s,
        sBirthDate: dataNaixemement,
        iProvince: provincia,
        iComarca: comarca,
        iMunicipality:municipi,
        sAddress: adreca,
        sTypeHouse: tipusHabitatge,
        iOwnership: titularitatHab,
        sPhone: telFixe,
        sMobilePhone: telMovil,
        sWorkPhone: telTreball,
        form: form,
        mutua: mutua
      },
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        mostrarCardListener($("#modId").val());
        goToFp();
      },
      error: function() {
        console.log('Error al actualitzar les dades');
      }
    });
  }else{
    alert("Hi ha camps sense informació.");
  }

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
