'use strict'

const inputFiltrar = document.querySelector('#txtFiltrar');
mostrarContribuciones();

inputFiltrar.addEventListener('keyup', mostrarContribuciones);
 
function mostrarContribuciones(){

    let filtro = inputFiltrar.value;
    
    let listaContribuciones= obtenerContribuciones();  
    let tbody = document.querySelector('#tblContribuciones tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaContribuciones.length; i++){
        if(listaContribuciones[i]['nombrePatrocinador'].toLowerCase().includes(filtro.toLowerCase())||
    listaContribuciones[i]['cantidad'].toLowerCase().includes(filtro.toLowerCase())||
    listaContribuciones[i]['detalle'].toLowerCase().includes(filtro.toLowerCase())){
    
        let fila = tbody.insertRow();

        let celdaPatrocinador = fila.insertCell();
        let celdaCantidad = fila.insertCell();
       let celdaDetalle=fila.insertCell();

        celdaPatrocinador.innerHTML = listaContribuciones[i]['nombrePatrocinador'];
        celdaCantidad.innerHTML = listaContribuciones[i]['cantidad'];
        celdaDetalle.innerHTML=listaContribuciones[i]['detalle'];
       
  }
    }
};


