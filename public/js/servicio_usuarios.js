'use strict';

function registrarUsuario(ptipoUsuario, pnombreUsuario, pidentificacion, pnombreCompleto, pempresa, pcorreo_1, pcorreo_2, pfechaNacimiento, pedad, psexo, pdireccion, ptelefono, pcontrasenna, pimagen, pidJuridica, pprimerInicio) {
  let respuesta = '';
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/registro_usuarios',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
      tipoUsuario: ptipoUsuario,
      nombreUsuario: pnombreUsuario,
      identificacion: pidentificacion,
      nombreCompleto: pnombreCompleto,
      empresa: pempresa,
      correo_1: pcorreo_1,
      correo_2: pcorreo_2,
      fechaNacimiento: pfechaNacimiento,
      edad: pedad,
      sexo: psexo,
      direccion: pdireccion,
      telefono: ptelefono,
      contrasenna: pcontrasenna,
      imagen: pimagen,
      idJuridica : pidJuridica,
      primerInicio : pprimerInicio
    }
  });

  peticion.done(function (response) {
    respuesta = response;
  });

  peticion.fail(function (response) {
    respuesta = response;
  });

  return respuesta;
};

function obtenerUsuarios() {
  let listaUsuarios = [];
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/visualizar_usuarios',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  peticion.done(function (response) {
    listaUsuarios = response;
  });

  peticion.fail(function () {

  });

  return listaUsuarios;
};

function buscar_usuarios(pid_usuario, home){
  let usuario = [];
  $.ajax({
      url: 'http://localhost:4000/api/buscar_usuarios',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
        id : pid_usuario,
        home: home || false
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          usuario = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return usuario;
};

function deshabilitar_usuario(pid_usuario) {
  $.ajax({
    url: 'http://localhost:4000/api/deshabilitar_usuario',
    method: 'POST',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    data: {
      id: pid_usuario
    },
    beforeSend: function beforeSend() {

    },
    success: function success(response) {

    },
    error: function error(_error) {
      console.log("Request fail error:" + _error);
    }
  });
};

function habilitar_usuario(pid_usuario) {
  $.ajax({
    url: 'http://localhost:4000/api/habilitar_usuario',
    method: 'POST',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    data: {
      id: pid_usuario
    },
    beforeSend: function beforeSend() {

    },
    success: function success(response) {

    },
    error: function error(_error) {
      console.log("Request fail error:" + _error);
    }
  });
};

function modificarUsuarios(pid_usuario, pidentificacion,pnombreCompleto, pcorreo_1,pcorreo_2,pfechaNacimiento,pedad,pdireccion,ptelefono, pImagen){
  $.ajax({
      url: 'http://localhost:4000/api/modificar_perfil',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      data: {
          id : pid_usuario,
          identificacion : pidentificacion,
          nombreCompleto : pnombreCompleto,
          correo_1 : pcorreo_1,
          correo_2 : pcorreo_2,
          fechaNacimiento : pfechaNacimiento,
          edad : pedad,
          direccion : pdireccion,
          telefono : ptelefono,
          imagen : pImagen

      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          //listaEditoriales = response;
          //return listaEditoriales;
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
  });
}
function modificarContrasena(pid_usuario, pcontrasenna,pprimerInicio){
  $.ajax({
      url: 'http://localhost:4000/api/modificar_contrasena',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      data: {
          id : pid_usuario,
          contrasenna : pcontrasenna,
          primerInicio : pprimerInicio

      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          //listaEditoriales = response;
          //return listaEditoriales;
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
  });
}
function expulsar_usuario(pid_usuario, pexpulsado) {
  $.ajax({
    url: 'http://localhost:4000/api/expulsar_usuario',
    method: 'POST',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    data: {
      id: pid_usuario,
      expulsado: pexpulsado
    },
    beforeSend: function beforeSend() {

    },
    success: function success(response) {

    },
    error: function error(_error) {
      console.log("Request fail error:" + _error);
    }
  });
};
function borrar_usuario(pid_usuario) {
  $.ajax({
    url: 'http://localhost:4000/api/borrar_usuario',
    method: 'POST',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    data: {
      id: pid_usuario
    },
    beforeSend: function beforeSend() {

    },
    success: function success(response) {

    },
    error: function error(_error) {
      console.log("Request fail error:" + _error);
    }
  });
};