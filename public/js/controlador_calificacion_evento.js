'use strict';
const inputComentario = document.querySelector('.inputComentar');
const botonCalificacion = document.querySelector('.btnCalificar');

botonCalificacion.addEventListener('click', obtenerDatos)

let id_usuario = sessionStorage.getItem('_id');
let id_evento = localStorage.getItem('perfilEvento');

function obtenerDatos() {


    let comentario = inputComentario.value;
    let usuario = id_usuario;
    let id_eventoE = id_evento;
    let voto = divStars.getAttribute('data-rating');
    let estadoError = validar(comentario, voto)

    if (estadoError == true) {
        swal.fire({
            title: 'No se pudo comentar el  evento,',
            text: 'Digitó un valor erroneo o no realizó la votación',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarCalificacionEvento(id_eventoE, voto, comentario, usuario);
        if (respuesta.success == true) {
            swal.fire({
                title: 'Comentario enviado',
                text: 'Gracias por su opinión',
                type: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(function redirection() { window.location.href = 'perfil_evento.html'; }, 2100);
        }else {
            swal.fire({
                title: 'Comentario no se pudo enviar',
                text: 'Ocurrió un error',
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });
        }


    }
};

function validar(pComentario, pvoto) {
    let error = false;
    let expComentario = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ 0-9,.;:"'¿?¡!@$/()]+$/;

    if (pComentario == ''|| pComentario.length == 0 ||expComentario.test(pComentario) == false) {
        inputComentario.classList.add('errorInput');
        error = true;
    } else {
        inputComentario.classList.remove('errorInput');
    }
    if (pvoto == "0") {
        error = true;
    } else {

    }

    return error;
};

