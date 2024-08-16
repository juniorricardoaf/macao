'use strict';

const inputUsuario = document.querySelector('#txtUsuario');
const inputCorreo = document.querySelector('#txtCorreo');
const botonEnviar = document.querySelector('#btnOlvidarContrasena');

let contrasenna = generarContrasenna();

botonEnviar.addEventListener('click', obtenerDatos);
inputCorreo.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        obtenerDatos();
    }
});

function obtenerDatos() {

    let usuario = inputUsuario.value;
    let correo_1 = inputCorreo.value;
    let estadoError = validar(usuario, correo_1);
    let usuarioAceptado = false;
    let primerInicio = "Verdadero";
    if (estadoError == false) {
        usuarioAceptado = validarCredencialesOlvidar(usuario, correo_1, contrasenna);
        if (usuarioAceptado.success == true) {
            //enviarCorreo();
            modificarContrasena(usuarioAceptado._id, contrasenna, primerInicio);
            swal.fire({
                type: 'success',
                title: 'Modificación  realizada ',
                text: 'La modificación se realizó correctamente',
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(function () { window.location.href = 'inicio_sesion.html'; }, 2100);
            localStorage.clear();
            sessionStorage.clear();

        } else {
            swal.fire({
                type: 'warning',
                title: 'Error',
                text: 'No coinciden tus datos o no están correctos'
            });
        }

    }
    function validar(pusuario, pcorreo_1) {
        let error = false;
        let expCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;//validación correo

        if (pusuario == '' || pusuario.length == 0) {
            error = true;
            inputUsuario.classList.add('errorInput');
        } else {
            inputUsuario.classList.remove('errorInput');
        }
        if (pcorreo_1 == '' || pcorreo_1.length == 0) {
            inputCorreo.classList.add('errorInput');
            error = true;
        } else if (expCorreo.test(pcorreo_1) == false) {
            inputCorreo.classList.add('errorInput');
            error = true;
        } else {
            inputCorreo.classList.remove('errorInput');
        }
        return error;
    }
}
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