const btn_registrar=document.querySelector('#btnRegistrarPatrocinador');
const inputPatrocinador=document.querySelector('#nombre');
const inputIndustria=document.querySelector('#tipoIndustrias');
const imgPatrocinador=document.querySelector('#image_preview2');

btn_registrar.addEventListener('click', obtenerDatos);

obtenerPatrocinadores();

function obtenerDatos(){
    
        let nombre=inputPatrocinador.value;
        let tipoIndustria=inputIndustria.value;

        let imagen= imgPatrocinador.src;
        let estado='Habilitado'
        let estadoError=validar(nombre, tipoIndustria, imagen);

       
        if(estadoError== true){ 
            swal.fire({
                title: 'Registro incorrecto',
                text: 'No se pudo registrar el usuario, revise los campos en rojo',
                timer:6000,
                type: 'warning', 
              });
        }else{
            registrar_patrocinadores(nombre, tipoIndustria, imagen, estado);
            swal.fire({
                    type: 'success',
                    title: 'Registro correcto',
                    timer:6000,
                    text: 'Registro realizado',
                  });
        }    window.location.href='visualizar_patrocinadores.html';
    };

function validar(pnombre,pindustria){
    let error=false;
    

    /*Validación del nombre del patrocinador */
       if(pnombre==''||pnombre.length==0){
        inputPatrocinador.classList.add('errorInput');
             error=true;
       }else{
        inputPatrocinador.classList.remove('errorInput');
       } 

       if(pindustria==''){
           inputIndustria.classList.add('errorInput');
           error=true;
       }else{
            inputIndustria.classList.remove('errorInput');
       }
       return error;
};



