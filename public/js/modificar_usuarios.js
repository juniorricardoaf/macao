
const botonRegistrar = document.querySelector('#btnRegistrar');
const inputTp = document.querySelector('#txttp')
const inputId = document.querySelector('#txtid');
const inputPrimerNombre = document.querySelector('#txtprim_nom');
const inputSegundoNombre = document.querySelector('#txtseg_nom');   
const inputPrimerApellido = document.querySelector('#txtprim_apell');
const inputSegundoApellido = document.querySelector('#txtseg_apell');
const inputCorreo = document.querySelector('#txtcorreo');
const inputFecha = document.querySelector('#txtnac');
const inputEdad = document.querySelector('#txtedad');
const inputContraseña = document.querySelector('#txtcontra');
const inputConfirmacion = document.querySelector('#txtconfirm');

botonRegistrar.addEventListener('click', obtenerDatos);
inputFecha.addEventListener('change', calcularEdad);

function obtenerDatos() {
    let tp = inputTp.value;
    let correo = inputCorreo.value;
    let id = inputId.value;
    let fechaNacimiento = new Date(inputFecha.value);
    let edad = Number(inputEdad.value);
    let primernombre = inputPrimerNombre.value;
    let primerapellido = inputPrimerApellido.value;
    let contra = inputContraseña.value;
    let confirm = inputConfirmacion.value;

    let estadoError = validar(tp, id, correo, primernombre, primerapellido,
        fechaNacimiento, edad, contra, confirm);


    if (estadoError == false) {
        swal.fire({
            type: 'success',
            title: 'Datos aceptados',
            text: 'Modificación completada',
            showConfirmButton: false,
            timer: 3000
        
        });
    } else {
        swal.fire({
            type: 'warning',
            title: 'Datos incorrectos',
            text: 'Modificación incompleta, revise los campos en rojo',
            showConfirmButton: false,
            timer: 3000
        });
    }

};

function validar(ptp, pid, pcorreo, pprimernombre, pprimerapellido, pfechaNacimiento, pedad, pcontra, pconfirm){
    let error = false;
    let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/; // ^= desde el inicio $=hasta el final += 1 o más coincidencias 
    let expEdad = /^[0-9]{1,3}$/;
    let expId = /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    let expCorreo = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})+$/;
    let expContra = /^[a-zA-Z@.0-9áéíóúÁÉÍÓÚñÑüÜ ]+$/;
    //validar el tipo de usuario
    if (ptp == '') {
        inputTp.classList.add('errorInput');
        error = true;
    } else {
        inputTp.classList.remove('errorInput');
    }

    /* validar identificacion  */
    if (pid == '' || pid.length == 0 || expId.test(pid) == false) {
        inputId.classList.add('errorInput');
        error = true;
    } else {
        inputId.classList.remove('errorInput');
    }
    // Validación del nombre.
    if (pprimernombre == '' || pprimernombre.length == 0 || expNombre.test(pprimernombre) == false) {
        inputPrimerNombre.classList.add('errorInput');
        error = true;
    } else {
        inputPrimerNombre.classList.remove('errorInput');
    }
    // Validación del primer apellido.
    if (pprimerapellido == '' || pprimerapellido.length == 0 || expNombre.test(pprimerapellido) == false) {
        inputPrimerApellido.classList.add('errorInput');
        error = true;
    } else {
        inputPrimerApellido.classList.remove('errorInput');
    }
    //Validación de correo.
    if (pcorreo == '' || pcorreo.length == 0 || expCorreo.test(pcorreo) == false) {
        inputCorreo.classList.add('errorInput');
        error = true;
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    // Validación de la fecha
    if (pfechaNacimiento > new Date() || pfechaNacimiento == 'Invalid Date') {
        inputFecha.classList.add('errorInput');
        error = true;
    } else {
        inputFecha.classList.remove('errorInput');
    }
    // Validación de edad
    if (pedad < inputEdad.min || pedad > inputEdad.max || expEdad.test(pedad) == false) {
        inputEdad.classList.add('errorInput');
        error = true;
    } else {
        inputEdad.classList.remove('errorInput');
    }
    // Validación de sexo 
    if (document.querySelector('#sexo input[type=radio]:checked') == null) {
        document.querySelector('#sexo').classList.add('errorInput');
        error = true;
    } else {
        document.querySelector('#sexo').classList.remove('errorInput');
    }
    // validar contraseña
    if (pcontra == '' || pcontra.length == 0 || expContra.test(pcontra) == false) {
        inputContraseña.classList.add('errorInput');
        error = true;
    } else {
        inputContraseña.classList.remove('errorInput');
    }
    // validar confirmar
    if (pconfirm == '' || pcontra != pconfirm) {
        inputConfirmacion.classList.add('errorInput');
        error = true;
    } else {
        inputConfirmacion.classList.remove('errorInput');
    }

    return error;
e};

function calcularEdad() {
    let fechaActual = new Date();
    let fechaNacimiento = new Date(inputFecha.value);

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    
    if(fechaNacimiento.getDate()>fechaActual.getDate()|| fechaNacimiento.getMonth()>fechaActual.getMonth()){
        inputEdad.value = edad;
    }else{
        inputEdad.value= edad-1;
    };
    

};

