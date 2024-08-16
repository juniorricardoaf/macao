
'use strict'

function registrarCategoria(pnombre, pdescripcion){
    let respuesta='';
    let peticion= $.ajax({
        url:'http://localhost:4000/api/registrar_categorias',
        type:'post',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            nombre:pnombre,
            descripcion:pdescripcion,
        }

    });

    peticion.done(function(response){
        respuesta=response;
    });

    peticion.fail(function(response){
        respuesta=response;
    });

    return respuesta;
};



function obtenerCategorias(){
    let listaCategorias = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/visualizar_categorias',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaCategorias = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaCategorias;
};

//  modificar


function buscar_categoria(pid_categoria){
    let categoria = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_categoria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id : pid_categoria
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            categoria = response;
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
        
    });
    return categoria;
};



function modificar_categoria(pid_categoria,pNombre, pDescripcion){
    $.ajax({
        url: 'http://localhost:4000/api/modificar_categoria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_categoria,
            nombre:pNombre,
            descripcion: pDescripcion

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

//eliminar

function borrar_categoria(id_categoria){
    $.ajax({
        url: 'http://localhost:4000/api/borrar_categoria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : id_categoria
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

  function deshabilitar_categoria(pid_categoria){
    $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_categoria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_categoria,
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

function habilitar_categoria(pid_categoria){
    $.ajax({
        url: 'http://localhost:4000/api/habilitar_categoria',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_categoria,
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


