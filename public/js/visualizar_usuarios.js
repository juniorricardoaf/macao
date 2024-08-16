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
        if (listaUsuarios[i]['expulsado'] == "Falso") {
            if (listaUsuarios[i]['tipoUsuario'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['nombreUsuario'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['identificacion'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['nombreCompleto'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['correo_1'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaUsuarios[i]['estado'].includes(filtro)//sin ignorar las minusculas para que el filtro funcione
            ) {

                let fila = tbody.insertRow();

                let celdaTipo = fila.insertCell();
                let celdaNombreU = fila.insertCell();
                let celdaId = fila.insertCell();
                let celdaNombre = fila.insertCell();
                let celdaCorreo = fila.insertCell();


                celdaTipo.innerHTML = listaUsuarios[i]['tipoUsuario'];
                celdaNombreU.innerHTML = listaUsuarios[i]['nombreUsuario'];
                celdaId.innerHTML = listaUsuarios[i]['identificacion'];
                celdaNombre.innerHTML = listaUsuarios[i]['nombreCompleto'];
                celdaCorreo.innerHTML = listaUsuarios[i]['correo_1'];


                let celdaEstado = fila.insertCell();
                if (listaUsuarios[i]['estado'] == 'Habilitado') {
                    let botonDeshabilitar = document.createElement('a');
                    botonDeshabilitar.href = '#';
                    botonDeshabilitar.textContent = 'Habilitado';
                    botonDeshabilitar.classList.add('botonEstado');
                    botonDeshabilitar.classList.add('btnDeshabilitar');
                    botonDeshabilitar.dataset.id_usuario = listaUsuarios[i]['_id'];
                    botonDeshabilitar.addEventListener('click', deshabilitar);
                    celdaEstado.appendChild(botonDeshabilitar);

                } else {
                    let botonHabilitar = document.createElement('a');
                    botonHabilitar.href = '#';
                    botonHabilitar.textContent = 'Deshabilitado';
                    botonHabilitar.classList.add('botonEstado');
                    botonHabilitar.classList.add('btnHabilitar');
                    botonHabilitar.dataset.id_usuario = listaUsuarios[i]['_id'];
                    botonHabilitar.addEventListener('click', habilitar);
                    celdaEstado.appendChild(botonHabilitar);
                }

                let botonModificar = document.createElement('a');
                botonModificar.href = '#';
                botonModificar.classList.add('far');
                botonModificar.classList.add('fa-edit');
                botonModificar.dataset.id_usuario = listaUsuarios[i]['_id'];
                botonModificar.addEventListener('click', modificarDatosUsuario);




                let celdaOpciones = fila.insertCell();
                let botonEliminar = document.createElement('a');
                botonEliminar.href = '#';
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');
                botonEliminar.dataset.id_usuario = listaUsuarios[i]['_id'];
                botonEliminar.addEventListener('click', confirmarBorrado);

                let botonExpulsar = document.createElement('a');
                botonExpulsar.href = '#';
                botonExpulsar.classList.add('fas');
                botonExpulsar.classList.add('fa-user-minus');
                botonExpulsar.dataset.id_usuario = listaUsuarios[i]['_id'];
                botonExpulsar.dataset.expulsado = listaUsuarios[i]['expulsado'];
                botonExpulsar.addEventListener('click', confirmarExpulsion);

                celdaOpciones.appendChild(botonModificar);
                celdaOpciones.appendChild(botonModificar);
                celdaOpciones.appendChild(botonExpulsar);
                celdaOpciones.appendChild(botonEliminar);

            }
        }



    }
}
function deshabilitar() {
    swal.fire({
        title: 'Esta seguro que desea deshabilitar el usuario?',
        text: "Este proceso se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Acepto',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            let id_usuario = this.dataset.id_usuario;
            deshabilitar_usuario(id_usuario);
            listaUsuarios = obtenerUsuarios();
            mostrarUsuarios();
            swal.fire(
                'Usuario deshabilitado',
                'El usuario se deshabilitó con éxito.',
                'success'
            )
        }
    })
};
function habilitar() {

    swal.fire({
        title: 'Esta seguro que desea habiltar el usuario?',
        text: "Este proceso se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Acepto',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            let id_usuario = this.dataset.id_usuario;
            habilitar_usuario(id_usuario);
            listaUsuarios = obtenerUsuarios();
            mostrarUsuarios();
            swal.fire(
                'Usuario habilitado',
                'El usuario se habilitó con éxito.',
                'success'
            )
        }
    })
};

function modificarDatosUsuario() {

    let id_usuario = this.dataset.id_usuario;
    localStorage.setItem('usuario', id_usuario);
    window.location.href = 'modificar_perfil.html'
}
function confirmarExpulsion() {
    let id_usuario = this.dataset.id_usuario;
    let expulsado = this.dataset.expulsado;

    swal.fire({
        title: '¿Está seguro que desea expulsar el usuario?',
        text: "Este proceso se puede revertir desde visualizar expulsados",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            expulsar_usuario(id_usuario, expulsado);
            listaUsuarios = obtenerUsuarios();
            mostrarUsuarios();
            swal.fire(
                'Usuario expulsado',
                'El usuario fue borrado con éxito',
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
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            borrar_usuario(id_usuario);
            listaUsuarios = obtenerUsuarios();
            mostrarUsuarios();
            swal.fire(
                'Usuario eliminado',
                'El usuario fue borrado con éxito',
                'success'
            )
        }
    })
};

function modificarDatosUsuario() {
    let id_usuario = this.dataset.id_usuario;
    localStorage.setItem('usuario', id_usuario);
    window.location.href = 'modificar_perfil_usuarios.html'

}    
