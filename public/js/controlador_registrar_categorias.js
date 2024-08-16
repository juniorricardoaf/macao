'use strict';
const inputNombre = document.querySelector('#txtNombre');
const inputDescripcion = document.querySelector('#txtDescripcion');
const botonRegistrar= document.querySelector('#btnRegistrarCategoria');

botonRegistrar.addEventListener('click',obtenerDatos)



 

function obtenerDatos(){

    let nombre = inputNombre.value;
    let descripcion= inputDescripcion.value;

    let estadoError =validar(nombre,descripcion)



    if(estadoError == true){
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la  categoria, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
           
        });
    }else{
        let respuesta;
        respuesta=registrarCategoria(nombre,descripcion);  
        
            if(respuesta.success==false){
                swal.fire({
                    title: 'Registro incorrecto',
                    text: respuesta.msg,
                    type: 'warning',
                    confirmButtonText: 'Entendido'
                   
                });
            }else{
                swal.fire({
                title: 'Registro correcto',
                text: 'Se modificó correctamente',
                type: 'success',
                timmer:2000,
                showConfirmButton:'Entendido'


            });
            }
            
        setTimeout(function redirection(){ window.location.href = 'visualizar_categorias.html'; }, 2100);
            
       
         
    }
};

function validar(pNombre,pDescripcion){
    let error=false;
    let expNombre= /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
    let expDescripcion= /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ .,0-9]+$/;

    if(pNombre == '' || pNombre.length == 0 ||expNombre.test(pNombre)==false ){
        inputNombre.classList.add('errorInput');
        error = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }

    if(pDescripcion == '' || pDescripcion.length == 0 ||expDescripcion.test(pDescripcion)==false){
        inputDescripcion.classList.add('errorInput');
        error = true;
    }else{
        inputDescripcion.classList.remove('errorInput');
    }

    return error;
};

