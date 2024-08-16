'use strict';


const btnRegistarLugar= document.querySelector('#btnRegistrarLugar');
const btnVerLugar= document.querySelector('#btnVerLugar');
const btnVerEvento= document.querySelector('#btnVerEvento');
const btnRegistarEvento= document.querySelector('#btnRegistrarEvento');

btnRegistarLugar.addEventListener('click', llevarA);
btnVerLugar.addEventListener('click', llevarA2);
btnVerEvento.addEventListener('click', llevarA3);


let id_usuario = sessionStorage.getItem('_id');
let usuario = buscar_usuarios(id_usuario);
document.getElementById("txtNombreUsuario").value = "Bienvenido " + usuario['nombreUsuario'];

    function llevarA(){
        window.location.href = 'http://localhost:3000/public/registrar_lugar.html';
    }
    function llevarA2(){
        window.location.href = 'http://localhost:3000/public/visualizar_lugar.html';
    }
    function llevarA3(){
        window.location.href = 'http://localhost:3000/public/visualizar_evento.html';
    }
