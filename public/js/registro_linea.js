'use strict';

//imprimir_lista_usuarios();

const btnRegistarCliente = document.querySelector('#btnRegistrarCliente');
const btnRefrescar = document.querySelector('#btnRefrescar');
const inputIdentificacion = document.querySelector('#numID');
const inputNombre = document.querySelector('#txtNombre');
const inputSegundoNombre = document.querySelector('#txtSegundoNombre');
const inputApellido = document.querySelector('#txtApellido');
const inputSegundoApellido = document.querySelector('#txtSegundoApellido');
const inputCorreo = document.querySelector('#txtCorreo');
const inputNombreUsuario = document.querySelector('#txtNombreUsuario')
const inputFecha = document.querySelector('#txtFecha');
const inputEdad = document.querySelector('#numEdad');
const inputContrasenna = document.querySelector('#txtContrasenna');
const inputConContrasenna = document.querySelector('#txtConContrasenna');
const inputCaptcha = document.querySelector('#captcha');
const inputCodigo = document.querySelector('#txtCodigo');
const inputImagen = document.querySelector('#image_preview')


generarCaptcha();
btnRefrescar.addEventListener('click', generarCaptcha);
btnRegistarCliente.addEventListener('click', obtenerDatos);
inputFecha.addEventListener('change', calcularEdad);

//validaciones de cliente
function obtenerDatos() {
    let tipoUsuario = "Cliente";
    let identificacion = inputIdentificacion.value;
    let nombre = inputNombre.value;
    let segundoNombre = inputSegundoNombre.value;
    let apellido = inputApellido.value;
    let segundoApellido = inputSegundoApellido.value;
    let correo_1 = inputCorreo.value;
    let nombreUsuario = inputNombreUsuario.value;
    let fechaNacimiento = new Date(inputFecha.value);
    let edad = Number(inputEdad.value);
    let contrasenna = inputContrasenna.value;
    let conContrasenna = inputConContrasenna.value;
    let telefono = "N/A";
    let direccion = "N/A";
    let empresa = "N/A";
    let correo_2 = "N/A";
    let imagen = inputImagen.src;
    let idJuridica = "N/A";
    let primerInicio1= "Falso";
    let sexo;
    if (document.querySelector('#inputRadio input[type=radio]:checked') == null) {
        sexo = 'indefinido';
    } else {
        sexo = document.querySelector('#inputRadio input[type=radio]:checked').value;
    }
    let captchaValor = inputCaptcha.value;
    let codigoEscrito = inputCodigo.value;


    let estadoError = validarCliente(identificacion, nombreUsuario, nombre, segundoNombre, apellido, segundoApellido, correo_1, fechaNacimiento, edad, sexo, contrasenna, conContrasenna, captchaValor, codigoEscrito);
    if (estadoError == false) {
        let fechaFormateada = moment(fechaNacimiento).format('YYYY-MM-DD');
        let nombreCompleto = nombre + " " + segundoNombre + " " + apellido + " " + segundoApellido;
        let respuesta;
        
        respuesta = registrarUsuario(tipoUsuario, nombreUsuario, identificacion, nombreCompleto, empresa, correo_1, correo_2, fechaFormateada, edad, sexo, direccion, telefono, contrasenna, imagen, idJuridica, primerInicio1);
        if (respuesta.success==true) {
            swal.fire({
                type: 'success',
                title: 'Cuenta creada',
                text: 'Información registrada. Bienvenido'
            });
            setTimeout(function redirection() { window.location.href = 'inicio_sesion.html'; }, 2000);
        } else {
            swal.fire({
                type: 'warning',
                title: 'ocurrió un problema',
                text: respuesta.msg
            });
            generarCaptcha();
        }
    } else {
        swal.fire({
            type: 'warning',
            title: 'Datos incorrectos',
            text: 'No se pudo registrar su información, verificar espacios en rojo'
        });
        generarCaptcha();
    }

};

