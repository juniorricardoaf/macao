'use strict'

const inputFiltrar = document.querySelector('#txtFiltrar');
const inputFiltroFecha = document.querySelector('#txtFecha');
const botonFiltrar = document.querySelector('#buscarLugarFecha');
const botonFiltroFecha = document.querySelector('#filtroFecha');



botonFiltrar.addEventListener('click', mostrarReporteFechaLugar);
botonFiltroFecha.addEventListener('click', mostrarFechas);


let listaEventos = obtenerEventos();
function mostrarReporteFechaLugar() {

    let filtro = inputFiltrar.value;

    listaEventos = obtenerEventos();
    let tbody = document.querySelector('#tblEventos tbody');
    tbody.innerHTML = '';
    if (inputFiltrar.value == '') {
    } else {
        let encontrado = false;
        for (let i = 0; i < listaEventos.length; i++) {
            if (listaEventos[i]['ubicacion'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaEventos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())) {
                
                let fila = tbody.insertRow();

                let celdaNombre = fila.insertCell();
                let celdaUbicacion = fila.insertCell();
                let celdaFecha = fila.insertCell();

                celdaNombre.innerHTML = listaEventos[i]['nombre'];
                celdaUbicacion.innerHTML = listaEventos[i]['ubicacion'];
                let fecha = listaEventos[i]['fecha'];
                let forma = moment(fecha).format('DD-MM-YYYY');
                celdaFecha.innerHTML = forma;
                encontrado = true;
            }
        }
        if(encontrado==false){
            swal.fire({
                title: 'No se encontraron resultados',
                text: 'El evento no existe',
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }

};


function mostrarFechas() {

    let filtroFecha = inputFiltroFecha.value;
    let listaEventos = obtenerEventos();

    let tbody = document.querySelector('#tblEventos tbody');
    tbody.innerHTML = '';
    if (inputFiltroFecha.value == 'dd/mm/aaaa') {
    } else {
        let encontrado=false;
        for (let i = 0; i < listaEventos.length; i++) {
            if (filtroFecha == listaEventos[i]['fecha']) {

                let fila = tbody.insertRow();

                let celdaNombre = fila.insertCell();
                let celdaUbicacion = fila.insertCell();
                let celdaFecha = fila.insertCell();

                celdaNombre.innerHTML = listaEventos[i]['nombre'];
                celdaUbicacion.innerHTML = listaEventos[i]['ubicacion'];
                let fecha = listaEventos[i]['fecha'];
                let forma = moment(fecha).format('DD-MM-YYYY');
                celdaFecha.innerHTML = forma;
                encontrado=true;
            }
        }
        if(encontrado==false){
            swal.fire({
                title: 'No se encontraron resultados',
                text: 'El evento no existe',
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
};