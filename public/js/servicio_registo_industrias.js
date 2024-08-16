'use strict';

function registrarIndustria(pindustria){
let respuesta = '';
let peticion = $.ajax({
    url: 'http://localhost:4000/api/registro_industrias',
    type: 'post', 
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    datatype: 'json',
    async: false, 
    data: {

        industria: pindustria,
    }
});

peticion.done(function(response){
    respuesta = response; 

});

peticion.fail(function(response){
    respuesta = response; 

});

return respuesta; 

};

function obtenerIndustrias(){
    let listaIndustrias = [];
    let peticion = $.ajax({
    url: 'http://localhost:4000/api/visualizar_industrias',
    type: 'get', 
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    datatype: 'json',
    async: false, 
    data: {
    }
    }); 
    peticion.done(function(response){
        listaIndustrias = response; 
    
    });
    
    peticion.fail(function(){
       
    });
    
    return listaIndustrias; 
};


function buscar_industria(pid_industria){
    let industria = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_industria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id : pid_industria
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            industria = response;
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
        
    });
    return industria;
};

function actualizarIndustria(pid_industria, pindustria){

    $.ajax({
        url: 'http://localhost:4000/api/actualizar_industria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_industria,
            industria : pindustria
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

function deshabilitar_industria(pid_industria){
    $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_industria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_industria
          
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

function habilitar_industria(pid_industria){
    $.ajax({
        url: 'http://localhost:4000/api/habilitar_industria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_industria
          
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

function borrar_industria(pid_industria){
    $.ajax({
        url: 'http://localhost:4000/api/borrar_industria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_industria
          
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
