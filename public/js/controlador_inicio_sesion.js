'use strict';

const inputUsuario = document.querySelector('#txtUsuario');
const inputContrasenna = document.querySelector('#txtContrasenna');
const botonIniciar = document.querySelector('#btnIniciarSesion');

botonIniciar.addEventListener('click', obtenerDatos);
inputContrasenna.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        obtenerDatos();
    }
});
function obtenerDatos() {
    let usuario = inputUsuario.value;
    let contrasenna = inputContrasenna.value;
    let estadoError = validar(usuario, contrasenna);
    let usuarioAceptado = false;

    if (estadoError == false) {
        usuarioAceptado = validarCredenciales(usuario, contrasenna);
        if (usuarioAceptado.success == true) {
            //se meten los if, si el usurioa es cliente o empresario o administrador (pensar en el estado de habilitado o deshabilitado)
            let tipoUsuario = usuarioAceptado.tipoUsuario;
            let primerInicio = usuarioAceptado.primerInicio;
            if (primerInicio == "Verdadero") {
                window.location.href = 'modificar_contrasena.html'
            } else {
                switch (tipoUsuario) {
                    case "Administrador":
                        window.location.href = 'inicio_administrador.html';
                        break
                    case "Empresario":
                        window.location.href = 'inicio_empresario.html';
                        break
                    case "Cliente":
                        window.location.href = 'inicio_cliente.html';
                        break
                    default:
                        swal.fire({
                            type: 'warning',
                            title: 'No se puede ingresar',
                            text: 'ocurrió un problema'

                        });
                        break
                }
            }
        } else {
            inputUsuario.classList.add('errorInput');
            inputContrasenna.classList.add('errorInput');
            let estado = usuarioAceptado.estado;
            let expulsado = usuarioAceptado.expulsado;
            if (estado == "Deshabilitado") {
                swal.fire({
                    type: 'warning',
                    title: 'No se puede ingresar',
                    text: 'Usuario deshabilitado'
                });
            } else if (expulsado == "Verdad") {
                swal.fire({
                    type: 'warning',
                    title: 'No se puede ingresar',
                    text: 'Usuario expulsado'
                });
            } else {
                swal.fire({
                    type: 'warning',
                    title: 'No se puede ingresar',
                    text: 'Usuario o contraseña incorrectos'
                });
            }


        }
    } else {
        swal.fire({
            type: 'warning',
            title: 'Inserte su información',
            text: 'Espacios en blanco'
        });
        //diferentes if segun la comodidad

    }

}

function validar(pusuario, pcontrasenna) {
    let error = false;

    if (pusuario == '' || pusuario.length == 0) {
        error = true;
        inputUsuario.classList.add('errorInput');
    } else {
        inputUsuario.classList.remove('errorInput');
    }

    if (pcontrasenna == '' || pcontrasenna.length == 0) {
        error = true;
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    }


    return error;
}
//Pru
