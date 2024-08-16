'use strict'

const btn_registrar=document.querySelector('#btnRegistrarContribucion');
const inputPatrocinador=document.querySelector('#patrocinador');
const inputCantidad=document.querySelector('#cantidad');
const inputDetalle=document.querySelector('#contribucion');

btn_registrar.addEventListener('click', obtenerDatos);
obtenerContribuciones();

function obtenerDatos(){
      
    let nombrePatrocinador=inputPatrocinador.value;
    let cantidad=inputCantidad.value;
    let detalle=inputDetalle.value;   

    let estadoError=validar(nombrePatrocinador, cantidad, detalle);

   
    if(estadoError== true){ 
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la contribución, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        registrar_contribucion(nombrePatrocinador, cantidad, detalle);
        swal.fire({
                type: 'success',
                title: 'Registro correcto',
                text: 'Registro realizado',
                confirmButtonText: 'Entendido'
              });

          }
  
};

function validar(pPatrocinador,pCantidad,pMensaje){
let error=false;
let expCantidad = /^[0-9]{1,15}$/;

/* Validación del patrocinador*/
    if(pPatrocinador==''){
        inputPatrocinador.classList.add('errorInput');
        error=true;
    }else{
         inputPatrocinador.classList.remove('errorInput');
        }

        /*Validación de la cantidad*/
        if(pCantidad==''||expCantidad.test(pCantidad)==false){
            inputCantidad.classList.add('errorInput');
        }else{
            inputCantidad.classList.remove('errorInput');
        }

        /* Validación del mensaje*/
        if (pMensaje == '') {
            inputDetalle.classList.add('errorInput')
            error = true;
        } else {
            inputDetalle.classList.remove('errorInput')

    } 
    return error;
};
