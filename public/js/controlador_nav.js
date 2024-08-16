'use strict';
let nav = document.querySelectorAll('#navPrincipal li');
let conectado = sessionStorage.getItem('conectado');
const btnCerrarSesion = document.querySelector('#btnCerrarSesion');


if (conectado) {

} else {
    if (window.location.href == 'http://localhost:3000/public/inicio_sesion.html' || window.location.href == 'http://localhost:3000/public/inicio_sesion.html#') {
        sessionStorage.clear();
    }
}


let btnInicio;
if (conectado) {
    let tipoUsuario = sessionStorage.getItem('tipoUsuario');
    let id_user = sessionStorage.getItem('_id');
    let user = buscar_usuarios(id_user);
    if (user['imagen'] == "") {
        document.getElementById("image_preview").src = 'imgs/foto_user.png';
    } else {
        document.getElementById("image_preview").src = user['imagen'];
    }

    switch (tipoUsuario) {//que pasa si el usuario es admini, cliente, empresario

        case 'Administrador':
            btnInicio = document.querySelector('.inicio');
            btnInicio.addEventListener('click', inicioAdminitrador);
            nav[3].classList.add('ocultar');
            nav[4].classList.add('ocultar');
            break;
        case 'Empresario':
            btnInicio = document.querySelector('.inicio');
            btnInicio.addEventListener('click', inicioEmpresario);
            nav[3].classList.add('ocultar');
            nav[4].classList.add('ocultar');
            break;
        case 'Cliente':
            btnInicio = document.querySelector('.inicio');
            btnInicio.addEventListener('click', inicioCliente);

            nav[3].classList.add('ocultar');
            nav[4].classList.add('ocultar');
            break;
        default:
            btnInicio = document.querySelector('.inicio');
            btnInicio.addEventListener('click', inicioIndex);
            nav[4].classList.add('ocultar');
            window.location.href = 'inicio_sesion.html';
            break;

    }
} else if (window.location.href != 'http://localhost:3000/public/Visualizar_evento.html' && window.location.href != 'http://localhost:3000/public/Visualizar_lugar.html' && window.location.href != 'http://localhost:3000/public/perfil_evento.html' && window.location.href != 'http://localhost:3000/public/perfil_lugar.html' && window.location.href == 'inicio_sesion.html') {
    btnInicio = document.querySelector('.inicio');
    btnInicio.addEventListener('click', inicioIndex);
    window.location.href = 'inicio_sesion.html';
    nav[5].classList.add('ocultar');
} else {
    btnInicio = document.querySelector('.inicio');
    btnInicio.addEventListener('click', inicioIndex);
    nav[5].classList.add('ocultar');
}

function inicioAdminitrador() {
    window.location.href = 'inicio_administrador.html'
}
function inicioEmpresario() {
    window.location.href = 'inicio_empresario.html'
}
function inicioCliente() {
    window.location.href = 'inicio_cliente.html'
}
function inicioIndex() {
    window.location.href = 'index.html'
}




btnCerrarSesion.addEventListener('click', cerrarSesion);
function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = 'inicio_sesion.html';

}



function buscar_usuarios(pid_usuario) {
    let usuario = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_usuarios',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id: pid_usuario,
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {
            usuario = response;

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }

    });
    return usuario;
};


