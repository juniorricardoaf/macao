'use strict'

function registrar_contribucion(psNombre_patrocinador,pCantidad, pDetalle,) {
       let respuesta='';
       let peticion=$.ajax({
        url: 'http://localhost:4000/api/registrar_contribucion',
        method: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async:false,
        data: {
            nombrePatrocinador : psNombre_patrocinador,
            cantidad: pCantidad,
            detalle: pDetalle
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
    
function obtenerContribuciones(){
    let listaContribuciones = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/visualizar_contribucion',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaContribuciones = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaContribuciones;
};