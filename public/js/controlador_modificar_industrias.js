'use strict';

let id_industria = localStorage.getItem('industria');
const inputNombre = document.querySelector ('#tipo_industrias');
const botonActualizar = document.querySelector('#btnActualizar');
let industria = inputNombre.value;


botonActualizar.addEventListener('click', obtenerDatosFormulario);




if (id_industria){
    mostrarDatos();
}else{
    alert('Debe seleccionar una industria a actualizar');
}

function mostrarDatos(){
    let industria = buscar_industria(id_industria);

    inputNombre.value = industria['industria'];
    
};

function obtenerDatosFormulario(){
    let industria = inputNombre.value; 

    actualizarIndustria(id_industria, industria);
    let estadoError = validar(industria);

    if(estadoError== true){ 
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo modificar la industria, revisá los campos en rojo',
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
              setTimeout(function redirection(){ window.location.href = 'visualizar_industrias.html'; }, 2100);              
    }
          
};



function validar(pindustria){
    let error = false;
    
    if(pindustria == '' || pindustria.length == 0){                                                                                                        
        inputNombre.classList.add('errorInput');
        error = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }
    
    return error;
};
