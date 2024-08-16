'use strict';

function registrarEvento(pnombre, pfecha, phora_Incio, pminutos_Inicio, phora_Fin, pminutos_Fin, pcant_Espacios, pdescripcion, pmoneda, pprecio, pubicacion, pcategorias, petiqueta, ppatrocinadores, pimagen, plat, plng, pid_Usuario, lugar) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_evento',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json',
        async: false,
        data: {
            nombre: pnombre,
            fecha: pfecha,
            hora_Inicio: phora_Incio,
            minutos_Inicio: pminutos_Inicio,
            hora_Fin: phora_Fin,
            minutos_Fin: pminutos_Fin,
            cant_Espacios: pcant_Espacios,
            descripcion: pdescripcion,
            moneda: pmoneda,
            precio: pprecio,
            ubicacion: pubicacion,
            categorias: JSON.stringify(pcategorias),
            etiqueta: petiqueta,
            patrocinadores: JSON.stringify(ppatrocinadores),
            imagen: pimagen,
            latitud: plat,
            longitud: plng,
            id_Usuario: pid_Usuario,
            lugar
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

function obtenerEventos() {
    let listaEventos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_eventos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaEventos = response;
    });

    peticion.fail(function () {

    });

    return listaEventos;
};

function obtenerEvento(id) {
    let evento;
    let peticion = $.ajax({
        url: `http://localhost:4000/api/perfil_evento/${id}`,
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        evento = response;

    });

    peticion.fail(function () {

    });

    return evento;
}; 

function buscar_evento(pid_evento) {
    let evento = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_evento',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id: pid_evento
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {
            evento = response;

        },
        error: function error(_error) {
            console.log("petición falló por:" + _error);
        }
    });
    return evento;
};


function actualizarEvento(pid_evento,pnombre, pfecha, phora_Incio, pminutos_Inicio, phora_Fin, pminutos_Fin, pcant_Espacios, pdescripcion, pmoneda, pprecio, pubicacion, pcategorias, petiqueta, ppatrocinadores, pimagen, plat, plng) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_evento',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_evento,
            nombre: pnombre,
            fecha: pfecha,
            hora_Inicio: phora_Incio,
            minutos_Inicio: pminutos_Inicio,
            hora_Fin: phora_Fin,
            minutos_Fin: pminutos_Fin,
            cant_Espacios: pcant_Espacios,
            descripcion: pdescripcion,
            moneda: pmoneda,
            precio: pprecio,
            ubicacion: pubicacion,
            etiqueta: petiqueta,
            imagen: pimagen,
            latitud: plat,
            longitud: plng,
            categorias: JSON.stringify(pcategorias),
            patrocinadores: JSON.stringify(ppatrocinadores)
        },
    })
    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta;
};

function borrar_Evento(pid_evento) {
    $.ajax({
        url: 'http://localhost:4000/api/borrar_evento',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_evento,
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
    })
};

function deshabilitar_evento(pid_evento) {
    $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_evento',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_evento,
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    })
};

function habilitar_evento(pid_evento) {
    $.ajax({
        url: 'http://localhost:4000/api/habilitar_evento',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pid_evento,
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    })
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

function registrarCalificacionEvento(pidEvento, pvoto, pcomentario, pidUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/calificar_evento',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json',
        async: false,
        data: {
            idEvento: pidEvento,
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

function reservarEventoServicio(idEvento, idUsuario, correoUsuario, nombreEvento, nombreUsuario){
    let listaEventos = [];
    let peticion = $.ajax({
      url: 'http://localhost:4000/api/reservar_evento',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        idEvento,
        idUsuario,
        correoUsuario, 
        nombreEvento,
        nombreUsuario
      }
    });

    peticion.done(function(response){
      listaEventos = response;

    });

    peticion.fail(function(){

    });

    return listaEventos;
  };

  function eliminarReservaServicio(idEvento, idUsuario, correoUsuario, nombreEvento, nombreUsuario){
    let listaEventos = [];
    let peticion = $.ajax({
      url: 'http://localhost:4000/api/eliminar_reserva',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        idEvento,
        idUsuario, 
        correoUsuario,
        nombreEvento,
        nombreUsuario
      }
    });

    peticion.done(function(response){
      listaEventos = response;

    });

    peticion.fail(function(){

    });

    return listaEventos;
  };

  function cuposAcumuladosServicio(pevento, pcuposAcumulados){
    $.ajax({
        url: 'http://localhost:4000/api/cupos',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id: pevento,
            cuposAcumulados : pcuposAcumulados
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    })
  }

  function usuarioReservasServicio(idEvento, idUsuario){
    let listaEventos = [];
    let peticion = $.ajax({
      url: 'http://localhost:4000/api/reservas_usuarios',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        idEvento,
        idUsuario
      }
    });

    peticion.done(function(response){
      listaEventos = response;

    });

    peticion.fail(function(){

    });

    return listaEventos;
  };

  function usuarioEliminarReservasServicio(idEvento, idUsuario){
    let listaEventos = [];
    let peticion = $.ajax({
      url: 'http://localhost:4000/api/eliminar_reservas_usuarios',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        idEvento,
        idUsuario
      }
    });

    peticion.done(function(response){
      listaEventos = response;

    });

    peticion.fail(function(){

    });

    return listaEventos;
  };