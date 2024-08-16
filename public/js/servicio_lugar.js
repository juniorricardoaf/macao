'use strict'

function registrarLugar(pnombre, pdescripcion, pcategoria, pdireccion, pprovincia, pcanton, pdistrito, petiquetas, pfacebook, pinstagram, ptwitter, pimagen, plat, plng, pid_Usuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_lugar',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: pnombre,
            descripcion: pdescripcion,
            categorias: JSON.stringify(pcategoria),
            direccion: pdireccion,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            etiquetas: petiquetas,
            facebook: pfacebook,
            instagram: pinstagram,
            twitter: ptwitter,
            imagen: pimagen,
            latitud: plat,
            longitud: plng,
            id_usuario: pid_Usuario
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





function obtener_provincias() {
    let provincias = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/provinces',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false
    });

    peticion.done(function (response) {
        provincias = response;
    });

    peticion.fail(function (response) {
        provincias = response;
    });

    return provincias;
};

function obtener_cantones() {
    let cantones = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/cantons',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false
    });

    peticion.done(function (response) {
        cantones = response;
    });

    peticion.fail(function (response) {
        cantones = response;
    });

    return cantones;
};

function obtener_distritos() {
    let distritos = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/districts',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false
    });

    peticion.done(function (response) {
        distritos = response;
    });

    peticion.fail(function (response) {
        distritos = response;
    });

    return distritos;
};




function obtenerLugares() {
    let listaLugares = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/visualizar_lugar',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaLugares = response;
    });

    peticion.fail(function () {

    });

    return listaLugares;
};

function borrar_lugar(pid_lugar) {
    $.ajax({
        url: 'http://localhost:4000/api/borrar_lugar',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_lugar
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


function deshabilitar_lugar(pid_lugar) {
    $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_lugar',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_lugar
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

function habilitar_lugar(pid_lugar) {
    $.ajax({
        url: 'http://localhost:4000/api/habilitar_lugar',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_lugar
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

function buscar_usuarios(pid_usuario) {
    let usuario = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_usuarios',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id: pid_usuario,
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

function buscar_lugar(pid_lugar) {
    let lugar = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_lugar',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id: pid_lugar
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {
            lugar = response;

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
    return lugar;
};

function seguirLugarServicio(idLugar, idUsuario, loSigo, callback) {
    const path = loSigo && 'dejar_seguir_lugar' || 'seguir_lugar';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/' + path,
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        data: {
            idLugar,
            idUsuario
        }
    }).done(res => {
        callback(!loSigo);
    });
};

function aprobar_lugar(pid_lugar, paprobado) {
    $.ajax({
        url: 'http://localhost:4000/api/aprobar_lugar',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_lugar,
            aprobado: paprobado
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

function registrarCalificacionLugar(pidLugar, pvoto, pcomentario, pidUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/calificar_lugar',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json',
        async: false,
        data: {
            idLugar: pidLugar,
            voto: pvoto,
            comentario: pcomentario,
            idUsuario: pidUsuario,
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