'use strict';
obtenerUsuarios();
let id_usuario = sessionStorage.getItem('_id');

//aquí los llamo del del sesson y sessionStorage al iniciar sesion de cualquier usuario+

const modificarP = document.querySelector('#btnIrAModificar');
const modificarC = document.querySelector('#btnIrAModificarContra');

modificarP.addEventListener('click', href);
modificarC.addEventListener('click', href2);

function href() {
    window.location.href = 'modificar_perfil.html';
}
function href2(){
    window.location.href = 'modificar_contrasena.html';
}


// aquí llena los campos de los input
let usuario = buscar_usuarios(id_usuario);

document.getElementById("txtNombreUsuario").value = "Bienvenido " + usuario['nombreUsuario'];
document.getElementById("numID").value = usuario['identificacion'];
document.getElementById("txtNombre").value = usuario['nombreCompleto'];
document.getElementById("txtEmpresa").value = usuario['empresa'];
document.getElementById("txtCorreo").value = usuario['correo_1'];
document.getElementById("txtCorreo2").value = usuario['correo_2'];
document.getElementById("txtFecha").value = usuario['fechaNacimiento'];
document.getElementById("numEdad").value = usuario['edad'];
document.getElementById("txtDireccion").value = usuario['direccion'];
document.getElementById("txtTelefono").value = usuario['telefono'];
if (usuario['imagen'] == "") {
    document.getElementById("image_preview2").src = 'imgs/foto_usuario.png';
} else {
    document.getElementById("image_preview2").src = usuario['imagen'];
}

//contraldor de perfiles


if (conectado) {
    let cambio;
    let cambio2;
    let cambio3;
    let cambio4;
    switch (tipoUsuario) {//que pasa si el usuario es admini, cliente, empresario

        case 'Cliente':
            cambio = document.querySelector("#perfiles");
            cambio.classList.add('ocultar');
            cambio2 = document.querySelector("#perfiles2");
            cambio2.classList.add('ocultar');
            cambio3 = document.querySelector("#perfiles3");
            cambio3.classList.add('ocultar');
            cambio4 = document.querySelector("#perfiles4");
            cambio4.classList.add('ocultar');
        default:
            break;

    }
} else {
    window.location.href = 'inicio_sesion.html';
}

