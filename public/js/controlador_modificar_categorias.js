'use strict';
let id_categoria = localStorage.getItem('categoria');
const inputNombreCategoria = document.querySelector('#txtNombre');
//const opciones = document.querySelectorAll('#tipoIndustrias option'); para select
const inputDescripcion = document.querySelector('#txtDescripcion');


const botonModificar = document.querySelector('#btnModificarCategoria');


botonModificar.addEventListener('click', obtenerDatosCategorias);


if(id_categoria){
    mostrarDatos()
}else{
    swal.fire({
        title: 'Elegí una categoría para modificar',
        text: 'No podés modificar la categoria, porque no lo has seleccionado previamente',
        type: 'warning',
        confirmButtonText: 'Entendido'
      });
    };
 
function mostrarDatos(){
    let categoria= buscar_categoria(id_categoria);

    inputNombreCategoria.value=categoria['nombre'];
    inputDescripcion.value=categoria['descripcion'];
   // for(let i = 0; i < opciones.length; i++){
   //     if(categoria['tipoIndustria'] == opciones[i].textContent){
   //         inputDescripcion.selectedIndex = i;
   //     }
   // }  para select

};



function obtenerDatosCategorias(){
    let nombreCategoria = inputNombreCategoria.value;
    let descripcionCategoria = inputDescripcion.value;
   
    let estadoError=validar(nombreCategoria, descripcionCategoria);

    modificar_categoria(id_categoria,nombreCategoria, descripcionCategoria);
   
    
        if(estadoError== true){ 
            swal.fire({
                title: 'Registro incorrecto',
                text: 'No se pudo modificar la categoría, revisá los campos en rojo',
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
                  setTimeout(function redirection(){ window.location.href = 'visualizar_categorias.html'; }, 2100);              
        }
    
};

function validar(pNombre,pDescripcion){
    let error=false;
    let expNombre= /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
    let expDescripcion= /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ .,0-9]+$/;

    if(pNombre == '' || pNombre.length == 0 ||expNombre.test(pNombre)==false ){
        inputNombreCategoria.classList.add('errorInput');
        error = true;
    }else{
        inputNombreCategoria.classList.remove('errorInput');
    }

    if(pDescripcion == '' || pDescripcion.length == 0 ||expDescripcion.test(pDescripcion)==false){
        inputDescripcion.classList.add('errorInput');
        error = true;
    }else{
        inputDescripcion.classList.remove('errorInput');
    }
    

    return error;
};