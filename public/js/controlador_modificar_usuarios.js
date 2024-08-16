'use strict'
obtenerUsuarios();

let id_usuario = localStorage.getItem('usuario');

let btnModificar = document.querySelector('#btnModificar');
let inputImagen = document.querySelector('#image_preview5');

let inputNombre = document.querySelector('#txtNombre');
let inputCorreo2 = document.querySelector('#txtCorreo2');
let inputCorreo = document.querySelector('#txtCorreo');
let inputIdentificacion = document.querySelector('#numID');
let inputFecha = document.querySelector('#txtFecha');
let inputEdad = document.querySelector('#numEdad');
let inputDireccion = document.querySelector('#txtDireccion');
let inputTelefono = document.querySelector('#txtTelefono');
//valores de empresario fisico

btnModificar.addEventListener('click', obtenerDatosUsuarios);
inputFecha.addEventListener('change', calcularEdad);

if (id_usuario) {
    mostrarDatos();
} else {
    alert('Debe seleccionar un perfil para actualizar');
}

function mostrarDatos() {
    let usuario = buscar_usuarios(id_usuario);
    if (usuario['imagen'] == "") {
        inputImagen.src = 'imgs/foto_user.png';
    } else {
        inputImagen.src = usuario['imagen'];
    }

    inputNombre.value = usuario['nombreCompleto'];
    inputCorreo2.value = usuario['correo_2'];
    inputCorreo.value = usuario['correo_1'];
    inputIdentificacion.value = usuario['identificacion'];
    inputFecha.value = usuario['fechaNacimiento'];
    inputEdad.value = usuario['edad'];
    inputDireccion.value = usuario['direccion'];
    inputTelefono.value = usuario['telefono'];
        if (usuario['tipoUsuario'] == "Cliente") {
            document.querySelector('#txtTelefono').style.display = 'none';
            document.querySelector('#txtCorreo2').style.display = 'none';
            document.querySelector('#txtDireccion').style.display = 'none';
            document.querySelector('#label').style.display = 'none';
            document.querySelector('#label2').style.display = 'none';
            document.querySelector('#label3').style.display = 'none';
        } else if (usuario['tipoUsuario'] == "Empresario") {
            document.querySelector('#txtFecha').style.display = 'none';
            document.querySelector('#numEdad').style.display = 'none';
            document.querySelector('#label4').style.display = 'none';
            document.querySelector('#label5').style.display = 'none';
        }
};

function obtenerDatosUsuarios() {
    let id = inputIdentificacion.value;
    let nombreCompleto = inputNombre.value;
    let correo_1 = inputCorreo.value;
    let correo_2 = inputCorreo2.value;
    let fechaNacimiento = new Date(inputFecha.value);
    let edad = Number(inputEdad.value);
    let direccion = inputDireccion.value;
    let telefono = inputTelefono.value;
    let imagen = inputImagen.src;

    let usuarioQ = buscar_usuarios(id_usuario); 

    let estadoError = validar(id, nombreCompleto, correo_1, correo_2, fechaNacimiento,edad, direccion, telefono);


    if (estadoError == false) {
        swal.fire({
            type: 'success',
            title: 'Modificación  realizada correctamente',
            text: 'La modificación se realizó correctamente',
            showConfirmButton: false,
            timer: 2000
        });

        let fechaFormateada = moment(fechaNacimiento).format('YYYY-MM-DD');
        modificarUsuarios(id_usuario, id, nombreCompleto, correo_1, correo_2, fechaFormateada, edad, direccion, telefono, imagen);
        if (usuarioQ['tipoUsuario'] == "Administrador") {
            setTimeout(function () { window.location.href = 'visualizar_usuarios.html'; }, 2100);
            localStorage.clear();
        } else {
            setTimeout(function () { window.location.href = 'perfil_usuario.html'; }, 2100);
            localStorage.clear();
        }
    } else {

        swal.fire({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar el perfil, revisá los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
};

function validar(pid, pnombreCompleto, pcorreo_1, pcorreo_2, pfechaNacimiento,pedad, pdireccion, ptelefono) {
    let expID = /^[0-9]{9,10}$/;
    let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜö ]{4,50}$/;
    let expCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;//validación correo
    let expEdad = /^[0-9]{1,3}$/;
    let expDireccion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ 0-9]+$/;
    let expTel = /^[0-9+*]{8,12}$/;
    let error = false;
    //validar ID_____________________________________________________________________________
    if (pid == '' || pid.length == 0 || expID.test(pid) == false) {
        inputIdentificacion.classList.add('errorInput');
        error = true;
    } else {
        inputIdentificacion.classList.remove('errorInput');
    }
    //validar nombres y apellidos____________________________________________________________
    if (pnombreCompleto == '' || pnombreCompleto.length == 0 || expNombre.test(pnombreCompleto) == false) {
        inputNombre.classList.add('errorInput');
        error = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }
    //validar correo__________________________________________________________________________
    if (pcorreo_1 == '' || pcorreo_1.length == 0) {
        inputCorreo.classList.add('errorInput');
        error = true;
    } else if (expCorreo.test(pcorreo_1) == false) {
        inputCorreo.classList.add('errorInput');
        error = true;
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    //validar correo2__________________________________________________________________________
    if (pcorreo_2 == 'N/A') {
        inputCorreo2.classList.remove('errorInput');
    } else {
        if (pcorreo_2 == '' || pcorreo_2.length == 0 || expCorreo.test(pcorreo_2) == false) {
            inputCorreo2.classList.add('errorInput');
            error = true;
        } else {
            inputCorreo2.classList.remove('errorInput');
        }
    }
    //fecha
    if (pfechaNacimiento == 'N/A') {
        inputDireccion.classList.remove('errorInput');
    } else {
        if (pfechaNacimiento > new Date() || pfechaNacimiento == 'Invalid Date ()') {
            inputFecha.classList.add('errorInput');
            error = true;
        } else {
            inputFecha.classList.remove('errorInput');
        }
    }
    // Validación edad____________________________________________________________________________
    if (pedad == 'N/A') {
        inputDireccion.classList.remove('errorInput');
    } else {
        if (pedad < inputEdad.min || pedad > inputEdad.max || expEdad.test(pedad) == false) {
            inputEdad.classList.add('errorInput');
            error = true;
        } else {
            inputEdad.classList.remove('errorInput');
        }
    }
    // Validación de la dirección
    if (pdireccion == 'N/A') {
        inputDireccion.classList.remove('errorInput');
    } else {
        if (pdireccion == '' || pdireccion.length == 0 || expDireccion.test(pdireccion) == false) {
            inputDireccion.classList.add('errorInput');
            error = true;
        } else {
            inputDireccion.classList.remove('errorInput');
        }
    }
    // Validación de teléfono
    if (ptelefono == 'N/A') {
        inputTelefono.classList.remove('errorInput');
    } else {
        if (ptelefono == '' || ptelefono.length == 0 || expTel.test(ptelefono) == false) {
            inputTelefono.classList.add('errorInput');
            error = true;
        } else {
            inputTelefono.classList.remove('errorInput');
        };
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
