'use strict';
function validarCredencialesOlvidar(pusuario, pcorreo_1, pcontrasenna) {
    let respuesta = false;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/olvidar_contrasena',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombreUsuario: pusuario,
            correo_1: pcorreo_1,
            contrasenna: pcontrasenna
        }
    });

    peticion.done(function (response) {
        respuesta = response;

        sessionStorage.setItem('correo_1', response.correo_1);
        sessionStorage.setItem('nombreUsuario', response.nombreUsuario);
        sessionStorage.setItem('_id', response._id);
    });

    peticion.fail(function () {
        // lo que pasa si no se realiza la respuesta
    });

    return respuesta;

};

