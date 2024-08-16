'use strict'

function registrar_patrocinadores(pnombrePatrocinador, ptipoIndustria, pimagen) {
       let respuesta='';
       let peticion=$.ajax({
        url: 'http://localhost:4000/api/registrar_patrocinadores',
        method: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async:false,
        data: {
            nombre : pnombrePatrocinador,
            tipoIndustria: ptipoIndustria,
            imagen: pimagen
        }
        });

        peticion.done(function(response){
            respuesta =response;
        });
        peticion.fail(function(response){
            respuesta =response;
        });
        return respuesta;
    };
function obtenerPatrocinadores(){
    let listaPatrocinadores = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/visualizar_patrocinadores',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaPatrocinadores = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaPatrocinadores;
};



function buscar_patrocinador(pidPatrocinador){
    let patrocinador = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_patrocinador',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id : pidPatrocinador
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            patrocinador = response;
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
        
    });
    return patrocinador;
};



function modificarPatrocinador(pidPatrocinador,pNombrePatrocinador, ptipoIndustria, pimagen){
    $.ajax({
        url: 'http://localhost:4000/api/modificar_patrocinador',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pidPatrocinador,
            nombre:pNombrePatrocinador,
            tipoIndustria : ptipoIndustria,
            imagen: pimagen

        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
}
function borrar_patrocinador(idPatrocinador){
    $.ajax({
        url: 'http://localhost:4000/api/eliminar_patrocinador',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : idPatrocinador
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







function deshabilitar_patrocinador(pidPatrocinador){
    $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_patrocinador',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pidPatrocinador
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

function habilitar_patrocinador(pidPatrocinador){
    $.ajax({
        url: 'http://localhost:4000/api/habilitar_patrocinador',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pidPatrocinador
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