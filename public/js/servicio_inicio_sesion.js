'use strict';
function validarCredenciales(pusuario, pcontrasenna) {
    let respuesta = false;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/inicio_sesion',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombreUsuario: pusuario,
            contrasenna: pcontrasenna
        }
    });

    peticion.done(function (response) {
        respuesta = response;
        sessionStorage.setItem('conectado', response.success);
        sessionStorage.setItem('tipoUsuario', response.tipoUsuario);
        sessionStorage.setItem('nombreUsuario', response.nombreUsuario);
        sessionStorage.setItem('_id', response._id);
    });

    peticion.fail(function () {
        // lo que pasa si no se realiza la respuesta
    });

    return respuesta;

};