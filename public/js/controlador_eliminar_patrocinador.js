'use strict';
let id_patrocinador = localStorage.getItem('patrocinador');
const btn_confirmar= document.querySelector('#btnConfirmar');
const inputNombrePatrocinador = document.querySelector('#nombre');
const opciones = document.querySelectorAll('#tipoIndustrias option');
const selectTipoIndustria = document.querySelector('#tipoIndustrias');
const imgPatrocinador=document.querySelector('#image_preview5')

const botonEliminar = document.querySelector('#btnEliminarPatrocinador');


botonEliminar.addEventListener('click', obtenerDatosPatrocinadores);

btn_confirmar.addEventListener('click', cancelar);

if(id_patrocinador){
    mostrarDatos()
}else{
    swal.fire({
        title: 'Elegí un patrocinador para eliminar',
        text: 'No podés eliminar el patrocinador, porque no lo has seleccionado previamente',
        type: 'warning',
        confirmButtonText: 'Entendido'
      });
    };

function mostrarDatos(){
    let patrocinador= buscar_patrocinador(id_patrocinador);

    inputNombrePatrocinador.value=patrocinador['nombrePatrocinador'];

    
    for(let i = 0; i < opciones.length; i++){
        if(patrocinador['tipoIndustria'] == opciones[i].textContent){
            selectTipoIndustria.selectedIndex = i;
        }
    }

};



function obtenerDatosPatrocinadores(){
    let nombrePatrocinador = inputNombrePatrocinador.value;
    let tipoIndustria = selectTipoIndustria.value;
    let imagen= imgPatrocinador.src;

    let estadoError=validar(nombrePatrocinador, tipoIndustria, imagen);

    eliminarPatrocinador(id_patrocinador,nombrePatrocinador, tipoIndustria,imagen);
   


   
    if(estadoError== true){ 
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo modificar el patrocinador, revisá los campos en rojo',
            type: 'warning',
            timer:6000,
            confirmButtonText: 'Entendido'
          });
    }else{
        eliminarPatrocinador(id_patrocinador,nombrePatrocinador, tipoIndustria, imagen);
        swal.fire({
                type: 'success',
                title: 'La eliminación se realizó correctamente',
                text: 'La modificación se realizó correctamente',
                timer:10000,
                confirmButtonText: 'Entendido',
              });
              
    }  
    window.location.href = 'visualizar_patrocinadores.html';
};

    function validar(pNombre_patrocinador,pTipo_industria){
     let error=false;


    /*Validación del nombre del patrocinador */
   if(pNombre_patrocinador==''||pNombre_patrocinador.length==0){
    inputNombrePatrocinador.classList.add('errorInput');
         error=true;
   }else{
    inputNombrePatrocinador.classList.remove('errorInput');
   } 

   if(pTipo_industria==''){
       selectTipoIndustria.classList.add('errorInput');
       error=true;
   }else{
        selectTipoIndustria.classList.remove('errorInput');
   }
   return error;
    };

    function cancelar(){

        window.location.href='visualizar_patrocinadores.html';
        
        };