function validarCliente(pidentificacion, pnombreUsuario, pnombre, psegundoNombre, papellido, psegundoApellido, pcorreo, pfechaNacimiento, pedad, psexo, pcontrasenna, pconContrasenna, pcaptchaValor, pcodigoEscrito) {
    let error = false;
    let expID = /^[0-9]{9,10}$/;
    let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    let expCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;//validación correo
    let expEdad = /^[0-9]{1,3}$/;
    let expContrasenna = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){7,50}[^'\s]/;


    //validar ID_____________________________________________________________________________
    if (pidentificacion == '' || pidentificacion.length == 0 || expID.test(pidentificacion) == false) {
        inputIdentificacion.classList.add('errorInput');
        error = true;
    } else {
        inputIdentificacion.classList.remove('errorInput');
    }
    //validacion de nombre de usuario_______________________________________________________________________________________
    if (pnombreUsuario == '' || pnombreUsuario.length == 0) {
        inputNombreUsuario.classList.add('errorInput');
        error = true;
    } else {
        inputNombreUsuario.classList.remove('errorInput');
    }
    //validar nombres y apellidos____________________________________________________________
    if (pnombre == '' || pnombre.length == 0 || expNombre.test(pnombre) == false) {
        inputNombre.classList.add('errorInput');
        error = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }
    //___
    if (psegundoNombre.length > 0 && expNombre.test(psegundoNombre) == false) {
        inputSegundoNombre.classList.add('errorInput');
        error = true;
    } else {
        inputSegundoNombre.classList.remove('errorInput');
    }
    //_____
    if (papellido == '' || papellido.length == 0 || expNombre.test(papellido) == false) {
        inputApellido.classList.add('errorInput');
        error = true;
    } else {
        inputApellido.classList.remove('errorInput');
    }
    //____
    if (psegundoApellido.length > 0 && expNombre.test(psegundoApellido) == false) {
        inputSegundoApellido.classList.add('errorInput');
        error = true;
    } else {
        inputSegundoApellido.classList.remove('errorInput');
    }
    //validar correo__________________________________________________________________________
    if (pcorreo == '' || pcorreo.length == 0 || expCorreo.test(pcorreo) == false) {
        inputCorreo.classList.add('errorInput');
        error = true;
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    // Validación de la fecha_____________________________________________________________________
    if (pfechaNacimiento > new Date() || pfechaNacimiento == 'Invalid Date') {
        inputFecha.classList.add('errorInput');
        error = true;
    } else {
        inputFecha.classList.remove('errorInput');
    }
    // Validación edad____________________________________________________________________________
    if (pedad < inputEdad.min || pedad > inputEdad.max || expEdad.test(pedad) == false) {
        inputEdad.classList.add('errorInput');
        error = true;
    } else {
        inputEdad.classList.remove('errorInput');
    }
    // Validación de Radio sexo__________________________________________________________________________
    if (psexo == 'indefinido') {
        document.querySelector('#radios').classList.add('errorInput');
        error = true;
    } else {
        document.querySelector('#radios').classList.remove('errorInput');
    }
    // Validación contraseñas____________________________________________________________________________
    if (pcontrasenna == '' || pcontrasenna.length == 0 || pcontrasenna.length < 8 || expContrasenna.test(pcontrasenna) == false) {
        inputContrasenna.classList.add('errorInput');
        inputConContrasenna.classList.add('errorInput');
        error = true;
    } else {
        inputContrasenna.classList.remove('errorInput');
    }
    if (pconContrasenna == pcontrasenna) {

        inputConContrasenna.classList.remove('errorInput');
    } else {
        inputConContrasenna.classList.add('errorInput');
        error = true;
    }
    // validación del captcha
    if (pcodigoEscrito == '' || pcodigoEscrito.length == 0) {
        inputCodigo.classList.add('errorInput');
        error = true;
    } else if (pcaptchaValor == pcodigoEscrito) {
        inputCodigo.classList.remove('errorInput');
    } else {
        inputCodigo.classList.add('errorInput');
        error = true;
    }
    return error;

};

function calcularEdad() {
    let fechaActual = new Date();
    let fechaNacimiento = new Date(inputFecha.value);

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 0) {
        edad = 0;
    }
    inputEdad.value = edad;
};

function generarCaptcha() {
    let alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

    for (let i = 0; i < 4; i++) {
        let a = alpha[Math.floor(Math.random() * alpha.length)];
        let b = alpha[Math.floor(Math.random() * alpha.length)];
        let c = alpha[Math.floor(Math.random() * alpha.length)];
        let d = alpha[Math.floor(Math.random() * alpha.length)];

        if (i == 3) {
            let code = a + b + c + d;
            document.getElementById("captcha").value = code;
        }
    }
};
