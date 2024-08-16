'use strict'
const inputFiltrar = document.querySelector('#txtFiltrar');

let listaLugar = obtenerLugares();
let id_usuario = sessionStorage.getItem('_id');
let usuario = buscar_usuarios(id_usuario);

mostrarLugares();
inputFiltrar.addEventListener('keyup', mostrarLugares);
function mostrarLugares() {
    let filtro = inputFiltrar.value;
    let tbody = document.querySelector('#tblLugar tbody');
    tbody.innerHTMrL = '';
    for (let i = 0; i < listaLugar.length; i++) {

        if (listaLugar[i]['aprobado'] == "Falso") {

            if (listaLugar[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())){

                let fila = tbody.insertRow();

                let celdaNombreEmpresario= fila.insertCell();
                let celdaNombreLugar = fila.insertCell();
                let verPerfil=fila.insertCell();
                let celdaAprobar = fila.insertCell();

                celdaNombreEmpresario.innerHTML = usuario['nombreUsuario'];
                celdaNombreLugar.innerHTML = listaLugar[i]['nombre'];

                


                
                let botonMostrarPerfil = document.createElement('a');
                botonMostrarPerfil.href = '#';
                botonMostrarPerfil.classList.add('verMas');
                botonMostrarPerfil.innerHTML = "Ver más ";
                verPerfil.appendChild(botonMostrarPerfil);
                botonMostrarPerfil.dataset.id_lugar = listaLugar[i]['_id'];
                botonMostrarPerfil.addEventListener('click', mostrarPerfilLugar);



                let botonAprobar = document.createElement('a');
                botonAprobar.href = '#';
                botonAprobar.classList.add('fas');
                botonAprobar.classList.add('fa-clipboard-check');
                botonAprobar.dataset.id_usuario = listaLugar[i]['_id'];
                botonAprobar.dataset.aprobado = listaLugar[i]['aprobado'];
                botonAprobar.addEventListener('click', confirmarAprobacion)

                celdaAprobar.appendChild(botonAprobar);
            }
        }
    }

}
function confirmarAprobacion() {
    let id_usuario = this.dataset.id_usuario;
    let aprobado = this.dataset.aprobado;

    swal.fire({
        title: '¿Está seguro que desea aprobar el lugar?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            aprobar_lugar(id_usuario, aprobado);
            listaLugar = obtenerLugares();
           
        swal.fire({
                type: 'success',
                title: 'Lugar aprobado',
                text: 'La aprobación se realizó correctamente',
                showConfirmButton:false,
                timer:1500
              });
              setTimeout(function redirection(){ window.location.href = 'visualizar_lugar.html'; }, 1600);
        }
    })
    
};


function mostrarPerfilLugar() {
    let id_lugar = this.dataset.id_lugar;
    localStorage.setItem('lugar', id_lugar);
    window.location.href = 'perfil_lugar.html';
};




