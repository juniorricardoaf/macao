'use strict'

const inputFiltrar = document.querySelector('#txtFiltrar');

mostrarPatrocinadores();
inputFiltrar.addEventListener('keyup', mostrarPatrocinadores);

let listaPatrocinadores = obtenerPatrocinadores();


function mostrarPatrocinadores() {

    let filtro = inputFiltrar.value;
    let listaPatrocinadores=obtenerPatrocinadores();
    let tbody = document.querySelector('#tblPatrocinadores tbody');
    tbody.innerHTML = '';


    for (let i = 0; i < listaPatrocinadores.length; i++) {
        if (listaPatrocinadores[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
            listaPatrocinadores[i]['tipoIndustria'].toLowerCase().includes(filtro.toLowerCase())) {
            let fila = tbody.insertRow();

            let celdaPatrocinador = fila.insertCell();
            let celdaIndustria = fila.insertCell();
            let celdaImagen = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaPatrocinador.innerHTML = listaPatrocinadores[i]['nombre'];
            celdaIndustria.innerHTML = listaPatrocinadores[i]['tipoIndustria'];

            let imagen = document.createElement('img');
            imagen.classList.add('imagenTabla');

            let botonModificar = document.createElement('a');
            botonModificar.href = '#';
            botonModificar.classList.add('far');
            botonModificar.classList.add('fa-edit');
            botonModificar.dataset.id_patrocinador = listaPatrocinadores[i]['_id'];

            botonModificar.addEventListener('click', modificarDatosPatrocinador);

            celdaOpciones.appendChild(botonModificar);

            let botonEliminar=document.createElement('a');
            botonEliminar.href='#';
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash');
            botonEliminar.dataset.id_patrocinador=listaPatrocinadores[i]['_id'];
            botonEliminar.addEventListener('click', confirmarBorrado);
            celdaOpciones.appendChild(botonEliminar);


            if (listaPatrocinadores[i]['estado'] == 'Habilitado') {
                let botonDeshabilitar = document.createElement('a');
                botonDeshabilitar.href = '#';
                //botonDeshabilitar.textContent = 'Deshabilitar';
                botonDeshabilitar.classList.add('far');
                botonDeshabilitar.classList.add('fa-eye-slash');
                botonDeshabilitar.dataset.id_patrocinador = listaPatrocinadores[i]['_id'];

                botonDeshabilitar.addEventListener('click', deshabilitar);
                celdaOpciones.appendChild(botonDeshabilitar);

            } else {
                let botonHabilitar = document.createElement('a');
                botonHabilitar.href = '#';
                //botonHabilitar.textContent = 'Habilitar';
                botonHabilitar.classList.add('far');
                botonHabilitar.classList.add('fa-eye');
                botonHabilitar.classList.add('btnHabilitar')
                botonHabilitar.dataset.id_patrocinador = listaPatrocinadores[i]['_id'];
                botonHabilitar.addEventListener('click', habilitar);
                celdaOpciones.appendChild(botonHabilitar);
            }





            if (listaPatrocinadores[i]['imagen']) {
                imagen.src = listaPatrocinadores[i]['imagen'];

            } else {
                imagen.src = 'imgs/foto_patrocinio.png'
            }
            celdaImagen.appendChild(imagen);

        }

    }
};


function deshabilitar() {
    swal.fire({
        title: '¿Está seguro que desea deshabilitar el patrocinador?',
        text: "Este proceso se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
      }).then((result) => {
        if (result.value) {
            let id_patrocinador = this.dataset.id_patrocinador;
            deshabilitar_patrocinador(id_patrocinador);
            listaPatrocinadores = obtenerPatrocinadores();
            mostrarPatrocinadores();
          swal.fire(
            'Patrocinador deshabilitado',
            'El patrocinador se deshabilitó con éxito',
            'success'
          )
        }
      })
};

function habilitar() {
    swal.fire({
        title: '¿Está seguro que desea habilitar el patrocinador?',
        text: "Este proceso se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
      }).then((result) => {
        if (result.value) {
            let id_patrocinador = this.dataset.id_patrocinador;
            habilitar_patrocinador(id_patrocinador);
            listaPatrocinadores = obtenerPatrocinadores();
            mostrarPatrocinadores();
          swal.fire(
            'Patrocinador habilitado',
            'El patrocinador se habilitó con éxito',
            'success'
          )
        }
      })
};



function modificarDatosPatrocinador() {
    let id_patrocinador = this.dataset.id_patrocinador;
    localStorage.setItem('patrocinador', id_patrocinador);
    window.location.href = 'modificar_patrocinador.html';
}


function confirmarBorrado(){
    let id_patrocinador =  this.dataset.id_patrocinador;
    swal.fire({
        title: '¿Está seguro que desea eliminar el patrocinador?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
      }).then((result) => {
        if (result.value) {
            borrar_patrocinador(id_patrocinador);
            listaPatrocinadores = obtenerPatrocinadores()
            mostrarPatrocinadores();
          swal.fire(
            'Patrocinador eliminado!',
            'El patrocinador fue eliminado con éxito',
            'success'
          )
        }
      })
};





