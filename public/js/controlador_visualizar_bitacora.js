'use strict'

const inputFiltrar = document.querySelector('#txtFiltrar');


mostrarBitacora();
inputFiltrar.addEventListener('keyup', mostrarBitacora);

function mostrarBitacora() {

    let filtro = inputFiltrar.value;

    let listaBitacora = obtenerBitacora();
    let tbody = document.querySelector('#tblBitacora tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaBitacora.length; i++) {
        if (listaBitacora[i]['fecha'].toLowerCase().includes(filtro.toLowerCase()) ||
            listaBitacora[i]['hora'].toLowerCase().includes(filtro.toLowerCase()) ||
            listaBitacora[i]['tipo_usuario'].toLowerCase().includes(filtro.toLowerCase()) ||
            listaBitacora[i]['descripcion'].toLowerCase().includes(filtro.toLowerCase())) {

            let fila = tbody.insertRow();

            let celdaFecha = fila.insertCell();
            let celdHora = fila.insertCell();
            let celdaTipo_usuario = fila.insertCell();
            let celdaDescripcion = fila.insertCell();

            celdaFecha.innerHTML = listaBitacora[i]['fecha'];
            celdHora.innerHTML = listaBitacora[i]['hora'];
            celdaTipo_usuario.innerHTML = listaBitacora[i]['tipo_usuario'];
            celdaDescripcion.innerHTML = listaBitacora[i]['descripcion'];

        }
    }
};