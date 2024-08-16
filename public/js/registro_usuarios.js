'use strict'

const inputTp = document.querySelector('#txttp')

function ocultar() {
    document.querySelector('#img_centro').style.display = 'none';
    if (this.value == "Cliente") {
        document.querySelector('#registroCliente').style.display = 'block';
        document.querySelector('#registroEmpresarioFisico').style.display = 'none';
        document.querySelector('#registroEmpresarioJuridico').style.display = 'none';
        document.querySelector('#fotoP').style.display = 'block';
    } else if (this.value == "Fisico") {
        document.querySelector('#registroEmpresarioFisico').style.display = 'block';
        document.querySelector('#registroCliente').style.display = 'none';
        document.querySelector('#registroEmpresarioJuridico').style.display = 'none';
        document.querySelector('#fotoP').style.display = 'none';
    } else if (this.value == "Juridico") {
        document.querySelector('#registroEmpresarioJuridico').style.display = 'block';
        document.querySelector('#registroEmpresarioFisico').style.display = 'none';
        document.querySelector('#registroCliente').style.display = 'none';
        document.querySelector('#fotoP').style.display = 'none';

    };
};
obtenerUsuarios();
const inputTipoUsuario = document.querySelector('#txttp')
//valores de cliente
const btnRegistarCliente = document.querySelector('#btnRegistrarCliente');
const inputIdentificacion = document.querySelector('#numID');
const inputNombre = document.querySelector('#txtNombre');
const inputSegundoNombre = document.querySelector('#txtSegundoNombre');
const inputApellido = document.querySelector('#txtApellido');
const inputSegundoApellido = document.querySelector('#txtSegundoApellido');
const inputCorreo = document.querySelector('#txtCorreo');
const inputNombreUsuario = document.querySelector('#txtNombreUsuario')
const inputFecha = document.querySelector('#txtFecha');
const inputEdad = document.querySelector('#numEdad');
const inputContrasenna = generarContrasenna();
const inputImagen = document.querySelector('#image_preview2');
//valores de empresario fisico
const btnRegistarEmpresarioFisico = document.querySelector('#btnRegistrarEmpresarioFisico');
const inputIdentificacion2 = document.querySelector('#numID2');
const inputNombre2 = document.querySelector('#txtNombre2');
const inputSegundoNombre2 = document.querySelector('#txtSegundoNombre2');
const inputApellido2 = document.querySelector('#txtApellido2');
const inputSegundoApellido2 = document.querySelector('#txtSegundoApellido2');
const inputCorreo2 = document.querySelector('#txtCorreo2');
const inputTelefono2 = document.querySelector('#txtTelefono2');
const inputNombreUsuario2 = document.querySelector('#txtNombreUsuario2')
const inputFecha2 = document.querySelector('#txtFecha2');
const inputEdad2 = document.querySelector('#numEdad2');
const inputDireccion2 = document.querySelector('#txtDireccion2');
const inputContrasenna2 = generarContrasenna();
//valores de empresario juridico
const btnRegistarEmpresarioJuridico = document.querySelector('#btnRegistrarEmpresarioJuridico');
const inputCorreo3 = document.querySelector('#txtCorreo3');
const inputNombreEmpresa3 = document.querySelector('#txtNombreEmpresa3');
const inputDireccion3 = document.querySelector('#txtDireccion3');
const inputNombreUsuario3 = document.querySelector('#txtNombreUsuario3');
const inputCorreo4 = document.querySelector('#txtCorreo4');
const inputIdentificacion3 = document.querySelector('#numID3');
const inputNombre3 = document.querySelector('#txtNombre3');
const inputTelefono3 = document.querySelector('#txtTelefono3');
const inputContrasenna3 = generarContrasenna();
const inputImagen3 = document.querySelector('#image_preview3');
const inputIdJuridica= document.querySelector('#numID4');

//cliente
btnRegistarCliente.addEventListener('click', obtenerDatosCliente);
inputFecha.addEventListener('change', calcularEdad);
//empresario
btnRegistarEmpresarioFisico.addEventListener('click', obtenerDatosEmpresarioFisico);
inputFecha2.addEventListener('change', calcularEdad2);
//empresario juridico
btnRegistarEmpresarioJuridico.addEventListener('click', obtenerDatosEmpresarioJuridico);
inputTp.addEventListener('change', ocultar);

