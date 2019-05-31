$(document).ready(function() {
  goToUsersList();
  $('.dataTables_length').addClass('bs-select');
  showTable();
  addUserListener();
  $('.contact_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
        },
        fields: {
          username: {
              validators: {
                  notEmpty: {
                      message: "El camp d'usuari no pot estar buit."
                  },
                  stringLength: {
                      min: 3,
                      max: 30,
                      message: "El nom d'usuari te que ser entre 3 y 30 caracters de longitud."
                  },
                  regexp: {
                      regexp: /^[a-zA-Z0-9_]+$/,
                      message: "El nom d'usuari només pot consistir en número alfabètic i subratllat"
                  }
              }
          },
            password: {
                validators: {
                    notEmpty: {
                        message: "La contrasenya no pot estar buida."
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: "La contrasenya te que ser entre 6 y 30 caracters de longitud."
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: "La contrasenya només pot consistir en número alfabètic i subratllat"
                    }
                }
            }
        }
    });
    $('.mod_form').bootstrapValidator({
          feedbackIcons: {
              valid: 'glyphicon glyphicon-ok',
              invalid: 'glyphicon glyphicon-remove',
          },
          fields: {
            modusername: {
                validators: {
                    notEmpty: {
                        message: "El camp d'usuari no pot estar buit."
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: "El nom d'usuari te que ser entre 3 y 30 caracters de longitud."
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: "El nom d'usuari només pot consistir en número alfabètic i subratllat"
                    }
                }
            },
              modpassword: {
                  validators: {
                      notEmpty: {
                          message: "La contrasenya no pot estar buida."
                      },
                      stringLength: {
                          min: 6,
                          max: 30,
                          message: "La contrasenya te que ser entre 6 y 30 caracters de longitud."
                      },
                      regexp: {
                          regexp: /^[a-zA-Z0-9_]+$/,
                          message: "La contrasenya només pot consistir en número alfabètic i subratllat"
                      }
                  }
              }
          }
      });
});

function gotoModUser() {
  $('#modUserDiv').show();
  $('#addUser').hide();
  $("#usersList").hide();
}

function addUserListener() {
  $("#showFormBtn").click(function() {
    $("#username").val('')
    $("#password").val('');
    $("input[name=usertype][value=1]").attr('checked', false);
    $("input[name=usertype][value=0]").attr('checked', 'checked');
    $("#usersList").hide();
    $('#addUser').show();
    $("#showListBtn").click(function() {
      goToUsersList();
    });
  });

  $("#addUserBtn").click(function() {
    let username =$("#username").val();
    let password = $("#password").val()
    if (username!="" && password.length>=6) {
      $.ajax({
        url: "../backend/inserts/insertUsuari.php",
        data: {
          sUsername: $("#username").val(),
          sPassword: $("#password").val(),
          iUserType: $('input[name=usertype]:checked', '#formUser').val()
        },
        type: "GET",
        cache: false,
        success: function(response) {
          let myJSON = JSON.parse(response);
          showTable();
          $('#addUser').hide();
          $("#usersList").show();

          if (parseInt(myJSON.codigoError) != 0) {
            console.log(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
          }
        },
        error: function() {
          alert("Error en la consulta");
        }
      });
    }else{
      //Control de validació
      alert("Hi han camps incorrectes o la contrasenya és menor a 6 caracters")
    }

  });
}

function goToUsersList(){
  $('#modUserDiv').hide();
  $('#addUser').hide();
  $("#usersList").show();
}

function modUserListener() {
  $(".moduser").click(function() {
    let idUser = this.id;
    $.ajax({
      url: "../backend/selects/getUsers.php",
      type: "GET",
      cache: false,
      success: function(response) {
        let myJSON = JSON.parse(response);
        for (let i = 0; i < myJSON.length; i++) {
          let id = myJSON[i].id;
          let username = myJSON[i].username;
          let password = myJSON[i].password;
          let usertype = myJSON[i].usertype;
          if ("modUserId" + id == idUser) {
            $("#modId").val(id);
            $("#modUsername").val(username);
            $("#modPassword").val(password);
            //Radio segons valor
            if (usertype == 0) {
              $("input[name=modUsertype][value=1]").attr('checked', false);
              $("input[name=modUsertype][value=0]").attr('checked', 'checked');
            } else {
              $("input[name=modUsertype][value=0]").attr('checked', false);
              $("input[name=modUsertype][value=1]").attr('checked', 'checked');
            }
            gotoModUser();
            //Botó tornar enrrere
            $("#showListBtnMod").click(function() {
              goToUsersList();
            });
            //Click al botó modificar usuari
            $("#modUserBtn").click(function() {
              let id = $('#modId').val();
              let username =$('#modUsername').val();
              let password = $('#modPassword').val();
              let usertype = $('input[name=modUsertype]:checked', '#formModUser').val();
              if (username!="" && password.length>=6 ) {
                $.ajax({
                  url: "../backend/updates/users.php",
                  data: {
                    id: id,
                    sUsername: username,
                    sPassword: password,
                    iUserType: usertype
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
              }else{
                alert("Hi han camps vuits o la longitud de la contrasenya és més petita de 6")
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

function showTable() {
  $.ajax({
    url: "../backend/selects/getUsers.php",
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      $("#usuarisTable").html("");
      for (let i = 0; i < myJSON.length; i++) {
        let id = myJSON[i].id;
        let username = myJSON[i].username;
        let usertype = myJSON[i].usertype;
        showUser(id, username, usertype);
      }
      $('#dtUsuaris').DataTable();
      modUserListener();
      eliminarUsuariListener();
      $('#loaddiv').removeClass('hidden');
      $('#loader').hide();
    },
    error: function() {
      console.log('No hi han clients');
    }
  });

}

function showUser(id, username, usertype) {
  let html;
  if (usertype != 0) {
    html = "<tr><td>" + id + "</td><td>" + username + "</td><td>Alumne</td><td><button type='button' id='deleteUserId" + id + "' class='deleteuser btn btn-danger marginBtn' data-toggle='modal' data-target='#deleteproductmodal'><i class='fa fa-trash'></i> Eliminar</button><button type='button' id='modUserId" + id + "' class='btn btn-primary moduser marginBtn'>Modificar</button></td></tr>";
  } else {
    html = "<tr><td>" + id + "</td><td>" + username + "</td><td>Professor</td><td><button type='button' class='btn btn-danger marginBtn' disabled><i class='fa fa-trash'></i> Eliminar</button><button type='button' id='modUserId" + id + "' class='btn btn-primary moduser marginBtn'>Modificar</button></td></tr>";
  }

  $("#usuarisTable").append(html);
}

function eliminarUsuariListener() {
  let idUser;
  $(".deleteuser").click(function(event) {
    idUser = this.id;
    idUser = idUser.replace("deleteUserId", "");
    $("#deleteUserDef").click(function(event) {
      deleteUser(idUser);
    });
  });
}

function deleteUser(idUser) {
  $.ajax({
    url: "../backend/delete/deleteUsers.php",
    data: {
      id: idUser
    },
    type: "GET",
    cache: false,
    success: function(response) {
      let myJSON = JSON.parse(response);
      if (parseInt(myJSON.codigoError) != 0) {
        showTable();
      }
    },
    error: function() {
      alert("Error en la consulta");
    }
  });
}
