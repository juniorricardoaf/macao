const botonRegistrar = document.querySelector('#btnRegistrar_industrias');
const inputIndustria = document.querySelector('#tipo_industrias');


botonRegistrar.addEventListener('click',obtenerDatos);



function obtenerDatos(){
   
    let industria = inputIndustria.value;
    
    let estadoError = validar(industria);

    if(estadoError == true){
        swal.fire({
            title: 'Registro incorrecto', 
            text: 'No se pudo resgistrar la empresa, revise los campos en rojo', 
            type: 'warning', 
            confirmButtonText: 'Entendido'
        });
    }else{
        registrarIndustria(industria);
         swal.fire({
            title: 'Registro correcto', 
            text: 'Todo el registro se completó', 
            type: 'success',
           showconfirmButton: false,
           timer: 2000
        });
        setTimeout(function redirection(){ window.location.href = 'visualizar_industrias.html'; }, 2100);
      
    }
   
};


function validar(pindustria){
    let error = false;
    
    if(pindustria == '' || pindustria.length == 0){
        inputIndustria.classList.add('errorInput');
        error = true;
    }else{
        inputIndustria.classList.remove('errorInput');
    }
    
    return error;
};