function generarContrasenna() {
    let alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    let mayuscula = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    let minuscula = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    let numeros = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    let code;
    for (let i = 0; i < 8; i++) {
        let a = mayuscula[Math.floor(Math.random() * mayuscula.length)];
        let b = minuscula[Math.floor(Math.random() * minuscula.length)];
        let c = numeros[Math.floor(Math.random() * numeros.length)];
        let d = alpha[Math.floor(Math.random() * alpha.length)];
        let e = alpha[Math.floor(Math.random() * alpha.length)];
        let f = alpha[Math.floor(Math.random() * alpha.length)];
        let g = alpha[Math.floor(Math.random() * alpha.length)];
        let h = alpha[Math.floor(Math.random() * alpha.length)];

        if (i == 7) {
            code = a + b + c + d + e + f + g + h;

        }

    }
    return code;
};

//validaciones de cliente
function obtenerDatosCliente() {
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
    let contrasenna = inputContrasenna;
    let telefono = "N/A";
    let direccion = "N/A";
    let empresa = "N/A";
    let correo_2 = "N/A";
    let imagen = inputImagen.src;
    let sexo;
    let idJuridica = "N/A";
    let primerInicio= "Verdadero";

    if(tipoUsuario== "")
    if (document.querySelector('#inputRadio input[type=radio]:checked') == null) {
        sexo = 'indefinido';
    } else {
        sexo = document.querySelector('#inputRadio input[type=radio]:checked').value;
    }

    let estadoError = validarCliente(identificacion, nombreUsuario, nombre, segundoNombre, apellido, segundoApellido, correo_1, fechaNacimiento, edad, sexo);
    if (estadoError == false) {
        let fechaFormateada = moment(fechaNacimiento).format('YYYY-MM-DD');//cambie el formato de YY-MM-DD A DD-MM-YYYY
        let nombreCompleto = nombre + " " + segundoNombre + " " + apellido + " " + segundoApellido;
        let respuesta;
        respuesta =registrarUsuario(tipoUsuario, nombreUsuario, identificacion, nombreCompleto, empresa, correo_1, correo_2, fechaFormateada, edad, sexo, direccion, telefono, contrasenna, imagen, idJuridica, primerInicio);
        if (respuesta.success==true) {
            swal.fire({
                type: 'success',
                title: 'Cuenta creada',
                text: 'Información registrada. Bienvenido'
            });
            setTimeout(function redirection() { window.location.href = 'registro_usuarios.html'; }, 3000);
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
    }

};


function validarCliente(pidentificacion, pnombreUsuario, pnombre, psegundoNombre, papellido, psegundoApellido, pcorreo, pfechaNacimiento, pedad, psexo) {
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

    return error;

};

function calcularEdad() {
    let fechaActual = new Date();
    let fechaNacimiento = new Date(inputFecha.value);

    let mesNacimiento = fechaNacimiento.getUTCMonth();
    let diaNacimiento = fechaNacimiento.getUTCDay();

    let mesActual = fechaActual.getUTCMonth();
    let diaActual = fechaActual.getUTCDay();

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (mesNacimiento < mesActual || diaNacimiento < diaActual) {
        inputEdad.value = edad;
    } else {
        inputEdad.value = edad - 1;
    };

    if (edad < 0) {
        edad = 0;
    }

    inputEdad.value = edad;
};
// validación de empresario fisico____________________________________________________________________
function obtenerDatosEmpresarioFisico() {
    let tipoUsuario2 = 'Empresario';
    let identificacion2 = inputIdentificacion2.value;
    let nombre2 = inputNombre2.value;
    let segundoNombre2 = inputSegundoNombre2.value;
    let apellido2 = inputApellido2.value;
    let segundoApellido2 = inputSegundoApellido2.value;
    let correo2_1 = inputCorreo2.value;
    let nombreUsuario2 = inputNombreUsuario2.value;
    let fechaNacimiento2 = new Date(inputFecha2.value);
    let edad2 = Number(inputEdad2.value);
    let contrasenna2 = inputContrasenna2;
    let telefono2 = inputTelefono2.value;
    let direccion2 = inputDireccion2.value;
    let empresa2 = "N/A";
    let correo2_2 = "N/A";
    let imagen2 = "";
    let sexo2;
    let idJuridica2 = "N/A";
    let primerInicio2= "Verdadero";
    if (document.querySelector('#inputRadio2 input[type=radio]:checked') == null) {
        sexo2 = 'indefinido';
    } else {
        sexo2 = document.querySelector('#inputRadio2 input[type=radio]:checked').value;
    }

    let estadoError2 = validarEmpresarioFisico(identificacion2, nombreUsuario2, nombre2, segundoNombre2, apellido2, segundoApellido2, correo2_1, telefono2, fechaNacimiento2, edad2, sexo2, direccion2, contrasenna2, imagen2);
    if (estadoError2 == false) {
        let fechaFormateada2 = moment(fechaNacimiento2).format('YYYY-MM-DD');
        let nombreCompleto2 = nombre2 + " " + segundoNombre2 + " " + apellido2 + " " + segundoApellido2;
        let respuesta;
        respuesta = registrarUsuario(tipoUsuario2, nombreUsuario2, identificacion2, nombreCompleto2, empresa2, correo2_1, correo2_2, fechaFormateada2, edad2, sexo2, direccion2, telefono2, contrasenna2, imagen2, idJuridica2, primerInicio2);
        if (respuesta.success==true) {
            swal.fire({
                type: 'success',
                title: 'Cuenta creada',
                text: 'Información registrada. Bienvenido'
            });
            setTimeout(function redirection() { window.location.href = 'registro_usuarios.html'; }, 3000);
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

    }

};

function validarEmpresarioFisico(pidentificacion, pnombreUsuario, pnombre, psegundoNombre, papellido, psegundoApellido, pcorreo, ptelefono, pfechaNacimiento, pedad, psexo, pdireccion) {
    let error = false;
    let expID = /^[0-9]{9,10}$/;
    let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    let expCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;//validación correo
    let expEdad = /^[0-9]{1,3}$/;
    let expTel = /^[0-9+]{8,15}$/;
    let expContrasenna = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){7,50}[^'\s]/;


    //validar ID_____________________________________________________________________________
    if (pidentificacion == '' || pidentificacion.length == 0 || expID.test(pidentificacion) == false) {
        inputIdentificacion2.classList.add('errorInput');
        error = true;
    } else {
        inputIdentificacion2.classList.remove('errorInput');
    }
    //validacion de nombre de usuario_______________________________________________________________________________________
    if (pnombreUsuario == '' || pnombreUsuario.length == 0) {
        inputNombreUsuario2.classList.add('errorInput');
        error = true;
    } else {
        inputNombreUsuario2.classList.remove('errorInput');
    }
    //validar nombres y apellidos____________________________________________________________
    if (pnombre == '' || pnombre.length == 0 || expNombre.test(pnombre) == false) {
        inputNombre2.classList.add('errorInput');
        error = true;
    } else {
        inputNombre2.classList.remove('errorInput');
    }
    //___
    if (psegundoNombre.length > 0 && expNombre.test(psegundoNombre) == false) {
        inputSegundoNombre2.classList.add('errorInput');
        error = true;
    } else {
        inputSegundoNombre2.classList.remove('errorInput');
    }
    //_____
    if (papellido == '' || papellido.length == 0 || expNombre.test(papellido) == false) {
        inputApellido2.classList.add('errorInput');
        error = true;
    } else {
        inputApellido2.classList.remove('errorInput');
    }
    //____
    if (psegundoApellido.length > 0 && expNombre.test(psegundoApellido) == false) {
        inputSegundoApellido2.classList.add('errorInput');
        error = true;
    } else {
        inputSegundoApellido2.classList.remove('errorInput');
    }
    //validar correo__________________________________________________________________________
    if (pcorreo == '' || pcorreo.length == 0 || expCorreo.test(pcorreo) == false) {
        inputCorreo2.classList.add('errorInput');
        error = true;
    } else {
        inputCorreo2.classList.remove('errorInput');
    }
    // validacion de telefono 
    if (ptelefono == '' || ptelefono.length == 0 || expTel.test(ptelefono) == false) {
        inputTelefono2.classList.add('errorInput');
        error = true;
    } else {
        inputTelefono2.classList.remove('errorInput');
    }
    // Validación de la fecha_____________________________________________________________________
    if (pfechaNacimiento > new Date() || pfechaNacimiento == 'Invalid Date') {
        inputFecha2.classList.add('errorInput');
        error = true;
    } else {
        inputFecha2.classList.remove('errorInput');
    }
    // Validación edad____________________________________________________________________________
    if (pedad < inputEdad2.min || pedad > inputEdad2.max || expEdad.test(pedad) == false) {
        inputEdad2.classList.add('errorInput');
        error = true;
    } else {
        inputEdad2.classList.remove('errorInput');
    }
    // Validación de Radio sexo__________________________________________________________________________
    if (psexo == 'indefinido') {
        document.querySelector('#radios2').classList.add('errorInput');
        error = true;
    } else {
        document.querySelector('#radios2').classList.remove('errorInput');
    }
    //validacion de direccion
    if (pdireccion == '' || pdireccion.length == 0) {
        inputDireccion2.classList.add('errorInput');
        error = true;
    } else {
        inputDireccion2.classList.remove('errorInput');
    }

    return error;

};

function calcularEdad2() {
    let fechaActual2 = new Date();
    let fechaNacimiento2 = new Date(inputFecha2.value);

    let mesNacimiento2 = fechaNacimiento2.getUTCMonth();
    let diaNacimiento2 = fechaNacimiento2.getUTCDay();

    let mesActual2 = fechaActual2.getUTCMonth();
    let diaActual2 = fechaActual2.getUTCDay();

    let edad2 = fechaActual2.getFullYear() - fechaNacimiento2.getFullYear();
    if (mesNacimiento2 < mesActual2 || diaNacimiento2 < diaActual2) {
        inputEdad2.value = edad2;
    } else {
        inputEdad2.value = edad2 - 1;
    };

    if (edad2 < 0) {
        edad2 = 0;
    }

    inputEdad2.value = edad2;
};

//validacoines de empresario juridico
function obtenerDatosEmpresarioJuridico() {
    let tipoUsuario3 = 'Empresario';
    let correo3_1 = inputCorreo3.value;
    let empresa3 = inputNombreEmpresa3.value;
    let direccion3 = inputDireccion3.value;
    let nombreUsuario3 = inputNombreUsuario3.value;
    let fechaNacimiento3 = "N/A";
    let edad3 = "N/A";
    let sexo3 = "N/A";
    let correo3_2 = inputCorreo4.value;
    let identificacion3 = inputIdentificacion3.value;
    let nombreCompleto3 = inputNombre3.value;
    let telefono3 = inputTelefono3.value;
    let contrasenna3 = inputContrasenna3;
    let imagen3 = inputImagen3.src;
    let idJuridica3 = inputIdJuridica.value;
    let primerInicio3= "Verdadero";
    let estadoError3 = validarEmpresarioJuridico(correo3_1, empresa3, direccion3, correo3_2, identificacion3, nombreCompleto3, telefono3, idJuridica3);
    if (estadoError3 == false) {
        let respuesta;
        respuesta=registrarUsuario(tipoUsuario3, nombreUsuario3, identificacion3, nombreCompleto3, empresa3, correo3_1, correo3_2, fechaNacimiento3, edad3, sexo3, direccion3, telefono3, contrasenna3, imagen3, idJuridica3, primerInicio3);
        
        if (respuesta.success==true) {
            swal.fire({
                type: 'success',
                title: 'Cuenta creada',
                text: 'Información registrada. Bienvenido'
            });
            setTimeout(function redirection() { window.location.href = 'registro_usuarios.html'; }, 3000);
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

    }

};

function validarEmpresarioJuridico(pcorreo, pempresa, pdireccion, pcorreo4, pidentificacion, pnombre, ptelefono, pidjuridica) {
    let error = false;
    let expID = /^[0-9]{9,10}$/;
    let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
    let expCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;//validación correo
    let expTel = /^[0-9+]{8,15}$/;

    //validar correo empresario__________________________________________________________________________
    if (pcorreo == '' || pcorreo.length == 0 || expCorreo.test(pcorreo) == false) {
        inputCorreo3.classList.add('errorInput');
        error = true;
    } else {
        inputCorreo3.classList.remove('errorInput');
    }
    //validar empresa___________________________________________________________
    if (pempresa == '' || pempresa.length == 0 || expNombre.test(pempresa) == false) {
        inputNombreEmpresa3.classList.add('errorInput');
        error = true;
    } else {
        inputNombreEmpresa3.classList.remove('errorInput');
    }
    //validacion de direccion
    if (pdireccion == '' || pdireccion.length == 0) {
        inputDireccion3.classList.add('errorInput');
        error = true;
    } else {
        inputDireccion3.classList.remove('errorInput');
    }
    //validar correo contacto__________________________________________________________________________
    if (pcorreo4 == '' || pcorreo4.length == 0 || expCorreo.test(pcorreo4) == false) {
        inputCorreo4.classList.add('errorInput');
        error = true;
    } else {
        inputCorreo4.classList.remove('errorInput');
    }
    //validar ID_____________________________________________________________________________
    if (pidentificacion == '' || pidentificacion.length == 0 || expID.test(pidentificacion) == false) {
        inputIdentificacion3.classList.add('errorInput');
        error = true;
    } else {
        inputIdentificacion3.classList.remove('errorInput');
    }

    // validacion de telefono 
    if (ptelefono == '' || ptelefono.length == 0 || expTel.test(ptelefono) == false) {
        inputTelefono3.classList.add('errorInput');
        error = true;
    } else {
        inputTelefono3.classList.remove('errorInput');
    }
    //validar nombres completo____________________________________________________________
    if (pnombre == '' || pnombre.length == 0 || expNombre.test(pnombre) == false) {
        inputNombre3.classList.add('errorInput');
        error = true;
    } else {
        inputNombre3.classList.remove('errorInput');
    }
    //validar ID_Jurídica____________________________________________________________________________
    if (pidjuridica == '' || pidjuridica.length == 0 || expID.test(pidjuridica) == false) {
        inputIdJuridica.classList.add('errorInput');
        error = true;
    } else {
        inputIdJuridica.classList.remove('errorInput');
    }
    return error;

};
