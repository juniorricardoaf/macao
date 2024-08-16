
const inputComentario = document.querySelector('.inputComentar');
const botonCalificacion = document.querySelector('.btnCalificar');

botonCalificacion.addEventListener('click', obtenerDatos)

let id_usuarioLugar = sessionStorage.getItem('_id');
let id_lugarP = localStorage.getItem('lugar');

function obtenerDatos() {
    
    let comentario = inputComentario.value;
    let usuario = id_usuarioLugar;
    let id_lugarE = id_lugarP;
    let voto = divStars.getAttribute('data-rating');
    let estadoError = validar(comentario, voto)

    if (estadoError == true) {
        swal.fire({
            title: 'No se pudo comentar el  lugar,',
            text: 'Digitó un valor erroneo o no realizó la votación',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta= registrarCalificacionLugar(id_lugarE, voto, comentario, usuario);
        if (respuesta.success == true) {
            swal.fire({
                title: 'Comentario enviado',
                text: 'Gracias por su opinión',
                type: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(function redirection() { window.location.href = 'perfil_lugar.html'; }, 2100);
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

