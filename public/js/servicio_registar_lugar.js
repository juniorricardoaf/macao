'use strict'

function registrarLugar(pnombre,pdescripcion,pcategoria,pdireccion,pprovincia,pcanton,pdistrito,ptags,pfacebook,pinstagram,ptwitter,){
    let respuesta='';
    let peticion= $.ajax({
        url:'http://localhost:4000/api/registrar_lugar',
        type:'post',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            nombre:pnombre,
            descripcion:pdescripcion,
            categoria:pcategoria,
            direccion:pdireccion,
            provincia:pprovincia,
            canton:pcanton,
            distrito:pdistrito,
            tags:ptags,
            facebook:pfacebook,
            instagram:pinstagram,
            twitter:ptwitter
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
    
function obtener_provincias(){
    let provincias = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/provinces',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false
      });
    
      peticion.done(function(response){
        provincias = response;
      });
    
      peticion.fail(function(response){
        provincias = response;
      });

     return provincias; 
};

function obtener_cantones(){
    let cantones = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/cantons',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false
      });
    
      peticion.done(function(response){
        cantones = response;
      });
    
      peticion.fail(function(response){
        cantones = response;
      });

     return cantones; 
};

function obtener_distritos(){
    let distritos = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/districts',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false
      });
    
      peticion.done(function(response){
        distritos = response;
      });
    
      peticion.fail(function(response){
        distritos = response;
      });

     return distritos; 
};
 
function obtenerLugares(){
    let listaLugares = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/visualizar_lugar',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaLugares = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaLugares;
};


function obtenerLugar(id){
  let lugar;
  let peticion = $.ajax({
      url: `http://localhost:4000/api/perfil_lugar/${id}`,
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){
      lugar = response;
      
    });
  
    peticion.fail(function(){
     
    });

    return lugar;
};