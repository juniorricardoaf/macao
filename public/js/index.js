'use strict';

const botonIrRegistro=document.querySelector('#btnIrRegistro');
const botonIrLugares=document.querySelector('#btnIrLugares');
const botonIrEventos=document.querySelector('#btnIrEventos');

botonIrRegistro.addEventListener('click', irRegistroLinea);
botonIrLugares.addEventListener('click', irLugares);
botonIrEventos.addEventListener('click', irEventos);

function irRegistroLinea(){
    window.location.href = 'registro_linea.html'
}
function irLugares(){
    window.location.href = 'visualizar_lugar.html'
}
function irEventos(){
    window.location.href = 'visualizar_evento.html'
}
