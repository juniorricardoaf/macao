'use strict'

const inputFiltrar = document.querySelector('#txtFiltrar');

let listaUsuarios = obtenerUsuarios();
mostrarUsuarios();
inputFiltrar.addEventListener('keyup', mostrarUsuarios);

function mostrarUsuarios() {
    let filtro = inputFiltrar.value;
    let tbody = document.querySelector('#tblUsuarios tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < listaUsuarios.length; i++) {

        if (listaUsuarios[i]['expulsado'] == "Verdad") {

            if (listaUsuarios[i]['tipoUsuario'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['nombreUsuario'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['identificacion'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['nombreCompleto'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['correo_1'].toLowerCase().includes(filtro.toLowerCase())) {

                let fila = tbody.insertRow();

                let celdaTipo = fila.insertCell();
                let celdaNombreU = fila.insertCell();
                let celdaId = fila.insertCell();
                let celdaNombre = fila.insertCell();
                let celdaCorreo = fila.insertCell();
                let celdaFecha = fila.insertCell();
                let celdaOpciones = fila.insertCell();

                celdaTipo.innerHTML = listaUsuarios[i]['tipoUsuario'];
                celdaNombreU.innerHTML = listaUsuarios[i]['nombreUsuario'];
                celdaId.innerHTML = listaUsuarios[i]['identificacion'];
                celdaNombre.innerHTML = listaUsuarios[i]['nombreCompleto'];
                celdaCorreo.innerHTML = listaUsuarios[i]['correo_1'];
                celdaFecha.innerHTML = listaUsuarios[i]['fechaNacimiento'];

                let botonModificar = document.createElement('a');
                botonModificar.href = '#';
                botonModificar.classList.add('far');
                botonModificar.classList.add('fa-edit');
                botonModificar.dataset.id_usuario = listaUsuarios[i]['_id'];
                botonModificar.addEventListener('click', modificarDatosUsuario)

                let botonEliminar = document.createElement('a');
                botonEliminar.href = '#';
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');
                botonEliminar.dataset.id_usuario = listaUsuarios[i]['_id'];
                botonEliminar.addEventListener('click', confirmarBorrado);

                let botonExpulsar = document.createElement('a');
                botonExpulsar.href = '#';
                botonExpulsar.classList.add('fas');
                botonExpulsar.classList.add('fa-user-plus');
                botonExpulsar.dataset.id_usuario = listaUsuarios[i]['_id'];
                botonExpulsar.dataset.expulsado = listaUsuarios[i]['expulsado'];
                botonExpulsar.addEventListener('click', confirmarExpulsion);

                celdaOpciones.appendChild(botonModificar);
                celdaOpciones.appendChild(botonExpulsar);
                celdaOpciones.appendChild(botonEliminar);

            }
        }

    }
}

function modificarDatosUsuario() {

    let id_usuario = this.dataset.id_usuario;
    localStorage.setItem('usuario', id_usuario);
    window.location.href = 'modificar_perfil.html'
}
function confirmarExpulsion() {
    let id_usuario = this.dataset.id_usuario;
    let expulsado = this.dataset.expulsado;

    swal.fire({
        title: '¿Está seguro que desea remover la expulsión el usuario?',
        text: 'Los usuarios se pueden expulsar desde "visualizar expulsados"',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.value) {
            expulsar_usuario(id_usuario, expulsado);
            listaUsuarios = obtenerUsuarios();
            mostrarUsuarios();
            swal.fire(
                '¡Usuario aceptado!',
                'Se removió la expulsión del usuario',
                'success'
            )
        }
    })
    mostrarUsuarios();
};

function confirmarBorrado() {
    let id_usuario = this.dataset.id_usuario;
    swal.fire({
        title: '¿Está seguro que desea eliminar el usuario?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.value) {
            borrar_usuario(id_usuario);
            listaUsuarios = obtenerUsuarios();
            mostrarUsuarios();
            swal.fire(
                'Usuario eliminado!',
                'El usuario fue borrado con éxito',
                'success'
            )
        }
    })
};
