'use strict'

const inputFiltrar = document.querySelector('#txtFiltrar');

inputFiltrar.addEventListener('keyup', mostrarListaIndustrias);

mostrarListaIndustrias();
let listaIndustrias = obtenerIndustrias();

function mostrarListaIndustrias() {
    let listaIndustrias = obtenerIndustrias();
    let filtro = inputFiltrar.value;

    let tbody = document.querySelector('#tblIndustrias tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaIndustrias.length; i++) {

        if (listaIndustrias[i]['industria'].toLowerCase().includes(filtro.toLowerCase())) {

            let fila = tbody.insertRow();
            let celdaTp = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaOpciones = fila.insertCell();
            celdaTp.innerHTML = listaIndustrias[i]['industria'];


            let botonModificar = document.createElement('a');
            botonModificar.href = '#';
            botonModificar.classList.add('far');
            botonModificar.classList.add('fa-edit');
            botonModificar.dataset.id_industria = listaIndustrias[i]['_id'];

            botonModificar.addEventListener('click', mostrarDatosIndustrias);

            let botonEliminar = document.createElement('a');
            botonEliminar.href = '#';
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');
            botonEliminar.dataset.id_industria = listaIndustrias[i]['_id'];

            botonEliminar.addEventListener('click', confirmarBorrado);




            if (listaIndustrias[i]['estado'] == 'Habilitado') {
                let botonDeshabilitar = document.createElement('a');
                botonDeshabilitar.href = '#';
                botonDeshabilitar.textContent = 'Habilitado';
                botonDeshabilitar.classList.add('botonEstado');
                botonDeshabilitar.classList.add('btnDeshabilitar');
                botonDeshabilitar.setAttribute('title', 'Ocultar industria')
                botonDeshabilitar.dataset.id_industria = listaIndustrias[i]['_id'];
                botonDeshabilitar.addEventListener('click', deshabilitar, confirmarDeshabilitado);
                celdaEstado.appendChild(botonDeshabilitar);

            } else {
                let botonHabilitar = document.createElement('a');
                botonHabilitar.href = '#';
                botonHabilitar.textContent = 'Deshabilitado';
                botonHabilitar.classList.add('botonEstado');
                botonHabilitar.classList.add('btnHabilitar');
                botonHabilitar.setAttribute('title', 'Mostrar industria')
                botonHabilitar.dataset.id_industria = listaIndustrias[i]['_id'];
                botonHabilitar.addEventListener('click', habilitar);
                celdaEstado.appendChild(botonHabilitar);
            }


            celdaOpciones.appendChild(botonModificar);

            celdaOpciones.appendChild(botonEliminar);


        }
    }
};

function confirmarBorrado() {
    let id_industria = this.dataset.id_industria;
    swal.fire({
        title: '¿Está seguro que desea eliminar la industria?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            borrar_industria(id_industria);
            listaIndustrias = obtenerIndustrias();
            mostrarListaIndustrias();
            swal.fire(
                '¡Industria eliminada!',
                'La industria fue borrada con éxito',
                'success'
            )
        }
    })
};



function deshabilitar() {
    swal.fire({
        title: '¿Esta seguro que desea deshabilitar la industria?',
        text: "¡Este proceso se puede revertir!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Acepto',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            let id_industria = this.dataset.id_industria;
            deshabilitar_industria(id_industria);
            listaIndustrias = obtenerIndustrias();
            mostrarListaIndustrias();
            swal.fire(
                '¡Industria deshabilitada!',
                'La industria ha sido deshabilitada con éxito.',
                'success'
            )
        }
    })

};

function habilitar() {
    swal.fire({
        title: '¿Esta seguro que desea habilitar la industria?',
        text: "¡Este proceso se puede revertir!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.value) {
            let id_industria = this.dataset.id_industria;
            habilitar_industria(id_industria);
            listaIndustrias = obtenerIndustrias();
            mostrarListaIndustrias();
            swal.fire(
                '¡Industria habilitada!',
                'La industria ha sido habilitado con éxito.',
                'success'
            )
        }
    })

};


function mostrarDatosIndustrias() {
    let id_industria = this.dataset.id_industria;
    localStorage.setItem('industria', id_industria);
    window.location.href = 'modificar_industrias.html'
};


function confirmarDeshabilitado(){

    let id_industria = this.dataset.id_industria;
    swal.fire({
        title: "Deshabilitar industria",
        text: "¿Esta seguro que desea deshabilitar la industria?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
        if (result.value) {
            borrar_industria(id_industria);
            mostrarListaIndustrias();
            swal.fire(
                '¡Industria deshabilitada!',
                'Su industria ha sido deshabilitada con éxito.',
                'success'
            )
        }
    })
}