'use strict';
let id_patrocinador = localStorage.getItem('patrocinador');
const inputNombrePatrocinador = document.querySelector('#nombre');
const opciones = document.querySelectorAll('#tipoIndustrias option');
const selectTipoIndustria = document.querySelector('#tipoIndustrias');
const imgPatrocinador=document.querySelector('#image_preview4')

const botonModificar = document.querySelector('#btnModificarPatrocinador');


botonModificar.addEventListener('click', obtenerDatosPatrocinadores);


if(id_patrocinador){
    mostrarDatos()
}else{
    swal.fire({
        title: 'Elegí un patrocinador para modificar',
        text: 'No podés modificar el patrocinador, porque no lo has seleccionado previamente',
        type: 'warning',
        confirmButtonText: 'Entendido'
      });
    };

function mostrarDatos(){
    let patrocinador= buscar_patrocinador(id_patrocinador);
    imgPatrocinador.src=patrocinador['imagen'];
    inputNombrePatrocinador.value=patrocinador['nombre'];

    /* sirve para recorrer los select*/  
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
   
    modificarPatrocinador(id_patrocinador,nombrePatrocinador, tipoIndustria,imagen);
   
    if(estadoError== true){ 
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo modificar el patrocinador, revisá los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
       // modificarPatrocinador(id_patrocinador,nombrePatrocinador, tipoIndustria, imagen);
        swal.fire({
                type: 'success',
                title: 'Modificación  realizada correctamente',
                text: 'La modificación se realizó correctamente',
                showConfirmButton:false,
                timer:2000
              });
              setTimeout(function redirection(){ window.location.href = 'visualizar_patrocinadores.html'; }, 2100);              
    }  
    
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


    
